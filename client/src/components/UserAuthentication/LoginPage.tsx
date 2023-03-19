import "./LoginPage.css";
import { APIs, buildRequestParams } from "client/src/util/APIs";
import React, {
	ChangeEvent,
	ChangeEventHandler,
	FocusEventHandler,
	FormEvent
} from "react";
import InputField from "./InputField";
import { resx } from "../../Resources/Resources";

/**
 * HTML element IDs used by this component.
 */
enum ElementIDs {
	email = "emailInput",
	password = "passwordInput"
}

/**
 * CSS class names used by this component.
 */
enum ClassNames {
	signInPage = "authenticationPage"
}

/**
 * Properties used by this component.
 */
interface IProps {}

/**
 * State properties used by this component.
 */
interface IState {
	passwordValue: string; // User-entered password
	repeatPasswordValue: string; // Repeat password entered by user
	signIn: boolean; // True if in sign in mode, false if in sign up mode
}

/**
 * User login page.  Handles existing users signing up or new users registering.
 */
export default class LoginPage extends React.Component<IProps, IState> {
	private emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	/**
	 * Creates an instance of this component and initalizes state properties.
	 * @param {IProps} props Properties used by this component.
	 */
	public constructor(props: IProps) {
		super(props);

		// Initialize state
		this.state = {
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
			<div className={ClassNames.signInPage}>
				<p>
					{this.state.signIn
						? resx.login.signInTitle
						: resx.login.signUpTitle}
				</p>
				<form
					className={ClassNames.flexColumn}
					onSubmit={this.onSubmitLogin}
				>
					<InputField
						ID={ElementIDs.email}
						label={resx.login.emailLabel}
						validateInput={true}
						validationRegex={this.emailRegex}
						invalidMessage={resx.login.invalidEmail}
					></InputField>
					<InputField
						ID={ElementIDs.password}
						label={resx.login.passwordLabel}
					></InputField>
					{this.createTextField(
						ElementIDs.repeatPassword,
						resx.login.repeatPasswordLabel,
						this.onRepeatPasswordChange,
						this.state.signIn
					)}
					<input
						type="submit"
						value={
							this.state.signIn
								? resx.login.signInButton
								: resx.login.signUpButton
						}
					></input>
					<div>
						<button onClick={this.onToggleSignIn}>
							{resx.login.signUpLink}
						</button>
						<button>{resx.login.forgotPasswordLink}</button>
					</div>
				</form>
			</div>
		);
	}

	//#region JXS helpers

	/**
	 * Creates a text field comprised of a label/input pair.
	 * @param {string} elementID Input element ID.
	 * @param {string} label Text to show for field label.
	 * @param {ChangeEventHandler<HTMLInputElement>} onChange Function called when input element text changes.
	 * @param {boolean} hidden True if the field should be hidden, false if it should be shown (default is false).
	 * @param {FocusEventHandler<HTMLInputElement>} onBlur Function called when focus leaves the input element.
	 * @returns {JSX.Element} Text field comprised of label/input pair.
	 */
	private createTextField(
		elementID: string,
		label: string,
		onChange: ChangeEventHandler<HTMLInputElement>,
		hidden = false,
		onBlur?: FocusEventHandler<HTMLInputElement>
	): JSX.Element {
		return (
			<div className={ClassNames.flexColumn}>
				<label
					className={hidden ? ClassNames.noDisp : ""}
					htmlFor={elementID}
				>
					{label}
				</label>
				<input
					id={elementID}
					className={hidden ? ClassNames.noDisp : ""}
					type="text"
					onBlur={onBlur}
					onChange={onChange}
				></input>
			</div>
		);
	}

	//#endregion

	//#region On change handlers

	private onElementBlur = (): void => {
		const test = "test";
		if (test) {
			console.log("test");
		}
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

	//#endregion

	//#region Button handlers

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

	//#endregion
}
