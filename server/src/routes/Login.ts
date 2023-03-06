import express, { Request, Response } from "express";
import APIs from "./routes";

const router = express.Router();

console.log("made it here");

router.get(APIs.signIn, (_req: Request, res: Response) => {
	res.status(200).send("test");
	console.log("Inside this request");
});

export default router;
