import { NextFunction } from "express-serve-static-core";
import { Request, Response } from 'express';
import { ApiResponse } from "../interface/api";
import Logger from "../utils/logger";

const ErrorMiddleware = (err: any, req: Request, res: Response<ApiResponse<any>>, next: NextFunction) => {
    if (err instanceof SyntaxError && 'body' in err) {
        Logger.error(err);
        return res.status(400).json({message: 'Error', data: 'Enter valid json body'});
    }
    next();
}

export default ErrorMiddleware;