import { AppRoutes } from "../App";
import AuthenticationPage from "./AuthenticationPage";
import { FormEvent } from "react";
import InputField from "./InputField";
import { Link } from "react-router-dom";
import { resx } from "client/src/Resources/Resources";

/**
 * HTML element IDs used by this component.
 */
enum ElementIDs {
	password = "passwordInput",
	repeatPassword = "repeatPasswordInput"
}

/**
 * Sign up page for new users.
 */
export default class SignUp extends AuthenticationPage {
	/**
	 * Creates elements to display in the sign up form.
	 * @returns {JSX.Element} Elements to display in the form.
	 */
	protected buildFormElements(): JSX.Element {
		return (
			<div>
				<InputField
					ID={ElementIDs.password}
					label={resx.userAuthentication.passwordLabel}
				></InputField>
				<InputField
					ID={ElementIDs.repeatPassword}
					label={resx.userAuthentication.signUp.repeatPasswordLabel}
				></InputField>
			</div>
		);
	}

	/**
	 * Creates additional sign up form buttons to show under the submit button.
	 * @returns {JSX.Element} Additional buttons to display in the form.
	 */
	protected buildFormButtons(): JSX.Element {
		return (
			<Link to={AppRoutes.signIn}>
				{resx.userAuthentication.signUp.signInLink}
			</Link>
		);
	}

	/**
	 * Called when the sign up form on submit action is triggered.
	 * @param {FormEvent<HTMLFormElement>} event Form submit event.
	 */
	protected onFormSubmit = (event: FormEvent<HTMLFormElement>): void => {
		// Prevent page refresh that happens on submit
		event.preventDefault();
	};
}
