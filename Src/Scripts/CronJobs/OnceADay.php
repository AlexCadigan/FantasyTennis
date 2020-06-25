<?php
/**
 * Script executed once a day via a cron job.
 */
require_once("../Queries.php");
require_once("Common/ScrapingHelp.php");
require_once("Common/simple_html_dom.php");
require_once("OnceADay/GetPlayers.php");
require_once("OnceADay/GetWeeksAndTournaments.php");

scrapePlayers();
scrapeWeeksAndTournaments();

mysqli_close($dbConnection);
?>
