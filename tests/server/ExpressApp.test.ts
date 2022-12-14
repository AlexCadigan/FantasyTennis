import ExpressApp, { FilePaths } from "../../server/ExpressApp";
import { EnvironmentDefaults } from "../../server/HttpServer";
import path from "path";

import request from "supertest";

/**
 * Unit tests for the ExpressApp class.
 */
class ExpressAppTest {
	//#region Properties

	// Mock express application object used for testing
	private mockApp!: ExpressApp;

	//#endregion

	/**
	 * Runs all unit tests for this class.
	 */
	public runTests(): void {
		describe("Test the ExpressApp class", () => {
			// Preforms setup necessary for each test
			beforeEach(() => {
				this.mockApp = new ExpressApp(EnvironmentDefaults.port);
			});

			// Verify new instance of the Express app is setup correctly
			it("Constructor initalizes new express app object", () => {
				const expressApp = this.mockApp.getExpressApp();

				expect(expressApp).not.toBeNull();
				expect(expressApp.get("port")).toEqual(
					EnvironmentDefaults.port
				);
				expect(expressApp.get("views")).toEqual(
					path.join(__dirname, "../", FilePaths.views)
				);
				expect(expressApp.get("view engine")).toEqual("pug");
			});

			it("Get request for non-existent route returns 404 error", async () => {
				const res = await request(this.mockApp.getExpressApp()).get(
					"/404Error"
				);
				expect(res.status).toEqual(404);
			});

			// Other error statuses that should be tested?
		});
	}
}

new ExpressAppTest().runTests();
