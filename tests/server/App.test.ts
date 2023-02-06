import App, { FilePaths } from "../../server/src/App";
import { Application } from "express";
import path from "path";
import request from "supertest";
import Settings from "../../server/src/config/Config";

// Mock object representing this application
let mockApp: App;

// Mock object representing the Express application
let mockExpressApp!: Application;

/**
 * Unit tests for the App class.
 */
describe("Test the App class", () => {
	// Preforms setup necessary for each test
	beforeEach(() => {
		mockApp = new App(Settings.port);
		mockExpressApp = mockApp.getExpressApp();
	});

	// Verify new instance of the app is constructed correctly
	it("Constructor initalizes new Express app object and sets instance variables", () => {
		expect(mockExpressApp).not.toBeNull();
		expect(mockApp.getPort()).toEqual(Settings.port);
		expect(mockApp.getNodeEnv()).toEqual(Settings.testNodeEnv);
	});

	// Verify new instance of the app is setup correctly
	it("Constructor sets up Express app correctly", () => {
		expect(mockExpressApp.get("port")).toEqual(Settings.port);
		expect(mockExpressApp.get("views")).toEqual(
			path.join(__dirname, FilePaths.views)
		);
		expect(mockExpressApp.get("view engine")).toEqual("pug");
	});

	// Smoke test to verify the index page is returned
	it("Homepage request returns valid response", async () => {
		const res = await request(mockExpressApp).get("/");

		expect(res.statusCode).toBe(200);
		expect(res.type).toBe("text/html");
	});

	// Request for non-existant resource returns 404 error
	it("Get request for non-existant route returns 404 error", async () => {
		const res = await request(mockExpressApp).get("/404Error");

		expect(res.status).toEqual(404);
	});

	// TODO: Test error handling for other statuses, not just 404 (i.e. 500).  I can't figure out how to mock these.
});
