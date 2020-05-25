/**
 * Login / sign up page.
 */
var isLogin = true;

/**
 * Modifies the UI when the user changes to login / sign up.
 */
function changeLoginSignUp() {
	isLogin = !isLogin;
	if (isLogin) {
		document.getElementById("title").innerHTML = "Login";
		document.getElementById("passwordRepeat").style.visibility = "hidden";
		document.getElementById("changeOptions").innerHTML = "Sign Up";
	}
	else {
		document.getElementById("title").innerHTML = "Sign Up";
		document.getElementById("passwordRepeat").style.visibility = "visible";
		document.getElementById("changeOptions").innerHTML = "Login";
	}
}

/**
 * Passes login / sign up data to the php handler.
 */
function submitInfo() {
	if (document.getElementById("username").value)

	var sendInfo = "username=" + document.getElementById("username").value + "&password=" + document.getElementById("password").value;
	var xmlhttp = new XMLHttpRequest();

	// Determines if we should pass login or sign up data
	if (isLogin) {
		xmlhttp.open("POST", "lib/Login.php");
	}
	else {
		if (document.getElementById("password").value !== document.getElementById("passwordRepeat").value) {
			alert("Passwords do not match!");
			return;
		}
		xmlhttp.open("POST", "lib/SignUp.php");
		sendInfo += "&repeatPassword=" + document.getElementById("passwordRepeat").value;
	}

	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.onreadystatechange = function() {
		if (this.readyState === 4 && this.status === 200) {
			// Send user to homepage if login / sign up is successful, otherwise displays error message
			if (!this.responseText) {
				window.location.href = "Homepage/Homepage.html";
			}
			else {
				alert(this.responseText);
			}
		}
	};
    xmlhttp.send(sendInfo);
}
