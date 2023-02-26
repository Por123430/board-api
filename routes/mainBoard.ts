import { Router, Request, Response } from 'express';
import { BoardRequest } from '../interface/board';
import { ApiResponse } from '../interface/api';
import boardModel from '../models/board';
import mongoose from "mongoose";
import { DefaultError } from '../utils/errorResponse';

export const mainBoardRouter = Router();

mainBoardRouter.get('/', async (req: Request, res: Response) => {
    try {
        const board = await boardModel.find({});
        res.status(200).json({
            message: 'Success',
            data: board,
        });
    } catch (error) {
        DefaultError(error,res);
    }
});

mainBoardRouter.post('/', async (req: Request<{}, {}, BoardRequest>, res: Response<ApiResponse<any>>) => {
    try {
        const board = boardModel.build(req.body);
        const err = board.validateSync();
        if (err instanceof mongoose.Error.ValidationError) throw err
        
        board.save();
        res.status(200).json({
            message: 'Success',
            data: board.toJSON(),
        });
    } catch (error) {
        DefaultError(error,res);
    }
});