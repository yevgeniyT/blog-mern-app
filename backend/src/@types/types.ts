// Used to create custom type for Request to handle data recieved from token as reauest is not have such type we extend it with
import { Request } from "express";

export interface AuthenticatedRequest extends Request {
    user: {
        userId: string;
        role: string;
    };
}
