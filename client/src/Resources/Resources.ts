/**
 * String resources used by the application.
 */
export const resx = {
	tabTitle: "Fantasy Tennis", // Title shown in the browser tab for the website
	// Sign in / sign up page
	userAuthentication: {
		backToSignInLink: "Back to sign in?", // Label for the link to navigate to the sign in page
		emailLabel: "Email", // Label for email input
		forgotPasswordLink: "Forgot password?", // Label for the forgot password link
		invalidEmail: "Invalid email", // Warning that appears when an invalid email is entered
		passwordLabel: "Password", // Label for password input
		repeatPasswordLabel: "Repeat password", // Label for repeat password input
		signInButton: "Sign In", // Label for the sign in button
		signInLink: "Already have an account?", // Label for the link to navigate to the sign in page
		signInTitle: "Sign in to Fantasy Tennis", // Title that appears when user is signing in
		signUpButton: "Create Account", // Label for the sign up button
		signUpLink: "Create an account?", // Label for the link to navigate to the sign up page
		signUpTitle: "Create a Fantasy Tennis Account" // Title that appears when user is signing up
	}
};

/**
 * Builds a resource string and replaces wildcards with the given values.
 * @param {string} resource Resource string.
 * @param {string[]} values Values to replace wildcards with.
 * @returns {string} Resource string with wildcards replaced.
 */
export function buildResource(resource: string, ...values: string[]): string {
	// Replace wildcards in the resource with given values
	for (let i = 0; i < values.length; i++) {
		const value = values[i];

		if (value !== undefined) {
			resource.replace("{{" + i + "}}", value);
		}
	}

	return resource;
}
