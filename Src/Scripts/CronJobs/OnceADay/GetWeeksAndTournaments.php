<?php
/**
 * Functions to scrape and store the week and tournament data.
 */
require_once(ROOT_DIR . "Scripts/Common/CoreFunctions.php");
require_once(ROOT_DIR . "Scripts/Common/Queries.php");
require_once(ROOT_DIR . "Scripts/CronJobs/Common/simple_html_dom.php");
require_once(ROOT_DIR . "Scripts/CronJobs/Common/ScrapingHelp.php");

/**
 *
 */
function getWeeksAndTournaments() {
	$currentYear = getCurrentYear();

	// Get the current week
	$result = sql_selectWeeks($currentYear, 1);

	if (mysqli_num_rows($result) > 1) {
		throw new Exception("Multiple current weeks returned for year '" . $currentYear . "'.");
	}

	$currentWeek = $originalCurrentWeek = mysqli_fetch_assoc($result)["Week"];

	// If there's no current week because there's no data yet for this year
	if (!$currentWeek) {
		$currentWeek = 1;
		$startDate = null;
		scrapeWeeksAndTournaments();
	}
}


/**
 * Calculates how many "weeks" there are this season and the next.  Gets information about the tournaments being
 * played this year and the next.  Stores weeks and tournaments information in the DB.
 */



$currentYear = date("Y");
setupThisYearData($connection, $currentYear);

// Remove data that is more than 2 years old
mysqli_query($connection, "DELETE FROM Weeks WHERE YEAR(StartDate)<" . ($currentYear - 1));
mysqli_query($connection, "DELETE FROM Tournaments WHERE Year<" . ($currentYear - 1));

/**
 * Sets up for scraping and analyzing the week and tournament data for this year.
 *
 * @param $connection - The connection to the database.
 * @param $year       - The current year.
 *
 * @return void.
 */
function setupThisYearData($connection, $year) {
	$currentWeek = $databaseCurrentWeek = mysqli_fetch_assoc(mysqli_query($connection, "SELECT Week FROM Weeks WHERE IsCurrent=1 AND YEAR(StartDate)=" . $year))["Week"];

	// If there's no data yet for this year
	if (!$currentWeek) {
		$currentWeek = 1;
		$startDate = null;
		getData($connection, $year, $currentWeek, $startDate);
	}
	else {
		// Start with tournaments 2 weeks in the future (so we don't mess up this and next week's data)
		$originalWeek = $currentWeek += 2;

		// Loop backwards if necessary to find a valid start date
		while (!($startDate = strtotime(mysqli_fetch_assoc(mysqli_query($connection, "SELECT StartDate FROM Weeks WHERE Week=" . $currentWeek . " AND YEAR(StartDate)=" . $year))["StartDate"])) && $currentWeek >= $originalWeek - 2) {
			$currentWeek --;
		}

		// Something is very wrong if start date is null here
		if (!$startDate) {
			echo("No start date found for the current week.");
			return;
		}

		getData($connection, $year, $currentWeek, $startDate);
	}

	setupNextYearData($connection, $year + 1, $databaseCurrentWeek);
}

/**
 * Sets up for scraping and analyzing the week and tournament data for the next year.
 *
 * @param $connection             - The connection to the database.
 * @param $nextYear               - The next year.
 * @param $currentYearCurrentWeek - The current week of the current year.
 *
 * @return Void.
 */
function setupNextYearData($connection, $nextYear, $currentYearCurrentWeek) {
	$currentYearNextWeek = mysqli_fetch_assoc(mysqli_query($connection, "SELECT Week FROM Weeks WHERE Week=" . ($currentYearCurrentWeek + 1) . " AND YEAR(StartDate)=" . ($nextYear - 1)))["Week"];

	// If we are on the last week of this year (there is no next week for this year)
	if (!$currentYearNextWeek) {
		// Start looking at next year's second week (so we don't mess up the first week's data)
		$nextYearCurrentWeek = 2;
	}
	else {
		$nextYearCurrentWeek = 1;
	}

	$nextYearStartDate = strtotime(mysqli_fetch_assoc(mysqli_query($connection, "SELECT StartDate FROM Weeks WHERE Week=" . $nextYearCurrentWeek . " AND YEAR(StartDate)=" . $nextYear))["StartDate"]);

	// If start date is null it means we don't have any data yet for the next year
	if (!$nextYearStartDate) {
		$nextYearCurrentWeek = 1;
	}

	getData($connection, $nextYear, $nextYearCurrentWeek, $nextYearStartDate);
}

/**
 * Scrapes tournament data from the ATP website and analyzes and stores the week and tournament data in the database.
 *
 * @param $connection  - The database connection.
 * @param $year        - The year to use when getting/setting data.
 * @param $currentWeek - The current week.
 * @param $startDate   - The start date of the first week to look at.
 *
 * @return Void.
 */
function getData($connection, $year, $currentWeek, $startDate) {
	
	// Get tournament end date info and possibly timezone info



	// Scrape tournament and date info
	$htmlScraper = file_get_html("https://www.atptour.com/en/scores/results-archive?year=" . $year);
	$tournaments = $htmlScraper->find(".tourney-title");
	$numTournaments = count($tournaments);
	$dates = $htmlScraper->find(".tourney-dates");
	$databaseCurrentWeek = $currentWeek;
	$firstWeek = true;
	$previousDate = null;

	// Loop over tournaments and dates
	for ($i = 0; $i < $numTournaments; $i ++) {
		// Format scrapped data
		$tournaments[$i] = str_replace("'", "''", trim(html_entity_decode($tournaments[$i]->plaintext, ENT_QUOTES, "UTF-8")));
		$dates[$i] = str_replace(".", "-", trim(html_entity_decode($dates[$i]->plaintext, ENT_QUOTES, "UTF-8")));
		$unixDate = strtotime($dates[$i]);

		// Skip tournament if it doesn't have a name, date, or we should ignore it
		if (!$tournaments[$i] || !$dates[$i] || ignoreTournament($tournaments[$i])) {
			continue;
		}

		// If there is no data for this year yet and this is the first tournament encountered
		if (!$startDate && !$previousDate) {
			// Create the first week and set it to the current week


			// If this is scraping for next year, insert a week 0.  or maybe do this for the current year too if there's no start date.
			mysqli_query($connection, "INSERT INTO Weeks (Week, StartDate, IsCurrent) VALUES (" . $currentWeek . ", '" . $dates[$i] . "', 1)");
		}

		// There is not data for this year yet or this tournament is 2 weeks in the future
		if (!$startDate || $unixDate >= $startDate) {
			// This is so that the first week gets verified
			if ($firstWeek && $startDate) {
				verifyOrAddWeek($connection, $currentWeek, $dates[$i], $year);
			}
			// This tournament signifies the start of a new week
			else if ($previousDate && (($unixDate - $previousDate) / 60 / 60 / 24) > 3) {
				$currentWeek ++;
				verifyOrAddWeek($connection, $currentWeek, $dates[$i], $year);
			}
			$firstWeek = false;

			// Verify or add this tournament to the database
			if (!$row = mysqli_fetch_assoc(mysqli_query($connection, "SELECT Week FROM Tournaments WHERE Name='" . $tournaments[$i] . "' AND Year=" . $year))) {
				mysqli_query($connection, "INSERT INTO Tournaments (Name, Week, Year) VALUES ('" . $tournaments[$i] . "', " . $currentWeek . ", " . $year . ")");
			}
			else {
				if ($currentWeek !== $row["Week"]) {
					mysqli_query($connection, "UPDATE Tournaments SET Week=" . $currentWeek . " WHERE Name='" . $tournaments[$i] . "' AND Year=" . $year);
				}
			}
		}

		$previousDate = $unixDate;
	}

	// Don't need to delete invalid data since the it was just filled for the first time
	if (!$startDate) {
		return;
	}

	//Remove weeks that no longer exist
	$databaseWeeks = mysqli_query($connection, "SELECT Week FROM Weeks WHERE YEAR(StartDate)=" . $year);
	while ($row = mysqli_fetch_assoc($databaseWeeks)) {
		if ($row["Week"] > $currentWeek) {
			mysqli_query($connection, "DELETE FROM Weeks WHERE Week=" . $row["Week"] . " AND YEAR(StartDate)=" . $year);
		}
	}

	//Remove tournaments that no longer exist
	$databaseTournaments = mysqli_query($connection, "SELECT Name, Week FROM Tournaments WHERE Year=" . $year);
	while ($row = mysqli_fetch_assoc($databaseTournaments)) {
		if (!in_array($row["Name"], $tournaments) && $row["Week"] >= $databaseCurrentWeek) {
			mysqli_query($connection, "DELETE FROM Tournaments WHERE Name=" . $row["Name"] . " AND Year=" . $year);
		}
	}
}

/**
 * Verifies that the current week exists and has a correct start date or adds the week to the database if it doesn't
 * exist.
 *
 * @param $connection - The connection to the database.
 * @param $week 	  - The week to validate/add.
 * @param $startDate  - The start date of the week.
 * @param $year       - The year to use when validating.
 *
 * @return Void.
 */
function verifyOrAddWeek($connection, $week, $startDate, $year) {
	$row = mysqli_fetch_assoc(mysqli_query($connection, "SELECT StartDate FROM Weeks WHERE Week=" . $week . " AND YEAR(StartDate)=" . $year));

	// This week is not in the database
	if (!$row) {
		mysqli_query($connection, "INSERT INTO Weeks (Week, StartDate, IsCurrent) VALUES (" . $week . ", '" . $startDate . "', 0)");
	}
	else {
		// The week has an incorrect start date that needs updating
		if ($startDate !== $row["StartDate"]) {
			mysqli_query($connection, "UPDATE Weeks SET StartDate='" . $startDate . "' WHERE Week=" . $week . " AND YEAR(StartDate)=" . $year);
		}
	}
}
?>
