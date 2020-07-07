<?php
/**
 * Functions to scrape and store player data.
 */
require_once(ROOT_DIR . "Scripts/Common/DatabaseHelp.php");
require_once(ROOT_DIR . "Scripts/Common/Queries.php");
require_once(ROOT_DIR . "Scripts/CronJobs/Common/simple_html_dom.php");
require_once(ROOT_DIR . "Scripts/CronJobs/Common/ScrapingHelp.php");

// Constants for getting the ATP players
define("MAX_PLAYER_RANK", 201); // Will get players ranked 1-300
define("PLAYER_URL", "https://www.atptour.com/en/rankings/singles?rankRange=");
define("PLAYER_NAME_SELECTOR", "td.player-cell");

/**
 * Looks through ATP rankings and scrapes the player's names.
 */
function scrapePlayers() {
	for ($rank = 1; $rank <= MAX_PLAYER_RANK; $rank += 100) {
		$playerScraper = file_get_html(PLAYER_URL . $rank . "-" . ($rank + 99));

		if (!$playerScraper) {
			throw new Exception("Unable to open URL '" . PLAYER_URL . $rank . "-" . ($rank + 99) . "'.");
		}

		$players = $playerScraper->find(PLAYER_NAME_SELECTOR);

		if (!$players) {
			throw new Exception("No player data was scrapped from the website.");
		}

		processPlayers($players);
	}
}

/**
 * Processes the scrapped player data.
 * @param $players - Array of scrapped player data.
 */
function processPlayers($players) {
	foreach($players as $player) {
		$player = processScrappedData($player);

		if ($player) {
			verifyOrAddPlayer($player);
		}
	}
}

/**
 * Adds the player to the DB if they aren't already in it.
 * @param $player - The player to verify or add.
 */
function verifyOrAddPlayer($player) {
	if (!($row = mysqli_fetch_assoc(checkForDuplicates(sql_selectPlayers($player))))) {
		if (!sql_insertPlayer($player)) {
			throw new Exception("Error inserting player '" . $player . "' into the DB.");
		}
	}
}
?>
