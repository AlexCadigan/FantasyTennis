import { createServer, Server } from "http";
import App from "./App";
import { debug } from "console";
import Settings from "./Config/Config";

/**
 * Represents the server the application runs on.
 */
class AppServer {
	//#region Properties

	// Express application used by the server
	private readonly expressApp: App;

	// Actual HTTP server object
	private readonly server: Server;

	// Port that the server is running on
	private readonly port: string = Settings.port;

	//#endregion

	//#region Constructors

	/**
	 * Creates an instance of an HTTP server.
	 */
	public constructor() {
		this.port = process.env.PORT ?? this.port;

		// Create Express application and HTTP server
		this.expressApp = new App(this.port);
		this.server = createServer(this.expressApp.getExpressApp());

		this.setupServer();
	}

	//#endregion

	//#region Private Functions

	/**
	 * Configures the HTTP server for this application.
	 */
	private setupServer(): void {
		this.server.listen(this.port);

		this.server.on("error", (error: NodeJS.ErrnoException) => {
			this.onError(error);
		});

		this.server.on("listening", () => {
			this.onListening();
		});
	}

	/**
	 * Event listener for the HTTP server "error" event.  Formats the error into a user-friendly
	 * message if appropriate.
	 * @param error Error sent from the server.
	 */
	private onError(error: NodeJS.ErrnoException): void {
		if (error.syscall !== "listen") {
			throw error;
		}

		const baseMessage = `Port ${this.port}`;

		// Handle specific listen errors
		switch (error.code) {
			case "EACCES":
				console.error(`${baseMessage} requires elevated privileges`);
				process.exit(1);
			// break unecessary
			case "EADDRINUSE":
				console.error(`${baseMessage} is already in use`);
				process.exit(1);
			// break unecessary
			default:
				throw error;
		}
	}

	/**
	 * Event listener for the HTTP server "listening" event.
	 */
	private onListening(): void {
		// Show what port we're listening on
		const address = this.server.address();
		const baseMessage =
			typeof address === "string"
				? `Pipe ${address}`
				: `Port ${address?.port}`;
		debug(`Listening on ${baseMessage}`);
	}

	//#endregion
}

export default new AppServer();
