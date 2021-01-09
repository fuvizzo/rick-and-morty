import express, {
  Express, Request, Response, NextFunction,
} from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import healthcheck from 'express-healthcheck';
import asyncHandler from 'express-async-handler';
import IoCcontainer from '../config/dependencies';
import errorMiddleware from '../error';
import IAuthController from '../contracts/controllers';
import AppError from '../error/app-error';

const app: Express = express();

const { authController }: { authController: IAuthController } = IoCcontainer.cradle;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use(cookieParser());

app.use(cors({
  // origin: '*',
  credentials: true,
}));

app.use('/_health', healthcheck());

app.post('/sign-up', asyncHandler(
  (req: Request,
    res: Response,
    next: NextFunction) => authController.signUp(req, res, next),
));

app.post('/sign-in', asyncHandler(
  (req: Request,
    res: Response,
    next: NextFunction) => authController.signIn(req, res, next),
));

app.post('/sign-out', asyncHandler(
  (req: Request,
    res: Response,
    next: NextFunction) => authController.signOut(req, res, next),
));

app.post('/token', asyncHandler(
  (req: Request,
    res: Response,
    next: NextFunction) => authController.issueNewAccessToken(req, res, next),
));

app.all('*', (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(errorMiddleware);

export default app;
