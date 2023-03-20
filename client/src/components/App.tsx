import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import { resx } from "../Resources/Resources";
import SignUp from "./UserAuthentication/SignUp";

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
		return (
			<BrowserRouter>
				<Routes>
					<Route
						path="/"
						element={
							<SignUp
								pageTitle={resx.userAuthentication.signUpTitle}
								submitButtonText={
									resx.userAuthentication.signUpButton
								}
							></SignUp>
						}
					></Route>
				</Routes>
			</BrowserRouter>
		);
	}
}
