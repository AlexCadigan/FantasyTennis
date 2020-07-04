<?php
/**
 * Core functions used accross the application.
 */
require_once(ROOT_DIR . "Scripts/Common/Queries.php");

/**
 * Gets the current year.
 * @return The current year.
 */
function getCurrentYear() {
	$currentYear = date("Y");

	if (!$currentYear) {
		throw new Exception("Could not get current year.");
	}

	return $currentYear;
}

/**
 * Gets the current week for the given year.
 * @param $year - The year to use when getting the current week.
 * @return The current week for the given year.
 */
function getCurrentWeek($year) {
	$result = sql_selectWeeks($year, 1);

	if (mysqli_num_rows($result) > 1) {
		throw new Exception("Multiple current weeks returned for year '" . $year . "'.");
	}

	return mysqli_fetch_assoc($result)["Week"];
}

/**
 * Closes the connection to the database.
 */
function closeDBConnection() {
	if (!mysqli_close($GLOBALS["dbConnection"])) {
		throw new Exception("Could not close the database connection.");
	}
}
?>
