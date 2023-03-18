import "./AppStyles.css";
import LoginPage from "./UserAuthentication/LoginPage";
import React from "react";
import { resx } from "../Resources/Resources";

/**
 * Main component class representing the application.
 */
export default class App extends React.Component {
	/**
	 * Called before this component is rendered.  Sets the document title.
	 */
	public override componentDidMount(): void {
		document.title = resx.tabTitle;
	}

	/**
	 * Generate HTML content for the component.
	 * @returns {JSX.Element} JSX element representing the application.
	 */
	public override render(): JSX.Element {
		return <LoginPage></LoginPage>;
	}
}
