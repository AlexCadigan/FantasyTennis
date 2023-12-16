// import { Amplify } from "aws-amplify";
// import { Authenticator } from "@aws-amplify/ui-react"
// import config from "../../../src/aws-exports"
// import React from "react";

// Amplify.configure(config)

// export default function App({ Component, props}) {
// 	return <Authenticator> <Component {...props} /></Authenticator>
// }

import "@aws-amplify/ui-react/styles.css";
import { Amplify } from "aws-amplify";
import awsconfig from "../aws-exports";
import { studioTheme } from "./";
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
		</ThemeProvider>
	);
}

/**
 * Main component class representing the application.
 */
// export default class App extends React.Component {
// 	/**
// 	 * Generate HTML content for the component.
// 	 * @returns {JSX.Element} JSX element representing the application.
// 	 */
// 	override render(): JSX.Element {
// 		return <div>TODO: add app content.</div>;
// 	}
// }
