<?php
/**
 * Controlls the data scraping processes that update the database.  This file will be executed every 10 minutes.
 */
require_once("lib/DBConnection.php");
require_once("Scripts/lib/simple_html_dom.php");
include_once("Scripts/GetPlayers.php");
//include_once("Scripts/GetWeeksAndTournaments.php");
// include_once("Scripts/PlayerPoints/UpdatePlayerPoints.php");

mysqli_close($connection);
?>
