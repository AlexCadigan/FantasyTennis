import "./LoginPage.css";
import React, { FormEvent } from "react";
import APIs from "client/src/util/APIs";
import resx from "./Resources";

/**
 * CSS class names used by this component.
 */
enum ClassNames {
	loginForm = "loginForm",
	loginPage = "loginPage",
	noDisp = "noDisp"
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
			<div className={ClassNames.loginPage}>
				<p>
					{this.state.signIn
						? resx.login.signInTitle
						: resx.login.signUpTitle}
				</p>
				<form
					className={ClassNames.loginForm}
					onSubmit={this.onSubmitLogin}
				>
					<label>{resx.login.emailLabel}</label>
					<input type="text"></input>
					<label>{resx.login.passwordLabel}</label>
					<input type="text"></input>
					<label
						className={this.state.signIn ? ClassNames.noDisp : ""}
					>
						{resx.login.repeatPasswordLabel}
					</label>
					<input
						className={this.state.signIn ? ClassNames.noDisp : ""}
						type="text"
					></input>
					<input
						type="submit"
						value={
							this.state.signIn
								? resx.login.signInButton
								: resx.login.signUpButton
						}
					></input>
					<div>
						<button type="button" onClick={this.onToggleSignIn}>
							{resx.login.signUpLink}
						</button>
						<button type="button">
							{resx.login.forgotPasswordLink}
						</button>
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

	private onSubmitLogin(event: FormEvent): void {
		event.preventDefault();

		let request: string;
		const params = new URLSearchParams({
			email: "test",
			password: "test"
		});

		if (this.state.signIn) {
			request = APIs.signIn;
		} else {
			request = APIs.signIn;
			params.append("repeatPassword", "test");
		}

		console.log("In React");

		fetch(request + "?" + params).then((response) => response.json());
	}
}
