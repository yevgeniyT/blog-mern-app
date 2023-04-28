//The isAdmin middleware checks if the user role stored in the token is "admin" and proceeds to the next middleware if the condition is met. If the user role is not "admin", it returns a 401 Unauthorized response with a corresponding message.

// Import necessary modules and types
import { Request, Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../@types/types";

const isAdmin = (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const role = req.user.role;

        if (role === "admin") {
            next();
        } else {
            res.status(401).json({
                message: "Unauthorized: Only admins can access this resource",
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "An unknown error occurred.",
        });
    }
};

export { isAdmin };
