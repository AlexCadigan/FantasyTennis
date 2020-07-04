<?php
/**
 * Script executed once a day via a cron job.
 */
define("ROOT_DIR", "../../");

require_once("../Common/CoreFunctions.php");
require_once("OnceADay/GetPlayers.php");
//require_once("OnceADay/GetWeeksAndTournaments.php");

scrapePlayers();
//getWeeksAndTournaments();

closeDBConnection();
?>
