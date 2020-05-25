<?php
/**
 * Gets player points for ATP cup.
 */
$STARTDAY = 3;
$ENDDAY = 12;

for ($currentDay = $STARTDAY; $currentDay <= $ENDDAY; $currentDay ++) {
	$htmlScraper = file_get_html("https://www.atptour.com/en/scores/archive/atp-cup/8888/2020/results?matchdate=1/" . $currentDay . "/2020");
	$winners = $htmlScraper->find(".won-game");
	foreach ($winners as $winner) {
		$winner = trim($winner->plaintext);

		// Need to check first round losers so that they get 1 point

		$result = mysqli_query($connection, "SELECT Name FROM Players WHERE Name LIKE '" . substr($winner, 0, 1) . "%" . substr($winner, 2) . "'");
		if (!($row = mysqli_fetch_assoc($result))) {
			mysqli_query($connection, "INSERT INTO Players (Name, Price, CurrentPoints, PreviousPoints, Previous2Points, YTDPoints) VALUES ('" . $row["Name"] . "', 1, 0, 0, 0, 0)");
		}
		else {
			// Get player name?
			mysqli_query($connection, "UPDATE Players SET CurrentPoints = 0 WHERE Name = PlayerName")
		}
		// Check if player is already in database.  If not, add them.
		// Check if this is a final/semi/quarter.
	}
}

// foreach ($winners as $winner) {
// 	// first = substr($winner, 0);
// 	// last = substr($winner, 2, strlen($winner));
// 	// echo substr_count($winner, ".") . "<br>";
// 	if (substr_count($winner, ".") === 1) {
// 		// echo "Here";
// 		echo substr($winner, 0, 1) . " " . substr($winner, 2) . "<br>";
// 		$result = mysqli_query($connection, "SELECT Name FROM Players WHERE Name LIKE '" . substr($winner, 0, 1) . "%" . substr($winner, 2) . "'");
// 		echo mysqli_fetch_assoc($result)["Name"] . "<br><br>";
// 	}
// }
?>
