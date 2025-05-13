import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import {jwtsecret} from '@repo/backend-common'

export interface AuthRequest extends Request {
    user?: { userId: string };
}

export function middleware(req: AuthRequest, res: Response, next: NextFunction) {
    const token = req.headers['authorization'];

    if (!token) {
        res.status(401).send("Authorization token is missing");
        return;
    }

    if (!jwtsecret) {
        throw new Error("JWT_SECRET is not defined in the environment variables");
    }

    try {
        const decoded = jwt.verify(token, jwtsecret) as {userId: string};
        req.user = { userId: decoded.userId };
        next();
    } catch (err) {
        res.status(401).send("Invalid token");
    }
}
