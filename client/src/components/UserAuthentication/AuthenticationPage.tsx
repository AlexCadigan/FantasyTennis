import { Button, Form } from "react-bootstrap";
import React, { FormEventHandler } from "react";
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
interface IAuthenticationPageProps {
	pageTitle: string; // Title to display at the top of the page
	submitButtonText: string; // Text for the form submit button
}

/**
 * State properties used by this component.
 */
interface IAuthenticationPageState {}

/**
 * User authentication page.
 */
export default abstract class AuthenticationPage extends React.Component<
	IAuthenticationPageProps,
	IAuthenticationPageState
> {
	// Regular expression used for email validation
	private emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	/**
	 * Generate HTML content for the component.
	 * @returns {JSX.Element} User authentication page.
	 */
	public override render(): JSX.Element {
		return (
			<div>
				<Header></Header>
				<div className={[ClassNames.flex, ClassNames.center].join(" ")}>
					<Form onSubmit={this.onFormSubmit}>
						<Form.Label>
							<h1>{this.props.pageTitle}</h1>
						</Form.Label>
						<InputField
							ID={ElementIDs.email}
							label={resx.userAuthentication.emailLabel}
							validateInput={true}
							validationRegex={this.emailRegex}
							invalidMessage={
								resx.userAuthentication.invalidEmail
							}
						></InputField>
						{this.buildFormElements()}
						<Button variant="primary" type="submit">
							{this.props.submitButtonText}
						</Button>
						{this.buildFormButtons()}
					</Form>
				</div>
			</div>
		);
	}

	/**
	 * Creates elements to display in the authentication form.
	 * @returns {JSX.Element | null} Elements to display in the form or null.
	 */
	protected abstract buildFormElements(): JSX.Element | null;

	/**
	 * Creates additional form buttons to show under the submit button.
	 * @returns {JSX.Element} Additional buttons to display in the form.
	 */
	protected abstract buildFormButtons(): JSX.Element;

	/**
	 * Called when the form on submit action is triggered.
	 */
	protected abstract onFormSubmit: FormEventHandler<HTMLFormElement>;
}
