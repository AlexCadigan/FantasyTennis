import React, { ChangeEventHandler } from "react";
import { Form } from "react-bootstrap";

/**
 * Properties used by this component.
 */
interface IInputFieldProps {
	ID: string; // ID of the input element
	type: string; // Type of the input element
	label: string; // Label to show in front of the input element
	ghostText: string; // Ghost text to show in the input element
	onChange: ChangeEventHandler<HTMLInputElement>;
	invalidMessage?: string; // Message to show if the input is invalid
}

/**
 * Represents a field for user input.
 */
export default class InputField extends React.Component<IInputFieldProps, {}> {
	/**
	 * Generate HTML content for the component.
	 * @returns {JSX.Element} JSX element representing an input field.
	 */
	public override render(): JSX.Element {
		return (
			<Form.Group>
				<Form.Label htmlFor={this.props.ID}>
					{this.props.label}
				</Form.Label>
				<Form.Control
					id={this.props.ID}
					type={this.props.type}
					placeholder={this.props.ghostText}
					onChange={this.props.onChange}
					required
				/>
				<Form.Control.Feedback type="invalid">
					{this.props.invalidMessage}
				</Form.Control.Feedback>
			</Form.Group>
		);
	}
}
