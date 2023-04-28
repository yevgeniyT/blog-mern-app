import jwt from "jsonwebtoken";

import dev from "../config";

import { UserPayload } from "../@types/userTypes";

const getToken = (
    payload: UserPayload,
    //The purpose of the requiredFields parameter is to specify which fields in the UserPayload object are required for the current use case of the getToken function. By iterating through the requiredFields array, the function checks if each specified field is present in the payload object and throws an error if any of them are missing.
    //keyof UserPayload: This is a TypeScript utility type that returns a union of the keys of the UserPayload interface. For example, if UserPayload has properties email, password, firstName, and lastName, then keyof UserPayload would be a type equivalent to 'email' | 'password' | 'firstName' | 'lastName'.
    //(keyof UserPayload)[]: This is an array of the keys of the UserPayload interface. In this case, it represents an array that can have any combination of the keys of UserPayload. For example, ['email', 'password'] or ['firstName', 'lastName', 'avatarImage']
    requiredFields: (keyof UserPayload)[]
): string => {
    // Check if all required fields are present. This code block is a for...of loop that iterates over the requiredFields array. The requiredFields array contains the keys from the UserPayload interface that are required for the current use case of the getToken function.
    //In each iteration, field represents a key from the UserPayload interface, which is an element of the requiredFields array.
    for (const field of requiredFields) {
        //The conditional statement if (!payload[field]) checks if the value associated with the current field key in the payload object is falsy (e.g., undefined, null, false, 0, NaN, or an empty string). If the value is falsy, it means the current required field is missing from the payload object.
        if (!payload[field]) {
            throw new Error(`The required field ${field} is missing`);
        }
    }
    // First object is data which will be coded in token, second one is secrect key to uncode
    const token = jwt.sign(payload, dev.app.jwtKey, { expiresIn: "10m" }); //token will be unvalid in to minutes
    return token;
};

const verifyToken = (
    token: string,
    callback: (err: any, decodedData: any) => void
) => {
    jwt.verify(token, dev.app.jwtKey, (err, decodedData) => {
        callback(err, decodedData);
    });
};

// Creats token using getToken function above in controller to be used insted on session-based authentification
const createAuthToken = (userId: string, role: string): string => {
    // Create a payload containing the user ID and role
    const payload: UserPayload = {
        userId,
        role,
    };

    // Call the getToken function above with the payload and required fields
    const token = getToken(payload, ["userId", "role"]);

    return token;
};

export { getToken, verifyToken, createAuthToken };
