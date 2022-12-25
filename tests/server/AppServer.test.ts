import AppServer from "../../server/AppServer";
import Settings from "../../server/Config/Config";

/**
 * Unit tests for the AppServer class.
 */
class AppServerTest {
	//#region Properties

	// Mock server the application is running on
	private mockAppServer!: AppServer;

	//#endregion

	//#region Tests

	/**
	 * Runs all unit tests for this class.
	 */
	public runTests(): void {
		describe("Test the AppServer class", () => {
			// Preforms setup necessary for each test
			beforeEach(() => {
				this.mockAppServer = new AppServer();
			});

			// Verify new instance of the server is constructed correctly
			it("Constructor initalizes new server object and sets instance variables", () => {
				expect(this.mockAppServer.getPort()).toEqual(Settings.port);
				expect(this.mockAppServer.getApp()).not.toBeNull();
				expect(this.mockAppServer.getServer()).not.toBeNull();
			});

			// Verify the server starts listening
			it("Constructor starts the server listening", () => {
				const httpServer = this.mockAppServer.getServer();

				expect(httpServer.listening).toBeTruthy();

				const address = httpServer.address();
				typeof address === "string"
					? expect(address).toEqual(Settings.port)
					: expect(address?.port).toEqual(Number(Settings.port));
			});

			// Preforms cleanup actions needed after each test
			afterEach(() => {
				this.mockAppServer.getServer().close();
			});
		});
	}

	//#endregion
}

new AppServerTest().runTests();
