<?php
/**
 * Enters user sign up information in DB or returns an error message if sign up is unsuccessful.
 */
require_once("DBConnection.php");

// Check if this username already exists
$result = mysqli_query($connection, "SELECT 1 FROM UserInfo WHERE Username='" . $_POST["username"] . "'");
if ($row = mysqli_fetch_assoc($result)) {
	echo "Error!  Username has been taken.";
}
// Add this new user's information to the DB
else {
	mysqli_query($connection, "INSERT INTO UserInfo (Username, Password, YTDPoints, Money, Trades) VALUES ('" . $_POST['username'] . "', '" . $_POST['password'] . "', 0, 100, 72)");
	$_SESSION["ID"] = mysqli_insert_id($connection);
}

mysqli_close($connection);
?>
