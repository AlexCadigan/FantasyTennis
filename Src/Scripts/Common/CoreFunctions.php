<?php
/**
 * Core functions used accross the application.
 */
require_once(ROOT_DIR . "Scripts/Common/Queries.php");

/**
 * Gets the current year.
 * @return Current year.
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
 * @param  $year - Year to use when getting the current week.
 * @return Current week for the given year.
 */
function getCurrentWeek($year) {
	return mysqli_fetch_assoc(checkForDuplicates(sql_selectWeeks("", $year, 1)))["Week"];
}

/**
 * Check if the given SQL query results contains multiple entries (duplicate entries).  This is basically a check to
 * make sure the database data maintains it's integrity.
 * @param  $queryResults - SQL query results (should be an mysqli_result object).
 * @return Given SQL results.
 */
function checkForDuplicates($queryResults) {
	if (mysqli_num_rows($queryResults) > 1) {
		throw new Exception("Duplicate entries found in query results.");
	}

	return $queryResults;
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
