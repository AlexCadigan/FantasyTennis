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
	password = "passwordInput"
}

/**
 * Properties used by this component.
 */
interface ISignInProps extends IAuthenticationPageProps {}

/**
 * State properties used by this component.
 */
interface ISignInState extends IAuthenticationPageState {
	passwordValue: string; // User-entered password
}

/**
 * Sign in page for existing users.
 */
export default class SignIn extends AuthenticationPage<
	ISignInProps,
	ISignInState
> {
	/**
	 * Creates an instance of this component and initalizes state properties.
	 * @param {ISignInProps} props Properties used by this component.
	 */
	public constructor(props: ISignInProps) {
		super(props);

		// Initialize state
		this.state = {
			showFormValidation: false,
			emailValue: "",
			passwordValue: ""
		};
	}

	/**
	 * Creates elements to display in the sign in form.
	 * @returns {JSX.Element} Elements to display in the form.
	 */
	protected buildFormElements(): JSX.Element {
		return (
			<InputField
				ID={ElementIDs.password}
				type="password"
				label={resx.userAuthentication.passwordLabel}
				ghostText={resx.userAuthentication.passwordGhostText}
				onChange={this.onPasswordChange}
			></InputField>
		);
	}

	/**
	 * Creates navigation links to show under the submit button.
	 * @returns {JSX.Element} Navigation links to display in the form.
	 */
	protected buildFormLinks(): JSX.Element {
		return (
			<div>
				<Link to={AppRoutes.signUp}>
					{resx.userAuthentication.signIn.signUpLink}
				</Link>
				<Link to={AppRoutes.resetPassword}>
					{resx.userAuthentication.signIn.forgotPasswordLink}
				</Link>
			</div>
		);
	}

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
