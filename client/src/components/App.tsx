import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";
import React from "react";
import SignInComponent from "./UserAuthentication/SignIn";
import SignUpComponent from "./UserAuthentication/SignUp";

const App: React.FC = () => {
	return (
		<Container>
			<Navbar bg="light" expand="lg">
				<Navbar.Brand href="#">React Bootstrap App</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="mr-auto">
						<Nav.Link href="#">Home</Nav.Link>
						<Nav.Link href="#">About</Nav.Link>
						<Nav.Link href="#">Contact</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Navbar>

			<h1>Welcome to React Bootstrap App!</h1>

			<BrowserRouter>
				<Routes>
					<Route path="/" Component={SignInComponent} />
					<Route path="/signup" Component={SignUpComponent} />
					{/* Add other routes and components */}
				</Routes>
			</BrowserRouter>
		</Container>
	);
};

export default App;
