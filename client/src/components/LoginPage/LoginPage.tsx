import "./LoginPage.css";
import React from "react";

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
	}

	/**
	 * Generate HTML content for the component.
	 * @returns {JSX.Element} JSX element representing the login page.
	 */
	public override render(): JSX.Element {
		return (
			<div className="loginPage">
				<p>{this.state.signIn ? "Login" : "Register"}</p>
				<form className="loginForm">
					<label>Email</label>
					<input type="text"></input>
					<label>Password</label>
					<input type="text"></input>
					<input
						type="submit"
						value={this.state.signIn ? "Login" : "Register"}
					></input>
					<div>
						<button type="button" onClick={this.onToggleSignIn}>
							Don&apos;t have an account?
						</button>
						<button>Forgot password</button>
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
}
