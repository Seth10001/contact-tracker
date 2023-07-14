import { Request, Response } from "express";

const API_USERNAME = process.env?.["API_USERNAME"] ?? ""
const API_PASSWORD = process.env?.["API_PASSWORD"] ?? ""

export const checkPassword = (req: Request, res: Response, next) => {
    const username = req.headers?.['username']
    const password = req.headers?.['password']

    if (API_USERNAME != username || API_PASSWORD != password) {
        res.status(403)
        return next("Not authorized")
    }
    next()
}
