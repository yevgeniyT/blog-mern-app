// The isLoggedIn middleware is responsible for checking if the user is logged in by verifying the authToken in the cookies. If the authToken is valid, the middleware proceeds to the next function in the request-response cycle. If the authToken is not found or invalid, a 401 Unauthorized status code is sent along with a message informing the user that they need to log in to access the resource.

// Import necessary modules and types
import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../helper/jwtToken";
// import type to handle TS error with absence of user Type in Request types
import { AuthenticatedRequest } from "../@types/types";

const isLoggedIn = (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        // 1. Get the authToken from the cookies
        const authToken = req.cookies["authToken"];

        // 2. Check if authToken exists
        if (!authToken) {
            return res.status(401).json({
                message:
                    "You are not logged in. Please log in to access this resource.",
            });
        }

        // 3. Verify the authToken
        verifyToken(authToken, (err, decodedData) => {
            if (err) {
                return res.status(401).json({
                    message: "Invalid token. Please log in again.",
                });
            }

            // 4. Attach the decoded data (user ID and role) to the request object for other middlewares to use
            const user = decodedData;
            req.user = {
                userId: decodedData.userId,
                role: decodedData.role,
            };
            // 5. Proceed to the next middleware
            next();
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "An unknown error occurred.",
        });
    }
};

export { isLoggedIn };
