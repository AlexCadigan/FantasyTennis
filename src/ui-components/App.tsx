import "@aws-amplify/ui-react/styles.css";
import { NavBarHeader2, studioTheme } from "./";
import { Amplify } from "aws-amplify";
import awsconfig from "../aws-exports";
import {
	ThemeProvider,
	WithAuthenticatorProps,
	withAuthenticator
} from "@aws-amplify/ui-react";

Amplify.configure(awsconfig);

/**
 * Generate HTML content for the top-level application component.
 * @param root0
 * @param root0.signOut
 * @param root0.user
 * @returns {JSX.Element} JSX element representing the application.
 */
export function App({ signOut, user }: WithAuthenticatorProps): JSX.Element {
	return (
		<ThemeProvider theme={studioTheme}>
			<NavBarHeader2></NavBarHeader2>
			<h1>Hello {user?.username}</h1>
			<button onClick={signOut}>Sign out</button>
		</ThemeProvider>
	);
}

export default withAuthenticator(App);
