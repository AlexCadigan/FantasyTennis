import React, { ChangeEvent } from "react";
import { resx } from "client/src/Resources/Resources";

/**
 * HTML element IDs used by this component.
 */
enum ElementIDs {
	email = "emailInput"
}

/**
 * CSS class names used by this component.
 */
enum ClassNames {
	flexColumn = "flexColumn",
	noDisp = "noDisp"
}

/**
 * Properties used by this component.
 */
interface IEmailFieldProps {}

/**
 * State properties used by this component.
 */
interface IEmailFieldState {
	emailValue: string; // User-entered email address
	validEmail: boolean; // True if email is valid, false if invalid
}

/**
 * Represents a field users enter an email address into.
 */
export default class EmailField extends React.Component<
	IEmailFieldProps,
	IEmailFieldState
> {
	/**
	 * Creates an instance of this component and initalizes state properties.
	 * @param {IEmailFieldProps} props Properties used by this component.
	 */
	public constructor(props: IEmailFieldProps) {
		super(props);

		// Initialize state
		this.state = {
			emailValue: "",
			validEmail: true
		};
	}

	/**
	 * Generate HTML content for the component.
	 * @returns {JSX.Element} JSX element representing the email field.
	 */
	public override render(): JSX.Element {
		return (
			<div className={ClassNames.flexColumn}>
				<label htmlFor={ElementIDs.email}>
					{resx.login.emailLabel}
				</label>
				<input
					id={ElementIDs.email}
					type="text"
					onBlur={this.onEmailBlur}
					onChange={this.onEmailChange}
				></input>
				<label
					className={this.state.validEmail ? ClassNames.noDisp : ""}
				>
					{"Email is invalid"}
				</label>
			</div>
		);
	}

	/**
	 * Called when the email input field loses focus.
	 */
	private onEmailBlur = (): void => {
		this.setState({
			validEmail: this.isValidEmail()
		});
	};

	/**
	 * Called when the email input field changes.
	 * @param {ChangeEvent<HTMLInputElement>} event Input change event.
	 */
	private onEmailChange = (event: ChangeEvent<HTMLInputElement>): void => {
		this.setState({
			emailValue: event.target.value
		});
	};

	/**
	 * Determines if the email address is valid.
	 * @returns {boolean} True if the email address is valid, false if it's invalid.
	 */
	private isValidEmail(): boolean {
		const validEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return validEmailRegex.test(this.state.emailValue);
	}
}
