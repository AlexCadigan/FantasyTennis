import "./LoginPage.css";
import React from "react";

/**
 * User login page.  Handles existing users signing up or new users registering.
 */
export default class LoginPage extends React.Component {
	/**
	 * Generate HTML content for the component.
	 * @returns {JSX.Element} JSX element representing the login page.
	 */
	override render(): JSX.Element {
		return (
			<div className="loginPage">
				<p>Sign in</p>
				<form className="loginForm">
					<label>Email</label>
					<input type="text" placeholder="email"></input>
					<label>Password</label>
					<input type="text" placeholder="password"></input>
					<input type="submit" value="Sign in"></input>
					<div>
						<button>Don&apos;t have an account?</button>
						<button>Forgot password</button>
					</div>
				</form>
			</div>
		);
	}
}
