import express, { Request, Response } from "express";
import APIs from "./routes";

const router = express.Router();

router.get(APIs.signIn, (_req: Request, res: Response) => {
	res.status(200).send("test");
});

export default router;
