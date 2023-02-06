import AppServer from "../../server/src/AppServer";
import Settings from "../../server/src/config/Config";

// Mock server the application is running on
let mockAppServer!: AppServer;

/**
 * Unit tests for the AppServer class.
 */
describe("Test the AppServer class", () => {
	// Preforms setup necessary for each test
	beforeEach(() => {
		mockAppServer = new AppServer();
	});

	// Verify new instance of the server is constructed correctly
	it("Constructor initalizes new server object and sets instance variables", () => {
		expect(mockAppServer.getPort()).toEqual(Settings.port);
		expect(mockAppServer.getApp()).not.toBeNull();
		expect(mockAppServer.getServer()).not.toBeNull();
	});

	// Verify the server starts listening
	it("Constructor starts the server listening", () => {
		const httpServer = mockAppServer.getServer();
		const address = httpServer.address();
		const addressPort =
			typeof address === "string" ? address : address?.port;
		const settingPort =
			typeof address === "string" ? Settings.port : Number(Settings.port);

		expect(httpServer.listening).toBeTruthy();
		expect(addressPort).toEqual(settingPort);
	});

	// Preforms cleanup actions needed after each test
	afterEach(() => {
		mockAppServer.getServer().close();
	});
});
