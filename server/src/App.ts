import createError, { HttpError } from "http-errors";
import express, { Application, NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import indexRouter from "./routes/index";
import logger from "morgan";
import path from "path";
import Settings from "./config/Config";

//#region Enums

/**
 * Application filepaths.
 */
export enum FilePaths {
	build = "../../../client/build",
	testEnvBuild = "../../client/build",
	views = "../../../server/src/views/"
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
	 * @param {string} port Port that the app is running on.
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
	 * @returns {Application} Express application object.
	 */
	public getExpressApp(): Application {
		return this.expressApp;
	}

	/**
	 * Gets the port used by the app.
	 * @returns {string} Port used by the app.
	 */
	public getPort(): string {
		return this.port;
	}

	/**
	 * Gets the node environment the app is running in.
	 * @returns {string} Node environment the app is running in.
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
		this.setupRoutes();
		this.initializeErrorHandling();
	}

	/**
	 * Setup middleware used by the application.
	 */
	private initializeMiddleware(): void {
		this.expressApp.use(logger("dev"));
		this.expressApp.use(express.json());
		this.expressApp.use(express.urlencoded({ extended: false }));
		this.expressApp.use(cookieParser());
	}

	/**
	 * Setup Express routes to use for requests/responses from the client.
	 */
	private setupRoutes(): void {
		// Allows us to route directly to files in the 'build' folder
		const clientDir =
			this.nodeEnv === Settings.testNodeEnv
				? path.join(__dirname, FilePaths.testEnvBuild)
				: path.join(__dirname, FilePaths.build);
		this.expressApp.use(express.static(clientDir));

		// Configure routes
		this.expressApp.use("/", indexRouter);
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
