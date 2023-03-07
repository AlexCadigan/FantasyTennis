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
