<?php
/**
 * Scripts to be executed every 30 minutes via a cron job.
 */
// Dependencies
require_once("../Config/Config.php");
require_once("Lib/simple_html_dom.php");

// Scripts
include_once("EveryHalfHour/GetPlayerPoints.php");

mysqli_close($connection);
?>
