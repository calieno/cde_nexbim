import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
    sub: string;
}

export function EnsureAuthenticate(request: Request, response: Response, next: NextFunction) {
    const authToken = request.headers.authorization

    if (!authToken) {
        return response.status(401).json({
            message: "Token is missing"
        })
    }
    const [, token] = authToken.split(" ")

    try {
        const { sub } = verify(token, "09da6017-9082-48f3-b786-2f9e0f2e7817") as IPayload

        // Attach user ID to request
        (request as any).userId = sub;

        return next()
    } catch (err) {
        return response.status(401).json({
            message: "Token Invalid"
        })
    }
}