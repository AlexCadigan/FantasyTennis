import LoginPage from "./LoginPage/LoginPage";
import React from "react";

/**
 * Main component class representing the application.
 */
export default class App extends React.Component {
	/**
	 * Generate HTML content for the component.
	 * @returns {JSX.Element} JSX element representing the application.
	 */
	public override render(): JSX.Element {
		return <LoginPage></LoginPage>;
	}
}
