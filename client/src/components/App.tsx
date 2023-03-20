import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import ResetPassword from "./UserAuthentication/ResetPassword";
import { resx } from "../Resources/Resources";
import SignIn from "./UserAuthentication/SignIn";
import SignUp from "./UserAuthentication/SignUp";

export enum AppRoutes {
	resetPassword = "/resetPassword",
	signIn = "/",
	signUp = "/signUp"
}

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
						path={AppRoutes.signIn}
						element={
							<SignIn
								pageTitle={resx.userAuthentication.signInTitle}
								submitButtonText={
									resx.userAuthentication.signInButton
								}
							></SignIn>
						}
					></Route>
					<Route
						path={AppRoutes.signUp}
						element={
							<SignUp
								pageTitle={resx.userAuthentication.signUpTitle}
								submitButtonText={
									resx.userAuthentication.signUpButton
								}
							></SignUp>
						}
					></Route>
					<Route
						path={AppRoutes.resetPassword}
						element={
							<ResetPassword
								pageTitle={""}
								submitButtonText={""}
							></ResetPassword>
						}
					></Route>
				</Routes>
			</BrowserRouter>
		);
	}
}
