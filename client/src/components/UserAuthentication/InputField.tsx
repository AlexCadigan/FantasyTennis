import React, { ChangeEvent } from "react";
import { ClassNames } from "../AppStyles";
import { Form } from "react-bootstrap";
import { resx } from "../../Resources/Resources";

/**
 * Properties used by this component.
 */
interface IInputFieldProps {
	ID: string; // ID of the input element
	label: string; // Label to show in front of the input element
	validateInput?: boolean; // True if the input should be validated, false to skip validation
	validationRegex?: RegExp; // Regex to validate the input
	invalidMessage?: string; // Message to show if the input is invalid
}

/**
 * State properties used by this component.
 */
interface IInputFieldState {
	value: string; // User-entered value from the input element
	validValue: boolean; // True if value is valid, false if invalid
}

/**
 * Represents a field for user input.
 */
export default class InputField extends React.Component<
	IInputFieldProps,
	IInputFieldState
> {
	/**
	 * Creates an instance of this component and initalizes state properties.
	 * @param {IInputFieldProps} props Properties used by this component.
	 */
	public constructor(props: IInputFieldProps) {
		super(props);

		// Initialize state
		this.state = {
			value: "",
			validValue: true
		};
	}

	/**
	 * Generate HTML content for the component.
	 * @returns {JSX.Element} JSX element representing the email field.
	 */
	public override render(): JSX.Element {
		return (
			<Form.Group>
				<Form.Label htmlFor={this.props.ID}>
					{this.props.label}
				</Form.Label>
				<Form.Control
					id={this.props.ID}
					type="email"
					placeholder={resx.userAuthentication.emailGhostText}
					value={this.state.value}
					onChange={this.onInputChange}
					onBlur={
						this.props.validateInput
							? this.onElementBlur
							: undefined
					}
				/>
				{this.buildValidationLabel()}
			</Form.Group>
		);
	}

	/**
	 * Creates a label to show a validation message if the input is invalid.
	 * @returns {JSX.Element | null} Label to show validation message or null if validation should be skipped.
	 */
	private buildValidationLabel(): JSX.Element | null {
		if (!this.props.validateInput) {
			return null;
		}

		return (
			<Form.Text
				className={this.state.validValue ? ClassNames.noDisp : ""}
			>
				{this.props.invalidMessage}
			</Form.Text>
		);
	}

	/**
	 * Called when the input field loses focus.
	 */
	private onElementBlur = (): void => {
		this.setState({
			validValue: this.inputIsValid()
		});
	};

	/**
	 * Called when the input field value changes.
	 * @param {ChangeEvent<HTMLInputElement>} event Input change event.
	 */
	private onInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
		this.setState({
			value: event.target.value,
			validValue: true // Make sure validation message isn't showing once user resumes typing
		});
	};

	/**
	 * Determines if the input value is valid.
	 * @returns {boolean} True if the input is valid, false if it's invalid.
	 */
	private inputIsValid(): boolean {
		return this.props.validationRegex
			? this.props.validationRegex.test(this.state.value)
			: false;
	}
}
