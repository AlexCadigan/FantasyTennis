<?php
/**
 * Logs the user in or returns an error message if login is unsuccessful.
 */
require_once("DBConnection.php");

// Search for the user's ID
$result = mysqli_query($connection, "SELECT ID FROM UserInfo WHERE Username='" . $_POST["username"] . "' AND Password='" . $_POST["password"] . "'");

// Store ID in a session variable, or send back error message
if ($row = mysqli_fetch_assoc($result)) {
	$_SESSION["ID"] = $row["ID"];
}
else {
	echo "Error!  Unrecognized username and/or password.";
}

mysqli_close($connection);
?>
