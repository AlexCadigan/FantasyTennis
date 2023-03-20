import AuthenticationPage from "./AuthenticationPage";
import { FormEvent } from "react";
import { resx } from "client/src/Resources/Resources";

/**
 * Reset password page for users that forget their password.
 */
export default class SignUp extends AuthenticationPage {
	/**
	 * Creates elements to display in the reset password form.  Not used by this component.
	 * @returns {null} Null.
	 */
	protected buildFormElements(): null {
		return null;
	}

	/**
	 * Creates additional reset password form buttons to show under the submit button.
	 * @returns {JSX.Element} Additional buttons to display in the form.
	 */
	protected buildFormButtons(): JSX.Element {
		return <button>{resx.userAuthentication.backToSignInLink}</button>;
	}

	/**
	 * Called when the reset password form on submit action is triggered.
	 * @param {FormEvent<HTMLFormElement>} event Form submit event.
	 */
	protected onFormSubmit = (event: FormEvent<HTMLFormElement>): void => {
		// Prevent page refresh that happens on submit
		event.preventDefault();
	};
}
