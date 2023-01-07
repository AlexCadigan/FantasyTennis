import express, { NextFunction, Request, Response } from "express";

const router = express.Router();

// Return index page that serves as the base of the React app
router.get("/", (_req: Request, res: Response, _next: NextFunction) => {
	res.sendFile("index.html");
});

export default router;
