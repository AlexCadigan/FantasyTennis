<?php
/**
 * Scripts to be executed once a day via a cron job.
 */
// Dependencies
require_once("../Config/DBConnection.php");
require_once("Lib/simple_html_dom.php");

// Scripts
include_once("OnceADay/GetPlayers.php");

mysqli_close($connection);
?>
