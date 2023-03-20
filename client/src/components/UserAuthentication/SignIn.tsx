import AuthenticationPage from "./AuthenticationPage";
import { FormEvent } from "react";
import InputField from "./InputField";
import { resx } from "client/src/Resources/Resources";

/**
 * HTML element IDs used by this component.
 */
enum ElementIDs {
	password = "passwordInput"
}

/**
 * Sign in page for existing users.
 */
export default class SignIn extends AuthenticationPage {
	/**
	 * Creates elements to display in the sign in form.
	 * @returns {JSX.Element} Elements to display in the form.
	 */
	protected buildFormElements(): JSX.Element {
		return (
			<InputField
				ID={ElementIDs.password}
				label={resx.userAuthentication.passwordLabel}
			></InputField>
		);
	}

	/**
	 * Creates additional sign in form buttons to show under the submit button.
	 * @returns {JSX.Element} Additional buttons to display in the form.
	 */
	protected buildFormButtons(): JSX.Element {
		return <button>{resx.userAuthentication.signUpLink}</button>;
	}

	/**
	 * Called when the sign in form on submit action is triggered.
	 * @param {FormEvent<HTMLFormElement>} event Form submit event.
	 */
	protected onFormSubmit = (event: FormEvent<HTMLFormElement>): void => {
		// Prevent page refresh that happens on submit
		event.preventDefault();
	};
}
