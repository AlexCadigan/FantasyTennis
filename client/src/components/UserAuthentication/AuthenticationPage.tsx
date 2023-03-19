import React from "react";

/**
 * CSS class names used by this component.
 */
enum ClassNames {
	authenticationPage = "authenticationPage",
	formElement = "formElement"
}

/**
 * Properties used by this component.
 */
interface IAuthenticationPageProps {}

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
	// Title to display at the top of the page
	protected abstract pageTitle: string;

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
				<p>{this.pageTitle}</p>
				<form
					className={ClassNames.formElement}
					onSubmit={this.onFormSubmit}
				></form>
			</div>
		);
	}

	abstract onFormSubmit(): void;
}
