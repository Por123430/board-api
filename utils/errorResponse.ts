import { Response } from 'express';
import Logger from './logger';
const ErrorResponse = (error: any) => {
    if (error.name === "ValidationError") {
        let errors: any = {};
        Object.keys(error.errors).forEach((key) => {
            errors[key] = error.errors[key].message;
        });
        return errors;
    }
    return error;
}

export const DefaultError = (error: any, res: Response) => {
    Logger.error(error);
    return res.status(500).json({
        message: 'Error',
        data: ErrorResponse(error),
    });
}