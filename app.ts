import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { NextFunction } from 'connect';
import morganMiddleware from './middlewares/morgan.middleware';
import Logger from './utils/logger';
import { mainBoardRouter } from './routes/mainBoard';
import { connectDB } from './config/db';
import bodyParser from 'body-parser';
import ErrorMiddleware from './middlewares/error.middleware';

dotenv.config();

const app: Express = express();

connectDB();

app.use(express.json());
app.use(morganMiddleware);
app.use(ErrorMiddleware);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = 8080;

app.use('/main-board', mainBoardRouter);
app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send('Express + TypeScript Server');
});

app.listen(port, () => {
    Logger.debug(`⚡️[server]: Server is running at http://localhost:${port}`)
});
