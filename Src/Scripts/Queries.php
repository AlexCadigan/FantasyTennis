<?php
/**
 * SQL Queries.
 */
require_once("Config/DBConnection.php");

/**
 * Selects data from the Players table.
 * @param  $name - Player name.
 * @return Array of SQL data from the Players table.
 */
function sql_selectPlayers($name) {
	return mysqli_query($GLOBALS["dbConnection"], "SELECT * FROM Players WHERE Name='" . $name . "'");
}

/**
 * Inserts a new player into the Players table.
 * @param  $name - Player name.
 * @return True if the query was successful, false otherwise.
 */
function sql_insertPlayer($name) {
	return mysqli_query($GLOBALS["dbConnection"], "INSERT INTO Players VALUES ('" . $name . "', 1, 0, 0, 0, 0)");
}

/**
 * Selects data from the Weeks table.
 * @param  $year      - Year week is associated with.
 * @param  $isCurrent - 1 if only current weeks should be selected, null if all weeks should be selected.
 * @return Array of SQL data from the Weeks table.
 */
function sql_selectWeeks($year, $isCurrent) {
	return mysqli_query($GLOBALS["dbConnection"], "SELECT * FROM Weeks WHERE YEAR(StartDate)=" . $year . " AND IsCurrent=" . $isCurrent);
}
?>
