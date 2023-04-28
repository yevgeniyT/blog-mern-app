// Import necessary modules
import { Request, Response, NextFunction } from "express";
import fs from "fs";

import { isEmailValid, isStrongPassword } from "../helper/validation";

// Create types that can be one of the following string literals. This helps in preventing errors due to typos or using invalid field names. When you use the FieldName type for a variable or a function parameter
type FieldName = "email" | "password" | "firstName" | "lastName";

// / Create a validation middleware factory function that accepts an array of required fields and returns a middleware function
const createValidationMiddleware = (requiredFields: FieldName[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        // destructuring all we recieve from req.body
        const userData = { ...req.body } as Record<FieldName, unknown>;

        // Check for missing required fields
        // create variable that will colllect input fields keys depending on how many of them are used. Is needed to dispaly them as missing fields in error message.
        const missingFields: FieldName[] = [];
        // for ... of recieves in field every key from requiredFilelds which will be passed from corespondig middleware and in case there is no such a filead they will be saasigned to missingFelids variable.
        for (const field of requiredFields) {
            if (!userData[field]) {
                missingFields.push(field);
            }
        }
        // Check if there is at least one filed that is missed the avatar image will not be saved, if not do this chech, every time we try to run post request, even if we have error of missing field the image will be saved
        if (missingFields.length > 0) {
            // Delete the uploaded file
            if (req.file) {
                fs.unlink(req.file.path, (err) => {
                    if (err) {
                        console.error("Error deleting the file:", err);
                    }
                });
            }
            return res.status(400).json({
                error: `The following required fields are missing: ${missingFields.join(
                    ", "
                )}`,
            });
        }
        // Validate email
        if (
            requiredFields.includes("email") &&
            !isEmailValid(userData.email as string)
        ) {
            return res.status(400).json({ error: "Invalid email format." });
        }

        // Validate password
        if (
            requiredFields.includes("password") &&
            !isStrongPassword(userData.password as string)
        ) {
            return res.status(400).json({
                error: "Password must be at least 8 characters long.",
            });
        }

        // Proceed to the next middleware if validation passes
        next();
    };
};

export { createValidationMiddleware };
