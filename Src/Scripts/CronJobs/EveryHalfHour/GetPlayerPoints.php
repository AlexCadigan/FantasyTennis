<?php
/**
 * Updates the player's points for the current week and previous week.
 */
$currentYear = date("Y");

// Get this year's current week
$currentWeek = $originalCurrentWeek = mysqli_fetch_assoc(mysqli_query($connection, "SELECT Week FROM Weeks WHERE IsCurrent=1 AND YEAR(StartDate)=" . $currentYear))["Week"];
if (!$currentWeek) {
	echo("Current week not found.");
	return;
}

// Scrape tournament data 
$tournamentScraper = file_get_html("https://www.atptour.com/en/scores/results-archive?year=" . $currentYear);
$scrapedTournaments = $tournamentScraper->find(".tourney-title");
$resultLinks = $tournamentScraper->find(".button-border");

// Loop over the current and previous week
while ($currentWeek > $originalCurrentWeek - 2) {
	// Loop over the current week's tournaments
	$currentWeekTournaments = mysqli_query($connection, "SELECT Name FROM Tournaments WHERE Week=" . $currentWeek . " AND Year=" . $currentYear);
	while ($tournament = mysqli_fetch_assoc($currentWeekTournaments)["Name"]) {
		$linkIndex = -1;
		// Find the results link index of this tournament
		for ($i = 0; $i < count($scrapedTournaments); $i ++) {
			if ($tournament === trim(html_entity_decode($scrapedTournaments[$i]->plaintext, ENT_QUOTES, "UTF-8"))) {
				$linkIndex = $i;
				break;
			}
		}

		// Skip this tournament if no results link index was found
		if ($linkIndex === -1) {
			continue;
		}

		$resultsScraper = file_get_html("https://www.atptour.com" . $resultLinks[$linkIndex]->href);
		$rounds = $resultsScraper->find("th");
		for ($i = 0; $i < count($rounds); $i ++) {
			echo $rounds[$i]->plaintext . "<br>";
		}
	}
	$currentWeek --;
}

// $htmlScraper = file_get_html("https://www.atptour.com/en/scores/results-archive?year=2020");
// $results = $htmlScraper->find(".button-border");
// for ($i = 0; $i < count($results); $i ++) {
// 	echo "Result: " . $results[$i]->href . "<br>";
// 	$resultsScraper = file_get_html("https://www.atptour.com" . $results[$i]->href);
// 	for ($j = 1; $j <= 14; $j ++) {
// 		$test = null;
// 		if ($j % 2 === 0) {
// 			$test = $resultsScraper->find("tbody:nth-child(2) .day-table-name a");
// 			for ($k = 0; $k < count($test); $k ++) {
// 				echo "Player: " . $test[$k]->plaintext . "<br>";
// 			}
// 		}
// 		else {
// 			$test = $resultsScraper->find("thead:nth-child() th");
// 			for ($k = 0; $k < count($test); $k ++) {
// 				echo "Round: " . $test[$k]->plaintext . "<br>";
// 			}
// 		}

// 		// if (!$test) {
// 		// 	$j = -1;
// 		// }
// 	}
// }

// $htmlScraper = file_get_html("https://www.atptour.com/en/scores/archive/australian-open/580/2020/results");
// $final = $htmlScraper->find("th");
// echo "<b>Rounds:</b><br>";
// for ($i = 0; $i < count($final); $i ++) {
// 	echo $final[$i]->plaintext . "<br>";
// }
// echo "<br><b>Players:</b><br>";
// $final = $htmlScraper->find(".day-table-name");
// for ($i = 0; $i < count($final); $i ++) {
// 	echo $final[$i]->plaintext . "<br>";
// }
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
//$htmlScraper = file_get_html("https://www.atptour.com/en/scores/results-archive");
// $tournaments = $htmlScraper->find(".tourney-title");
// // $links = $htmlScraper->find(".button-border");
// //foreach ($tournaments as $tournament) {
// 	$tournament = trim($tournament->plaintext);
// 	if ($tournament === "ATP Cup") {
// 		include_once("ATPCup.php");
// 	}
//}
?> -->
