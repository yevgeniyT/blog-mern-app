// reusable function to handle success/error  status in controllers

import { Response } from "express";

const errorHandler = (res: Response, statusCode: number, message: string) => {
    return res.status(statusCode).json({
        success: true,
        message: message,
    });
};

const successHandler = (
    res: Response,
    statusCode: number,
    message: string,
    data: any = {}
) => {
    return res.status(statusCode).json({
        success: true,
        message: message,
        data: data,
    });
};

export { errorHandler, successHandler };
