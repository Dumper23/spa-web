import jwt from 'jsonwebtoken';
import { NextFunction, Response } from 'express';
import { Request } from 'express';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extract token from "Bearer <token>"
    const secret = process.env.JWT_SECRET!;

    // Check if the GraphQL query is public (e.g., login, signup, etc.)
    const operationName = req.body.operationName;
    const publicOperations = ['login', 'CreateUser', 'validateToken']; // Add any public operations here

    if (publicOperations.includes(operationName)) {
        return next(); // Skip token validation for public operations
    }

    if (!token) {
        return res.status(401).json({ message: "Token missing" });
    }

    // If operation is private, validate the token
    jwt.verify(token, secret, (err: any, decoded: any) => {
        if (err) {
            return res.status(403).json({ message: "Token is invalid" });
        }

        req = decoded;
        next();
    });
};
