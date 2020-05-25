<?php
/**
 * Updates the player's points.
 */
$htmlScraper = file_get_html("https://www.atptour.com/en/scores/results-archive");
$tournaments = $htmlScraper->find(".tourney-title");
// $links = $htmlScraper->find(".button-border");
foreach ($tournaments as $tournament) {
	$tournament = trim($tournament->plaintext);
	if ($tournament === "ATP Cup") {
		include_once("ATPCup.php");
	}
}
?>
