<?php
/**
 * Configuration code.  Imports the database connection, starts a php session and sets the timezone to UTC.
 */
require_once("DBConnection.php");
session_start();

// This is the timezone our cron job uses
date_default_timezone_set("Pacific/Kiritimati");
?>
