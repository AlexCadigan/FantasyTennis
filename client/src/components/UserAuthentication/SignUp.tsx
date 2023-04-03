import SignInOrUp, { ISignInOrUpProps, ISignInOrUpState } from "./SignInOrUp";
import { AppRoutes } from "../App";
import { ChangeEvent } from "react";
import InputField from "./InputField";
import { Link } from "react-router-dom";
import { resx } from "client/src/Resources/Resources";

/**
 * HTML element IDs used by this component.
 */
enum ElementIDs {
	repeatPassword = "repeatPasswordInput"
}

/**
 * Properties used by this component.
 */
interface ISignUpProps extends ISignInOrUpProps {}

/**
 * State properties used by this component.
 */
interface ISignUpState extends ISignInOrUpState {
	repeatPasswordValue: string; // User-entered repeated password
}

/**
 * Sign up page for new users.
 */
export default class SignUp extends SignInOrUp<ISignUpProps, ISignUpState> {
	/**
	 * Creates an instance of this component and initalizes state properties.
	 * @param {ISignUpProps} props Properties used by this component.
	 */
	public constructor(props: ISignUpProps) {
		super(props);

		// Initialize state
		this.state = {
			showFormValidation: false,
			emailValue: "",
			passwordValue: "",
			repeatPasswordValue: ""
		};
	}

	//#region JSX Helpers

	/**
	 * Creates elements to display in the sign up form.
	 * @returns {JSX.Element} Elements to display in the form.
	 */
	protected buildAdditionalFormElements(): JSX.Element {
		return (
			<InputField
				ID={ElementIDs.repeatPassword}
				type="password"
				label={resx.userAuthentication.signUp.repeatPasswordLabel}
				ghostText={
					resx.userAuthentication.signUp.repeatPasswordGhostText
				}
				onChange={this.onRepeatPasswordChange}
			></InputField>
		);
	}

	/**
	 * Creates additional sign up form buttons to show under the submit button.
	 * @returns {JSX.Element} Additional buttons to display in the form.
	 */
	protected buildFormLinks(): JSX.Element {
		return (
			<div>
				<Link to={AppRoutes.signIn}>
					{resx.userAuthentication.signUp.signInLink}
				</Link>
			</div>
		);
	}

	//#endregion

	/**
	 * Called when the repeat password input value changes.
	 * @param {ChangeEvent<HTMLInputElement>} event Input change event.
	 */
	private onRepeatPasswordChange = (
		event: ChangeEvent<HTMLInputElement>
	): void => {
		this.setState({
			repeatPasswordValue: event.target.value
		});
	};
}
