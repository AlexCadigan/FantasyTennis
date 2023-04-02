import "./Header.css";
import { Container, Navbar } from "react-bootstrap";
import React from "react";
import { resx } from "client/src/Resources/Resources";

/**
 * CSS class names used by this app.
 */
enum ClassNames {
	header = "header"
}

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
			<Navbar className={ClassNames.header}>
				<Container>
					<Navbar.Brand>{resx.tabTitle}</Navbar.Brand>
				</Container>
			</Navbar>
		);
	}
}
