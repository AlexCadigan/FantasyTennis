<?php
/**
 * Updates the player's points for the current week and previous week.
 */
$htmlScraper = file_get_html("https://www.atptour.com/en/scores/results-archive?year=2020");
$results = $htmlScraper->find(".button-border");
for ($i = 0; $i < count($results); $i ++) {
	echo "Result: " . $results[$i]->href . "<br>";
	$resultsScraper = file_get_html("https://www.atptour.com" . $results[$i]->href);
	for ($j = 1; $j <= 14; $j ++) {
		$test = null;
		if ($j % 2 === 0) {
			$test = $resultsScraper->find("tbody:nth-child(2) .day-table-name a");
			for ($k = 0; $k < count($test); $k ++) {
				echo "Player: " . $test[$k]->plaintext . "<br>";
			}
		}
		else {
			$test = $resultsScraper->find("thead:nth-child() th");
			for ($k = 0; $k < count($test); $k ++) {
				echo "Round: " . $test[$k]->plaintext . "<br>";
			}
		}

		// if (!$test) {
		// 	$j = -1;
		// }
	}
}
?>


<!-- <?php
/**
 * Gets player points for ATP cup.
 */
// $STARTDAY = 3;
// $ENDDAY = 12;

// for ($currentDay = $STARTDAY; $currentDay <= $ENDDAY; $currentDay ++) {
// 	$htmlScraper = file_get_html("https://www.atptour.com/en/scores/archive/atp-cup/8888/2020/results?matchdate=1/" . $currentDay . "/2020");
// 	$winners = $htmlScraper->find(".won-game");
// 	foreach ($winners as $winner) {
// 		$winner = trim($winner->plaintext);

// 		// Need to check first round losers so that they get 1 point

// 		$result = mysqli_query($connection, "SELECT Name FROM Players WHERE Name LIKE '" . substr($winner, 0, 1) . "%" . substr($winner, 2) . "'");
// 		if (!($row = mysqli_fetch_assoc($result))) {
// 			mysqli_query($connection, "INSERT INTO Players (Name, Price, CurrentPoints, PreviousPoints, Previous2Points, YTDPoints) VALUES ('" . $row["Name"] . "', 1, 0, 0, 0, 0)");
// 		}
// 		else {
// 			// Get player name?
// 			mysqli_query($connection, "UPDATE Players SET CurrentPoints = 0 WHERE Name = PlayerName")
// 		}
// 		// Check if player is already in database.  If not, add them.
// 		// Check if this is a final/semi/quarter.
// 	}
// }

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
?> -->



<!-- <?php
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
?> -->
