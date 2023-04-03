import AuthenticationPage, {
	IAuthenticationPageProps,
	IAuthenticationPageState
} from "./AuthenticationPage";
import { AppRoutes } from "../App";
import { Link } from "react-router-dom";
import { resx } from "client/src/Resources/Resources";

/**
 * Properties used by this component.
 */
interface IResetPasswordProps extends IAuthenticationPageProps {}

/**
 * State properties used by this component.
 */
interface IResetPasswordState extends IAuthenticationPageState {}

/**
 * Reset password page for users that forget their password.
 */
export default class ResetPassword extends AuthenticationPage<
	IResetPasswordProps,
	IResetPasswordState
> {
	/**
	 * Creates an instance of this component and initalizes state properties.
	 * @param {IResetPasswordProps} props Properties used by this component.
	 */
	public constructor(props: IResetPasswordProps) {
		super(props);

		// Initialize state
		this.state = {
			showFormValidation: false,
			emailValue: ""
		};
	}

	//#region JSX Helpers

	/**
	 * Creates elements to display in the reset password form.  Not used by this component.
	 * @returns {null} Null.
	 */
	protected buildFormElements(): null {
		return null;
	}

	/**
	 * Creates navigation links to show under the submit button.
	 * @returns {JSX.Element} Navigation links to display in the form.
	 */
	protected buildFormLinks(): JSX.Element {
		return (
			<div>
				<Link to={AppRoutes.signIn}>
					{resx.userAuthentication.resetPassword.backToSignInLink}
				</Link>
			</div>
		);
	}

	//#endregion
}
