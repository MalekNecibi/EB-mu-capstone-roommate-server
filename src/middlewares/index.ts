import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const ERR_NO_TOKEN = 'no token';
const ERR_INVALID_TOKEN = 'invalid token';

export const authorize = (req: Request, res: Response, next: NextFunction) => {
    const err = (message: string, status = 401): void => {
        res.status(status).json({ message });
    };

    try {
        const authHeader = req.headers.authorization;
        // console.log(`[authorize] header:${authHeader}`);
        if (!authHeader) return err(ERR_NO_TOKEN);

        const authPieces = authHeader.split(' ');
        if (authPieces.length < 2) return err(ERR_INVALID_TOKEN);

        const token = authPieces[1].trim();
        // console.log(`[authorize] token:${token}`);

        const payload = jwt.verify(token, 'demo-secret');
        // console.log(`[authorize] payload:${JSON.stringify(payload)}`);

        next();
    } catch (_error) {
        err(`${_error}`);
    }
};