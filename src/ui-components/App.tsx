import "@aws-amplify/ui-react/styles.css";
import { NavBarHeader2, studioTheme } from "./";
import { Amplify } from "aws-amplify";
import awsconfig from "../aws-exports";
import { ThemeProvider } from "@aws-amplify/ui-react";

Amplify.configure(awsconfig);

/**
 * Generate HTML content for the component.
 * @returns {JSX.Element} JSX element representing the application.
 */
export default function App(): JSX.Element {
	return (
		<ThemeProvider theme={studioTheme}>
			<div>TODO: add app content.</div>
			<NavBarHeader2></NavBarHeader2>
		</ThemeProvider>
	);
}
