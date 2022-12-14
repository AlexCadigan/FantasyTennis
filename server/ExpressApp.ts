import createError, { HttpError } from "http-errors";
import express, { Application, NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import path from "path";

//#region Enums

/**
 * Application filepaths.
 */
export enum FilePaths {
	views = "../../server/views/"
}

/**
 * Default environment values
 */
enum EnvironmentDefaults {
	devNodeEnv = "development"
}

//#endregion

/**
 * Represents the Express application and contains core business logic.
 */
export default class ExpressApp {
	//#region Properties

	// Actual Express application object
	private readonly app: Application;

	// Port that the server is running on
	private readonly port: string;

	// Node environment that the application is running in
	private readonly nodeEnv: string = EnvironmentDefaults.devNodeEnv;

	//#endregion

	//#region Constructors

	/**
	 * Creates an instance of an Express application.
	 * @param port Port that the server is running on.
	 */
	public constructor(port: string) {
		this.app = express();

		// Set environment variables
		this.port = port;
		this.nodeEnv = process.env.NODE_ENV ?? this.nodeEnv;

		this.setupExpressApp();
	}

	//#endregion

	//#region Accessors

	/**
	 * Gets the express application used by the program.
	 * @returns Express application object.
	 */
	public getExpressApp(): Application {
		return this.app;
	}

	//#endregion

	//#region Private Functions

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
