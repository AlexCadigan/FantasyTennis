import SignInOrUp, { ISignInOrUpProps, ISignInOrUpState } from "./SignInOrUp";
import { AppRoutes } from "../App";
import { Link } from "react-router-dom";
import { resx } from "client/src/Resources/Resources";

/**
 * Properties used by this component.
 */
interface ISignInProps extends ISignInOrUpProps {}

/**
 * State properties used by this component.
 */
interface ISignInState extends ISignInOrUpState {}

/**
 * Sign in page for existing users.
 */
export default class SignIn extends SignInOrUp<ISignInProps, ISignInState> {
	//#region Constructor

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

	//#endregion

	//#region JSX Helpers

	/**
	 * Creates additional elements to display in the sign in form.  Unused.
	 * @returns {JSX.Element | null} Null.
	 */
	protected buildAdditionalFormElements(): JSX.Element | null {
		return null;
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

	//#endregion
}
