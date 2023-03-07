import "./LoginPage.css";
import React, { ChangeEvent, FormEvent } from "react";
import APIs from "client/src/util/APIs";
import { buildRequestParams } from "client/src/util/StringBuilder";
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
	emailValue: string; // User-entered email address
	passwordValue: string; // User-entered password
	repeatPasswordValue: string; // Repeat password entered by user
	signIn: boolean; // True if in sign in mode, false if in sign up mode
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
			emailValue: "",
			passwordValue: "",
			repeatPasswordValue: "",
			signIn: true
		};
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
					<input type="text" onChange={this.onEmailChange}></input>
					<label>{resx.login.passwordLabel}</label>
					<input type="text" onChange={this.onPasswordChange}></input>
					<label
						className={this.state.signIn ? ClassNames.noDisp : ""}
					>
						{resx.login.repeatPasswordLabel}
					</label>
					<input
						className={this.state.signIn ? ClassNames.noDisp : ""}
						type="text"
						onChange={this.onRepeatPasswordChange}
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
	 * Called when the email input field changes.
	 * @param {ChangeEvent<HTMLInputElement>} event Input change event.
	 */
	private onEmailChange = (event: ChangeEvent<HTMLInputElement>): void => {
		this.setState({
			emailValue: event.target.value
		});
	};

	/**
	 * Called when the password input field changes.
	 * @param {ChangeEvent<HTMLInputElement>} event Input change event.
	 */
	private onPasswordChange = (event: ChangeEvent<HTMLInputElement>): void => {
		this.setState({
			passwordValue: event.target.value
		});
	};

	/**
	 * Called when the repeat password input field changes.
	 * @param {ChangeEvent<HTMLInputElement>} event Input change event.
	 */
	private onRepeatPasswordChange = (
		event: ChangeEvent<HTMLInputElement>
	): void => {
		this.setState({
			repeatPasswordValue: event.target.value
		});
	};

	/**
	 * Switches between sign in mode, for existing users, and sign up mode, for new users.
	 */
	private onToggleSignIn = (): void => {
		this.setState({
			signIn: !this.state.signIn
		});
	};

	/**
	 * Called when the login form submits.  Signs in / signs up a user.
	 * @param {FormEvent<HTMLFormElement>} event Form submit event.
	 */
	private onSubmitLogin = (event: FormEvent<HTMLFormElement>): void => {
		// Prevent page refresh that happens on submit
		event.preventDefault();

		let req: string;
		const reqParams = new URLSearchParams({
			email: this.state.emailValue,
			password: this.state.passwordValue
		});

		// Build request based on what state the page is in
		if (this.state.signIn) {
			req = APIs.signIn;
		} else {
			req = APIs.signUp;
			reqParams.append("repeatPassword", this.state.repeatPasswordValue);
		}

		fetch(buildRequestParams(req, reqParams)).then((response) =>
			response.json()
		);
	};
}
