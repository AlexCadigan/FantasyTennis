<?php
/**
 * Scripts to be executed once a day via a cron job.
 */
// Dependencies
require_once("../Config/Config.php");
require_once("Lib/simple_html_dom.php");
require_once("Lib/HelpfulFunctions.php");

// Scripts
include_once("OnceADay/GetPlayers.php");
include_once("OnceADay/GetWeeksAndTournaments.php");

mysqli_close($connection);
?>
