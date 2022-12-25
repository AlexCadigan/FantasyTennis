import createError, { HttpError } from "http-errors";
import express, { Application, NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import path from "path";
import Settings from "./Config/Config";

//#region Enums

/**
 * Application filepaths.
 */
export enum FilePaths {
	views = "../../server/views/"
}

//#endregion

/**
 * Represents the application and contains core business logic.
 */
export default class App {
	//#region Properties

	// Express application object
	private readonly expressApp: Application;

	// Port that the app is running on
	private readonly port: string;

	// Node environment that the application is running in
	private readonly nodeEnv: string;

	//#endregion

	//#region Constructors

	/**
	 * Creates an instance of the application.
	 * @param port Port that the app is running on.
	 */
	public constructor(port: string) {
		this.expressApp = express();

		// Set environment variables
		this.port = port;
		this.nodeEnv = process.env.NODE_ENV ?? Settings.devNodeEnv;

		this.setupApp();
	}

	//#endregion

	//#region Accessors

	/**
	 * Gets the express application object used by the application.
	 * @returns Express application object.
	 */
	public getExpressApp(): Application {
		return this.expressApp;
	}

	/**
	 * Gets the port used by the app.
	 * @returns Port used by the app.
	 */
	public getPort(): string {
		return this.port;
	}

	/**
	 * Gets the node environment the app is running in.
	 * @returns Node environment the app is running in.
	 */
	public getNodeEnv(): string {
		return this.nodeEnv;
	}

	//#endregion

	//#region Private Functions

	/**
	 * Preform application setup.
	 */
	private setupApp(): void {
		this.expressApp.set("port", this.port);

		// View engine setup
		this.expressApp.set("views", path.join(__dirname, FilePaths.views));
		this.expressApp.set("view engine", "pug");

		this.initializeMiddleware();
		this.initializeErrorHandling();
	}

	/**
	 * Setup middleware used by the application.
	 */
	private initializeMiddleware(): void {
		this.expressApp.use(logger("dev"));
		this.expressApp.use(express.json());
		this.expressApp.use(express.urlencoded({ extended: false }));
		this.expressApp.use(express.static(path.join(__dirname, "public")));
		this.expressApp.use(cookieParser());
	}

	/**
	 * Setup application error handling.
	 */
	private initializeErrorHandling(): void {
		// Catch 404 errors and forward them to the error handler
		this.expressApp.use(
			(_req: Request, _res: Response, next: NextFunction) => {
				next(createError(404));
			}
		);

		// Catch all other errors
		this.expressApp.use(
			(
				err: HttpError,
				_req: Request,
				res: Response,
				_next: NextFunction
			) => {
				// Set locals (only provide error in development)
				res.locals.message = err.message;
				res.locals.error =
					this.nodeEnv === Settings.devNodeEnv ? err : {};

				// Render the error page
				res.status(err.status || 500);
				res.render("error");
			}
		);
	}

	//#endregion
}
