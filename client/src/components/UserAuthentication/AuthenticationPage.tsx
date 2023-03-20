import "./AuthenticationPage.css";
import React, { FormEventHandler } from "react";
import InputField from "./InputField";
import { resx } from "../../Resources/Resources";

/**
 * HTML element IDs used by this component.
 */
enum ElementIDs {
	email = "emailInput"
}

/**
 * CSS class names used by this component.
 */
export enum ClassNames {
	authenticationPage = "authenticationPage",
	formElement = "formElement",
	noDisp = "noDisp"
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
	 * Creates an instance of this component and initalizes state properties.
	 * @param {IAuthenticationPageProps} props Properties used by this component.
	 */
	public constructor(props: IAuthenticationPageProps) {
		super(props);
	}

	/**
	 * Generate HTML content for the component.
	 * @returns {JSX.Element} User authentication page.
	 */
	public override render(): JSX.Element {
		return (
			<div className={ClassNames.authenticationPage}>
				<p>{this.props.pageTitle}</p>
				<form
					className={ClassNames.formElement}
					onSubmit={this.onFormSubmit}
				>
					<InputField
						ID={ElementIDs.email}
						label={resx.userAuthentication.emailLabel}
						validateInput={true}
						validationRegex={this.emailRegex}
						invalidMessage={resx.userAuthentication.invalidEmail}
					></InputField>
					{this.buildFormElements()}
					<input
						type="submit"
						value={this.props.submitButtonText}
					></input>
					{this.buildFormButtons()}
				</form>
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
