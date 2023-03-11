/**
 * Express API requests.  Keep in sync with server/../routes.ts.
 */
export enum APIs {
	signIn = "/signIn",
	signUp = "/signUp"
}

/**
 * Builds a request string with the given parameters.
 * @param {string} req API request string.
 * @param {URLSearchParams} params Parameters to send with the request.
 * @returns {string} Request string with parameters.
 */
export function buildRequestParams(
	req: string,
	params: URLSearchParams
): string {
	return req + "?" + params;
}
