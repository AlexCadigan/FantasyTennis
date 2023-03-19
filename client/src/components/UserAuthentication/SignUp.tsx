import AuthenticationPage from "./AuthenticationPage";
import { resx } from "client/src/Resources/Resources";

/**
 * Sign in page for existing users.
 */
export default class SignUp extends AuthenticationPage {
	protected pageTitle: string = resx.userAuthentication.signUpTitle;
}
