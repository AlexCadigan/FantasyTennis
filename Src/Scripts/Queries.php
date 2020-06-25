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
function sql_insertPlayers($name) {
	return mysqli_query($GLOBALS["dbConnection"], "INSERT INTO Players VALUES ('" . $name . "', 1, 0, 0, 0, 0)");
}
?>
