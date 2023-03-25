/**
 * String resources used by the application.
 */
export const resx = {
	tabTitle: "Fantasy Tennis", // Title shown in the browser tab for the website
	userAuthentication: {
		emailLabel: "Email", // Label for email input
		invalidEmail: "Invalid email", // Warning that appears when an invalid email is entered
		passwordLabel: "Password", // Label for password input
		signIn: {
			// Sign in page
			forgotPasswordLink: "Forgot password?", // Label for the forgot password link
			signUpLink: "Create an account?", // Label for the link to navigate to the sign up page
			submitButton: "Sign In", // Label for the sign in button
			title: "Sign in to Fantasy Tennis" // Title that appears when user is signing in
		},
		signUp: {
			// Sign up page
			repeatPasswordLabel: "Repeat password", // Label for repeat password input
			signInLink: "Already have an account?", // Label for the link to navigate to the sign in page
			submitButton: "Create Account", // Label for the sign up button
			title: "Create a Fantasy Tennis Account" // Title that appears when user is signing up
		},
		resetPassword: {
			// Reset password page
			backToSignInLink: "Back to sign in?", // Label for the link to navigate to the sign in page
			submitButton: "Send recovery email", // Label for the button to send a reset password email
			title: "Reset your password" // Title for the reset password page
		}
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
