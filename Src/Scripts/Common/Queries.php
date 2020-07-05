<?php
/**
 * SQL Queries.
 */
require_once(ROOT_DIR . "Scripts/Config/DBConnection.php");

/**
 * Selects data from the Players table.
 * @param  $name - Player name.
 * @return Array of SQL data from the Players table.
 */
function sql_selectPlayers($name) {
	$result = mysqli_query($GLOBALS["dbConnection"], "SELECT * FROM Players WHERE Name='" . $name . "'");

	if (!$result) {
		throw new Exception("Unable to select '" . $name . "' from Players.");
	}

	return $result;
}

/**
 * Inserts a new player into the Players table.
 * @param  $name - Player name.
 * @return True if the query was successful, false otherwise.
 */
function sql_insertPlayer($name) {
	$result = mysqli_query($GLOBALS["dbConnection"], "INSERT INTO Players VALUES ('" . $name . "', 1, 0, 0, 0, 0)");

	if (!$result) {
		throw new Exception("Unable to insert '" . $name . "' into Players.");
	}

	return $result;
}

/**
 * Selects data from the Weeks table.
 * @param  $week      - Week to search for.
 * @param  $year      - Year week is associated with.
 * @param  $isCurrent - 1 if only current weeks should be selected, null if all weeks should be selected.
 * @return Array of SQL data from the Weeks table.
 */
function sql_selectWeeks($week, $year, $isCurrent) {
	$query = "SELECT * FROM Weeks";

	if ($week !== "") {
		$query = $query . " WHERE Week=" . $week;
	}

	if ($year) {
		if ($week !== "") {
			$query = $query . " AND YEAR(StartDate)=" . $year;
		}
		else {
			$query = $query . " WHERE YEAR(StartDate)=" . $year;
		}
	}

	if ($isCurrent !== "") {
		if ($week !== "" || $year) {
			$query = $query . " AND IsCurrent=" . $isCurrent;
		}
		else {
			$query = $query . " WHERE IsCurrent=" . $isCurrent;
		}
	}

	$result = mysqli_query($GLOBALS["dbConnection"], $query);

	if (!$result) {
		throw new Exception("Unable to select from Weeks with query '" . $query . "'.");
	}

	return $result;
}
?>
