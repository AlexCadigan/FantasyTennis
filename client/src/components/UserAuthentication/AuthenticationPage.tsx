import { Button, Form } from "react-bootstrap";
import React, { ChangeEvent, FormEvent } from "react";
import { ClassNames } from "../AppStyles";
import Header from "./Header";
import InputField from "./InputField";
import { resx } from "../../Resources/Resources";

/**
 * HTML element IDs used by this component.
 */
enum ElementIDs {
	email = "emailInput"
}

/**
 * Properties used by this component.
 */
export interface IAuthenticationPageProps {
	pageTitle: string; // Title to display at the top of the page
	submitButtonText: string; // Text for the form submit button
}

/**
 * State properties used by this component.
 */
export interface IAuthenticationPageState {
	showFormValidation: boolean; // True if form validation is showning, false if it's hidden
	emailValue: string; // User-entered email address
}

/**
 * User authentication page.
 */
export default abstract class AuthenticationPage<
	props extends IAuthenticationPageProps,
	state extends IAuthenticationPageState
> extends React.Component<props, state> {
	/**
	 * Generate HTML content for the component.
	 * @returns {JSX.Element} User authentication page.
	 */
	public override render(): JSX.Element {
		return (
			<div>
				<Header></Header>
				<div className={[ClassNames.flex, ClassNames.center].join(" ")}>
					<Form
						onSubmit={this.onFormSubmit}
						noValidate
						validated={this.state.showFormValidation}
					>
						<Form.Label>
							<h1>{this.props.pageTitle}</h1>
						</Form.Label>
						<InputField
							ID={ElementIDs.email}
							type="email"
							label={resx.userAuthentication.emailLabel}
							ghostText={resx.userAuthentication.emailGhostText}
							onChange={this.onEmailChange}
							invalidMessage={
								resx.userAuthentication.invalidEmail
							}
						></InputField>
						{this.buildFormElements()}
						<Button variant="primary" type="submit">
							{this.props.submitButtonText}
						</Button>
						{this.buildFormLinks()}
					</Form>
				</div>
			</div>
		);
	}

	//#region JSX Helpers

	/**
	 * Creates elements to display in the authentication form.
	 * @returns {JSX.Element | null} Elements to display in the form or null.
	 */
	protected abstract buildFormElements(): JSX.Element | null;

	/**
	 * Creates additional form buttons to show under the submit button.
	 * @returns {JSX.Element} Additional buttons to display in the form.
	 */
	protected abstract buildFormLinks(): JSX.Element;

	//#endregion

	//#region Event handlers

	/**
	 * Called when the form on submit action is triggered.
	 * @param {FormEvent<HTMLFormElement>} event Form submit event
	 */
	private onFormSubmit = (event: FormEvent<HTMLFormElement>): void => {
		// Prevent page refresh that happens on submit
		event.preventDefault();

		// Show form validation - only applies if the submit fails
		this.setState({
			showFormValidation: true
		});
	};

	/**
	 * Called when the email input value changes.
	 * @param {ChangeEvent<HTMLInputElement>} event Input change event.
	 */
	private onEmailChange = (event: ChangeEvent<HTMLInputElement>): void => {
		this.setState({
			showFormValidation: false, // Hide form validation when user starts typing
			emailValue: event.target.value
		});
	};

	//#endregion
}
