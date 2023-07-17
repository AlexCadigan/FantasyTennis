import { Button, Form } from "react-bootstrap";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const SignInComponent: React.FC = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleEmailChange = (
		e: React.ChangeEvent<HTMLInputElement>
	): void => {
		setEmail(e.target.value);
	};

	const handlePasswordChange = (
		e: React.ChangeEvent<HTMLInputElement>
	): void => {
		setPassword(e.target.value);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
		e.preventDefault();
		// Add your sign-in logic here
	};

	return (
		<Form onSubmit={handleSubmit}>
			<Form.Group controlId="formEmail">
				<Form.Label>Email address</Form.Label>
				<Form.Control
					type="email"
					placeholder="Enter email"
					value={email}
					onChange={handleEmailChange}
				/>
			</Form.Group>

			<Form.Group controlId="formPassword">
				<Form.Label>Password</Form.Label>
				<Form.Control
					type="password"
					placeholder="Password"
					value={password}
					onChange={handlePasswordChange}
				/>
			</Form.Group>

			<Button variant="primary" type="submit">
				Sign In
			</Button>

			<Form.Group controlId="formSignUpLink">
				<Form.Text>
					Don&apos;t have an account?{" "}
					<Link to="/signup">Sign Up</Link>
				</Form.Text>
			</Form.Group>
		</Form>
	);
};

export default SignInComponent;
