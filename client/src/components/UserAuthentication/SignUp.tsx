import AuthenticationPage, {
	IAuthenticationPageProps,
	IAuthenticationPageState
} from "./AuthenticationPage";
import { AppRoutes } from "../App";
import { ChangeEvent } from "react";
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
 * Properties used by this component.
 */
interface ISignUpProps extends IAuthenticationPageProps {}

/**
 * State properties used by this component.
 */
interface ISignUpState extends IAuthenticationPageState {
	passwordValue: string; // User-entered password
	repeatPasswordValue: string; // User-entered repeated password
}

/**
 * Sign up page for new users.
 */
export default class SignUp extends AuthenticationPage<
	ISignUpProps,
	ISignUpState
> {
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

	/**
	 * Creates elements to display in the sign up form.
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
				<InputField
					ID={ElementIDs.repeatPassword}
					type="password"
					label={resx.userAuthentication.signUp.repeatPasswordLabel}
					ghostText={
						resx.userAuthentication.signUp.repeatPasswordGhostText
					}
					onChange={this.onRepeatPasswordChange}
				></InputField>
			</div>
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

	//#region Event handlers

	/**
	 * Called when the password input value changes.
	 * @param {ChangeEvent<HTMLInputElement>} event Input change event.
	 */
	private onPasswordChange = (event: ChangeEvent<HTMLInputElement>): void => {
		this.setState({
			passwordValue: event.target.value
		});
	};

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

	//#endregion
}
