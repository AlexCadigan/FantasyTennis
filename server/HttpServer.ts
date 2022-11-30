import http, { Server } from "http";
import { debug } from "console";
import ExpressApp from "./ExpressApp";

//#region Enums

/**
 * Default environment values
 */
enum EnvironmentDefaults {
	port = "3000"
}

//#endregion

/**
 * Represents the HTTP server this application runs on. 
 */
class HttpServer {
	//#region Properties

	// Express application used by the server
	private readonly expressApp: ExpressApp;

	// Actual HTTP server object
	private readonly server: Server;

	// Port that the server is running on
	private readonly port: string = EnvironmentDefaults.port;

	//#endregion

	//#region Constructors

	/**
	 * Creates an instance of an HTTP server.
	 */
	public constructor() {
		this.port = process.env.PORT ?? this.port;

		// Create Express application and HTTP server
		this.expressApp = new ExpressApp(this.port);
		this.server = http.createServer(this.expressApp.getExpressApp());

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

export default new HttpServer();
