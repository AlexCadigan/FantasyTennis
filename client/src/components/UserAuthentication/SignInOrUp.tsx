import AuthenticationPage, {
	IAuthenticationPageProps,
	IAuthenticationPageState
} from "./AuthenticationPage";
import { ChangeEvent } from "react";
import InputField from "./InputField";
import { resx } from "client/src/Resources/Resources";

/**
 * HTML element IDs used by this component.
 */
enum ElementIDs {
	password = "passwordInput"
}

/**
 * Properties used by this component.
 */
export interface ISignInOrUpProps extends IAuthenticationPageProps {}

/**
 * State properties used by this component.
 */
export interface ISignInOrUpState extends IAuthenticationPageState {
	passwordValue: string; // User-entered password
}

/**
 * Page used to sign in or sign up for the website.
 */
export default abstract class SignInOrUp<
	props extends ISignInOrUpProps,
	state extends ISignInOrUpState
> extends AuthenticationPage<props, state> {
	//#region JSX Helpers

	/**
	 * Creates elements to display in the sign in/up form.
	 * @returns {JSX.Element} Elements to display in the form.
	 */
	protected buildFormElements(): JSX.Element {
		return (
			<div>
				<InputField
					ID={ElementIDs.password}
					type="password"
					label={resx.userAuthentication.passwordLabel}
					ghostText={resx.userAuthentication.passwordGhostText}
					onChange={this.onPasswordChange}
				></InputField>
				{this.buildAdditionalFormElements()}
			</div>
		);
	}

	/**
	 * Creates additional elements to display in the sign in/up form.
	 * @returns {JSX.Element} Additional elements to display in the form or null.
	 */
	protected abstract buildAdditionalFormElements(): JSX.Element | null;

	/**
	 * Creates additional sign up form buttons to show under the submit button.
	 * @returns {JSX.Element} Additional buttons to display in the form.
	 */
	protected abstract override buildFormLinks(): JSX.Element;

	//#endregion

	/**
	 * Called when the password input value changes.
	 * @param {ChangeEvent<HTMLInputElement>} event Input change event.
	 */
	private onPasswordChange = (event: ChangeEvent<HTMLInputElement>): void => {
		this.setState({
			passwordValue: event.target.value
		});
	};
}
