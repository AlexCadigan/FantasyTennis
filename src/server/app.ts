import createError, { HttpError } from "http-errors";
import express, { NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import { debug } from "console";
import http from "http";
import logger from "morgan";
import path from "path";

//#region Enums

/**
 * Application filepaths.
 */
enum FilePaths {
	views = "../../server/views/"
}

/**
 * Default environment values5
 */
enum EnvironmentDefaults {
	port = "3000",
	devNodeEnv = "development"
}

//#endregion

/**
 * Represents the Express application and contains core business logic.
 */
class App {
	//#region Instance Variables

	// Express application
	private readonly app: express.Application;

	// Server that application is running on
	private readonly server: http.Server;

	// Port that the server is running on
	private readonly port: string = EnvironmentDefaults.port;

	// Node environment that the application is running in
	private readonly nodeEnv: string = EnvironmentDefaults.devNodeEnv;

	//#endregion

	//#region Constructors

	/**
	 * Initializes an instance of this object.
	 */
	public constructor() {
		// Create application and server
		this.app = express();
		this.server = http.createServer(this.app);

		// Set environment variables
		this.port = process.env.PORT ?? this.port;
		this.nodeEnv = process.env.NODE_ENV ?? this.nodeEnv;
	}

	//#endregion

	//#region Public Functions

	/**
	 * Configures the Express server for this application.
	 */
	public setupServer(): void {
		this.server.listen(this.port);

		this.server.on("error", (error: NodeJS.ErrnoException) => {
			this.onError(error);
		});

		this.server.on("listening", () => {
			this.onListening();
		});

		this.setupExpressApp();
	}

	//#endregion

	//#region Private Functions

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

	/**
	 * Preform Express application setup.
	 */
	private setupExpressApp(): void {
		this.app.set("port", this.port);

		// View engine setup
		this.app.set("views", path.join(__dirname, FilePaths.views));
		this.app.set("view engine", "pug");

		this.initializeMiddleware();
		this.initializeErrorHandling();
	}

	/**
	 * Setup middleware used by the application.
	 */
	private initializeMiddleware(): void {
		this.app.use(logger("dev"));
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: false }));
		this.app.use(express.static(path.join(__dirname, "public")));
		this.app.use(cookieParser());
	}

	/**
	 * Setup application error handling.
	 */
	private initializeErrorHandling(): void {
		// Catch 404 errors and forward them to the error handler
		this.app.use((_req: Request, _res: Response, next: NextFunction) => {
			next(createError(404));
		});

		// Catch all other errors
		this.app.use(
			(
				err: HttpError,
				_req: Request,
				res: Response,
				_next: NextFunction
			) => {
				// Set locals (only provide error in development)
				res.locals.message = err.message;
				res.locals.error =
					this.nodeEnv === EnvironmentDefaults.devNodeEnv ? err : {};

				// Render the error page
				res.status(err.status || 500);
				res.render("error");
			}
		);
	}

	//#endregion
}

const expressApp = new App();
expressApp.setupServer();
