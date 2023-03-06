export default function buildString(
	resource: string,
	...values: string[]
): string {
	for (let i = 0; i < values.length; i++) {
		const test = values[i];

		if (test !== undefined) {
			resource.replace("{{" + i + "}}", test);
		}
	}

	return resource;
}
