import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import App from "client/src/components/App";

/**
 * Unit tests for the App class.
 */
describe("Test the App class", () => {
	// Verify that the div is present in the DOM
	it("Component renders div correctly", () => {
		render(<App />);
		const divElement = screen.getByText(/TODO: add app content./i);
		expect(divElement).toBeInTheDocument();
	});
});
