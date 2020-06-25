<?php
/**
 * Functions to scrape and store player data.
 */

/**
 * Looks through ATP rankings and scrapes the player's names.
 */
function scrapePlayers() {
	for ($rank = 1; $rank <= MAX_PLAYER_RANK; $rank += 100) {
		$playerScraper = file_get_html(ATP_PLAYERS_URL . $rank . "-" . ($rank + 99));
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
	$result = sql_selectPlayers($player);

	if (mysqli_num_rows($result) > 1) {
		throw new Exception("Duplicate entries found when selecting player '" . $player . "'.");
	}

	if (!($row = mysqli_fetch_assoc($result))) {
		if (!sql_insertPlayer($player)) {
			throw new Exception("Error inserting player '" . $player . "' into the DB.");
		}
	}
}
?>
