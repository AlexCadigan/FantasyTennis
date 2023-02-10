import "./App.css";
import React from "react";

/**
 * Main component class representing the application.
 */
export default class App extends React.Component {
	/**
	 * Generate HTML content for the component.
	 * @returns {JSX.Element} JSX element representing the application.
	 */
	override render(): JSX.Element {
		return (
			<div className="loginPage">
				<span>Sign in</span>
				<br></br>
				<span>Email</span>
				<input type="text" placeholder="email"></input>
				<br></br>
				<span>Password</span>
				<input type="text" placeholder="password"></input>
				<br></br>
				<button>Sign in</button>
				<br></br>
				<div>
					<button>Don&apos;t have an account?</button>
					<button>Forgot password</button>
				</div>
			</div>
		);
	}
}
