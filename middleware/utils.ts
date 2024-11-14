import { Request, Response } from "express";
import User from "../models/User";

export const authenticate = (req: Request, level: 'master' | 'admin' | 'mod' | 'user' = 'admin') => {
	const code: string = req.headers["x-auth"] as string;
	return User.findByToken(code)
}

export const Err = (err: any, res: Response) => {
	res.status(err?.status ?? 500).send(err?.message ?? err)
}