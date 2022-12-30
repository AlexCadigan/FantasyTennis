import App, { FilePaths } from "../src/App";
import { Application } from "express";
import path from "path";
import request from "supertest";
import Settings from "../src/config/Config";

/**
 * Unit tests for the App class.
 */
class AppTest {
	//#region Properties

	// Mock object representing this application
	private mockApp!: App;

	// Mock object representing the Express application
	private mockExpressApp!: Application;

	//#endregion

	//#region Tests

	/**
	 * Runs all unit tests for this class.
	 */
	public runTests(): void {
		describe("Test the App class", () => {
			// Preforms setup necessary for each test
			beforeEach(() => {
				this.mockApp = new App(Settings.port);
				this.mockExpressApp = this.mockApp.getExpressApp();
			});

			// Verify new instance of the app is constructed correctly
			it("Constructor initalizes new Express app object and sets instance variables", () => {
				expect(this.mockExpressApp).not.toBeNull();
				expect(this.mockApp.getPort()).toEqual(Settings.port);
				expect(this.mockApp.getNodeEnv()).toEqual(Settings.testNodeEnv);
			});

			// Verify new instance of the app is setup correctly
			it("Constructor sets up Express app correctly", () => {
				expect(this.mockExpressApp.get("port")).toEqual(Settings.port);
				expect(this.mockExpressApp.get("views")).toEqual(
					path.join(__dirname, FilePaths.views)
				);
				expect(this.mockExpressApp.get("view engine")).toEqual("pug");
			});

			// Request for non-existant resource returns 404 error
			it("Get request for non-existant route returns 404 error", async () => {
				const res = await request(this.mockExpressApp).get("/404Error");

				expect(res.status).toEqual(404);
			});

			// TODO: Test error handling for other statuses, not just 404 (i.e. 500).  I can't figure out how to mock these.
		});
	}

	//#endregion
}

new AppTest().runTests();
