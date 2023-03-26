import { Container, Navbar } from "react-bootstrap";
import React from "react";
import { resx } from "client/src/Resources/Resources";

/**
 * Properties used by this component.
 */
interface IHeaderProps {}

/**
 * State properties used by this component.
 */
interface IHeaderState {}

/**
 * Website header that appears before users have signed in.
 */
export default class Header extends React.Component<
	IHeaderProps,
	IHeaderState
> {
	/**
	 * Generate HTML content for the component.
	 * @returns {JSX.Element} User authentication page.
	 */
	public override render(): JSX.Element {
		return (
			<Navbar bg="primary" variant="dark">
				<Container>
					<Navbar.Brand>
						{resx.userAuthentication.headerTitle}
					</Navbar.Brand>
				</Container>
			</Navbar>
		);
	}
}
