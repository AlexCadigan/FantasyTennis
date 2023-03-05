import "./LoginPage.css";
import React from "react";

/**
 * Express API requests.
 */
enum ExpressRequests {
	signIn = "/signIn",
	signUp = "/signUp"
}

/**
 * Properties used by this component.
 */
interface IProps {}

/**
 * State properties used by this component.
 */
interface IState {
	// True if in sign in mode, false if in sign up mode
	signIn: boolean;
}

/**
 * User login page.  Handles existing users signing up or new users registering.
 */
export default class LoginPage extends React.Component<IProps, IState> {
	/**
	 * Creates an instance of this component and initalizes state properties.
	 * @param {IProps} props Properties used by this component.
	 */
	public constructor(props: IProps) {
		super(props);

		// Initialize state
		this.state = {
			signIn: true
		};

		// Register handlers
		this.onToggleSignIn = this.onToggleSignIn.bind(this);
		this.onSubmitLogin = this.onSubmitLogin.bind(this);
	}

	/**
	 * Generate HTML content for the component.
	 * @returns {JSX.Element} JSX element representing the login page.
	 */
	public override render(): JSX.Element {
		return (
			<div className="loginPage">
				<p>
					{this.state.signIn
						? "Sign in to Fantasy Tennis"
						: "Create a Fantasy Tennis Account"}
				</p>
				<form className="loginForm" onSubmit={this.onSubmitLogin}>
					<label>Email</label>
					<input type="text"></input>
					<label>Password</label>
					<input type="text"></input>
					<label className={this.state.signIn ? "noDisp" : ""}>
						Repeat password
					</label>
					<input
						className={this.state.signIn ? "noDisp" : ""}
						type="text"
					></input>
					<input
						type="button"
						value={this.state.signIn ? "Sign In" : "Create Account"}
					></input>
					<div>
						<button type="button" onClick={this.onToggleSignIn}>
							Create an account?
						</button>
						<button type="button">Forgot password?</button>
					</div>
				</form>
			</div>
		);
	}

	/**
	 * Switches between sign in mode, for existing users, and sign up mode, for new users.
	 */
	private onToggleSignIn(): void {
		this.setState({
			signIn: !this.state.signIn
		});
	}

	private onSubmitLogin(): void {
		let request: string;
		const params = new URLSearchParams({
			email: "test",
			password: "test"
		});

		if (this.state.signIn) {
			request = ExpressRequests.signIn;
		} else {
			request = ExpressRequests.signIn;
			params.append("repeatPassword", "test");
		}

		fetch(request + params);
	}
}
