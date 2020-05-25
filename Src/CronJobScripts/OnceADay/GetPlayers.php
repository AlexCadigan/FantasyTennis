<?php
/**
 * Looks through ATP ranking and adds all the new players to the DB.
 */
$MAXRANK = 201;

// Gets top 200 players
for ($rank = 1; $rank <= $MAXRANK; $rank += 100) {
	$htmlScraper = file_get_html("https://www.atptour.com/en/rankings/singles?rankRange=" . $rank . "-" . ($rank + 99));
	$players = $htmlScraper->find('td.player-cell');

	foreach($players as $player) {
		// Revert HTML encoded characters to their ASCII counterparts
		$player = str_replace("'", "''", trim(html_entity_decode($player->plaintext)));

		if ($player == null) {
			continue;
		}

		// If the player does not already exist in the DB, add them
		$result = mysqli_query($connection, "SELECT 1 FROM Players WHERE Name='$player'");
		if (!($row = mysqli_fetch_assoc($result))) {
			mysqli_query($connection, "INSERT INTO Players (Name, Price, CurrentPoints, PreviousPoints, Previous2Points, YTDPoints) VALUES ('" . $player . "', 1, 0, 0, 0, 0)");
		}
	}
}
?>
