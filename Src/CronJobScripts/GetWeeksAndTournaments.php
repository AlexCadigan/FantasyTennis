<?php
/**
 * Calculates how many "weeks" there are this season.  Gets information about the tournaments being played this 
 * year.  Stores weeks and tournaments information in DB.
 */
$currentWeek = mysqli_fetch_assoc(mysqli_query($connection, "SELECT Week FROM Weeks WHERE IsCurrent=1"))["Week"];
$futureWeeks = $currentWeek + 2;
$startDate = strtotime(mysqli_fetch_assoc(mysqli_query($connection, "SELECT StartDate FROM Weeks WHERE Week=" .$futureWeeks))["StartDate"]);

$htmlScraper = file_get_html("https://www.atptour.com/en/scores/results-archive");
$tournaments = $htmlScraper->find(".tourney-title");
$dates = $htmlScraper->find(".tourney-dates");

$numTournaments = count($tournaments);
for ($i = 0; $i < $numTournaments; $i ++)
{
	// Process scrapped data for storage in SQL DB.
	$tournaments[$i] = str_replace("&#39;", "''", str_replace("&amp;", "&", trim($tournaments[$i]->plaintext)));
	$dates[$i] = str_replace(".", "-", trim($dates[$i]->plaintext));

	// Make sure the tournament starts in the future.
	if (strtotime($dates[$i]) >= $startDate)
	{
		// Tournament is already in the DB.
		if (mysqli_fetch_assoc(mysqli_query($connection, "SELECT * FROM Tournaments WHERE Name='" . $tournaments[$i] . "'")))
		{
			// mysqli_query($connection, "UPDATE Tournaments SET Week=" . $startDateWeek . ", StartDate='" . $dates[$i] . "' WHERE Name='" . $tournaments[$i] . "'");
		}
		else 
		{
			
		}
	}
}

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
