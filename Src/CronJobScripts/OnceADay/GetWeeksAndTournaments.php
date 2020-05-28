<?php
/**
 * Calculates how many "weeks" there are this season.  Gets information about the tournaments being played this 
 * year.  Stores weeks and tournaments information in DB.
 */
require_once("../../Config/Config.php");
require_once("../Lib/simple_html_dom.php");
require_once("../Lib/HelpfulFunctions.php");

$currentYear = date("Y");
$currentWeek = $databaseCurrentWeek = mysqli_fetch_assoc(mysqli_query($connection, "SELECT Week FROM Weeks WHERE IsCurrent=1 AND YEAR(StartDate)=" . $currentYear))["Week"];

// Start of a new year and current week hasn't been set yet
if ($currentWeek == null) {
	$currentWeek = $databaseCurrentWeek = 1;
	$startDate = null;
}
// Look at tournaments 2 weeks in the future (so we don't mess up this and next weeks tournaments)
else {
	$currentWeek += 2;
	$startDate = strtotime(mysqli_fetch_assoc(mysqli_query($connection, "SELECT StartDate FROM Weeks WHERE Week=" . $currentWeek . " AND YEAR(StartDate)=" . $currentYear))["StartDate"]);
	
	// There are no tournaments 2 weeks away because we're at the end of the year
	if ($startDate == null) {
		return;
	}
}
$firstWeek = true;
$previousDate = null;

// Scrape tournament and date info
$htmlScraper = file_get_html("https://www.atptour.com/en/scores/results-archive?year=" . $currentYear);
$tournaments = $htmlScraper->find(".tourney-title");
$dates = $htmlScraper->find(".tourney-dates");

// Loop over tournaments and dates
for ($i = 0; $i < count($tournaments); $i ++) {
	$tournaments[$i] = str_replace("'", "''", trim(html_entity_decode($tournaments[$i]->plaintext)));
	$dates[$i] = str_replace(".", "-", trim(html_entity_decode($dates[$i]->plaintext)));
	$unixDate = strtotime($dates[$i]);

	// If the current tournament should be ignored (it's too hard to get the results)
	if (ignoreTournament($tournaments[$i])) {
		continue;
	}

	// This is the start of a new year and the first tournament set the very first week
	if ($startDate == null && $previousDate == null) {
		mysqli_query($connection, "INSERT INTO Weeks (Week, StartDate, IsCurrent) VALUES (" . $currentWeek . ", '" . $dates[$i] . "', 1)");
	}

	// This is the start of a new year or this tournament is 2 weeks in the future
	if ($startDate == null || $startDate <= $unixDate) {
		// This is not a new year and is the first week we need to verify
		if ($firstWeek && $startDate != null) {
			verifyOrAddWeek($connection, $currentYear, $currentWeek, $dates[$i]);
		}
		$firstWeek = false;

		// This tournament signifies the start of a new week
		if ($previousDate != null && (($unixDate - $previousDate) / 60 / 60 / 24) > 3) {
			$currentWeek ++;
			verifyOrAddWeek($connection, $currentYear, $currentWeek, $dates[$i]);
		}

		// Verify or add this tournament to the database
		$row = mysqli_fetch_assoc(mysqli_query($connection, "SELECT Week FROM Tournaments WHERE Name='" . $tournaments[$i] . "' AND Year=" . $currentYear));
		if ($row == null) {
			mysqli_query($connection, "INSERT INTO Tournaments (Name, Week, Year) VALUES ('" . $tournaments[$i] . "', " . $currentWeek . ", " . $currentYear . ")");
		}
		else {
			if ($currentWeek !== $row["Week"]) {
				mysqli_query($connection, "UPDATE Tournaments SET Week=" . $currentWeek . " WHERE Name='" . $tournaments[$i] . "' AND Year=" . $currentYear);
			}
		}
	}

	$previousDate = $unixDate;
}

// Remove weeks that no longer exist or are more than 2 years old
// $databaseWeeks = mysqli_query($connection, "SELECT Week, YEAR(StartDate) FROM Weeks");
// while ($row = mysqli_fetch_assoc($databaseWeeks) != null) {
// 	if (($row["Week"] > $currentWeek && $row["YEAR(StartDate)"] === $currentYear) || $row["YEAR(StartDate)"] < ($currentYear - 1)) {
// 		mysqli_query($connection, "DELETE FROM Weeks WHERE Week=" . $row["Week"] . " AND YEAR(StartDate)=" . $currentYear);
// 	}
// }

// Remove tournaments that no longer exist or are more than 2 years old
// $databaseTournaments = mysqli_query($connection, "SELECT Name, Week, Year FROM Tournaments");
// for ($i = 0; $i < count($databaseTournaments); $i ++) {
// 	$row = mysqli_fetch_assoc($databaseTournaments[$i]);
// 	// Tournament name doesn't match, week is future, year is current or year is 2 old
// 	if (!in_array($row["Name"], $tournaments) && $row["Week"])
// }

// If $startDate is not null then delete unused tournaments or weeks.  Use the list of scrapped tournaments and the last week we left off on.

/**
 * Verifies that the current week exists and has a correct start date or adds the week to the database if it doesn't exist.
 *
 * @param $connection - The connection to the database.
 * @param $week 	  - The week to validate/add.
 * @param $startDate  - The start date of the week.
 *
 * @return Void.
 */
function verifyOrAddWeek($connection, $currentYear, $week, $startDate) {
	echo "Week: " . $week . "<br>";

	$row = mysqli_fetch_assoc(mysqli_query($connection, "SELECT StartDate FROM Weeks WHERE Week=" . $week . " AND YEAR(StartDate)=" . $currentYear));
	
	// This week is not in the database
	if ($row == null) {
		echo "Week is not in database.<br>";

		mysqli_query($connection, "INSERT INTO Weeks (Week, StartDate, IsCurrent) VALUES (" . $week . ", '" . $startDate . "', 0)");
	}
	else {
		echo "Week is in database.<br>";

		// The week has an incorrect start date that needs updating
		if ($startDate !== $row["StartDate"]) {
			mysqli_query($connection, "UPDATE Weeks SET StartDate='" . $startDate . "' WHERE Week=" . $week . " AND YEAR(StartDate)=" . $currentYear);
		}
	}
}


// $numTournaments = count($tournaments);
// for ($i = 0; $i < $numTournaments; $i ++)
// {
// 	// Process scrapped data for storage in SQL DB.
// 	$tournaments[$i] = str_replace("&#39;", "''", str_replace("&amp;", "&", trim($tournaments[$i]->plaintext)));
// 	$dates[$i] = str_replace(".", "-", trim($dates[$i]->plaintext));

// 	// Make sure the tournament starts in the future.
// 	if (strtotime($dates[$i]) >= $startDate)
// 	{
// 		// Tournament is already in the DB.
// 		if (mysqli_fetch_assoc(mysqli_query($connection, "SELECT * FROM Tournaments WHERE Name='" . $tournaments[$i] . "'")))
// 		{
// 			// mysqli_query($connection, "UPDATE Tournaments SET Week=" . $startDateWeek . ", StartDate='" . $dates[$i] . "' WHERE Name='" . $tournaments[$i] . "'");
// 		}
// 		else 
// 		{
			
// 		}
// 	}
// }

// require_once("../lib/DBConnection.php");
// require_once("lib/simple_html_dom.php");

// $htmlScraper = new simple_html_dom();
// $htmlScraper = file_get_html("https://www.atptour.com/en/scores/results-archive");
// $dates = $htmlScraper->find(".tourney-dates");
// $tournaments = $htmlScraper->find(".tourney-title");

// Get tournament information
// $week = 1;
// $numTournaments = count($tournaments);
// for ($i = 0; $i < $numTournaments; $i ++) {
// 	$currentDate = str_replace(".", "-", $dates[$i]->plaintext);
// 	$currentTournament = str_replace("&amp;", "&", trim($tournaments[$i]->plaintext));
// 	$currentTournament = str_replace("&#39;", "''", $currentTournament);
	
// 	mysqli_query($connection, "INSERT INTO Tournaments (Name, Week, StartDate) VALUES ('" . $currentTournament . "', " . $week . ", '" . $currentDate . "')");

// 	if ($i + 1 !== $numTournaments && (strtotime(str_replace(".", "-", $dates[$i + 1]->plaintext)) - strtotime($currentDate)) / 60 / 60 / 24 > 4) {
// 		$week ++;
// 	}
// }

// // Get week information
// for ($i = 1; $i <= 37; $i ++) {
// 	$result = mysqli_query($connection, "SELECT StartDate FROM Tournaments WHERE Week='" . $i . "'");
// 	$startDate = mysqli_fetch_assoc($result)["StartDate"];
// 	while ($row = mysqli_fetch_assoc($result)) {
// 		if (strtotime($row["StartDate"]) < strtotime($startDate)) {
// 			$startDate = $row["StartDate"];
// 		}
// 	}

// 	$isCurrent = 0;
// 	if ($i === 3) {
// 		$isCurrent = 1;
// 	}

// 	mysqli_query($connection, "INSERT INTO Weeks (Week, StartDate, IsCurrent) VALUES (" . $i . ", '" . $startDate . "', " . $isCurrent . ")");
// }

// mysqli_close($connection);
?>
