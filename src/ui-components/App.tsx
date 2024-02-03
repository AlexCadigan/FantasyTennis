import "@aws-amplify/ui-react/styles.css";
import { Homepage, studioTheme } from "./";
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
 * @param {WithAuthenticatorProps} props Props from the Authenticator wrapper used by the app.
 * @returns {JSX.Element} JSX element representing the application.
 */
export function App(props: WithAuthenticatorProps): JSX.Element {
	return (
		<ThemeProvider theme={studioTheme}>
			<Homepage></Homepage>
			<h1>Hello {props.user?.username}</h1>
			<button onClick={props.signOut}>Sign out</button>
		</ThemeProvider>
	);
}

export default withAuthenticator(App);
