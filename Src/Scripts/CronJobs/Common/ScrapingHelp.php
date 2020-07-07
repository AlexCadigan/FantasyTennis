<?php
/**
 * Contains useful and common helper functions.
 */

/**
 * Removes encodings from and formats scrapped HTML data.  Replace "'" with "''" to avoid errors in SQL query strings.
 * @param  $data - Raw HTML data.
 * @return Plaintext decoded and formatted data.
 */
function processScrappedData($data) {
	return str_replace("'", "''", trim(html_entity_decode($data->plaintext, ENT_QUOTES, "UTF-8")));
}




/**
 * Determines if we should ignore the given tournament.  Ignore tournaments that are too difficult to get results from 
 * (because of the format they're stored in).  These tournaments will hopefully be supported in the future.
 *
 * @param $tournament - The given tournament.
 *
 * @return true if the given tournament should be ignored, false otherwise.
 */
function ignoreTournament($tournament) {
	$ignore = array("ATP Cup", "Olympic Games");

	for ($i = 0; $i < count($ignore); $i ++) {
		if (strpos($tournament, $ignore[$i]) !== false) {
			return true;
		}
	}

	return false;
}
?>
