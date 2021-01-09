import express, {
  Express,
  Request,
  Response,
  NextFunction,
} from 'express';
import _debug from 'debug';
import bodyParser from 'body-parser';

import healthcheck from 'express-healthcheck';
import authRouter from '../routes';
import errorMiddleware from '../error';
import AppError from '../error/app-error';

const app: Express = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use('/_health', healthcheck());

app.use('/characters', authRouter);

app.all('*', (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(errorMiddleware);

export default app;
