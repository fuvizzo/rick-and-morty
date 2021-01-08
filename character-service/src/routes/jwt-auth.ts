import {
  Request, Response, NextFunction,
} from 'express';
import jwt from 'jsonwebtoken';
import Debug from 'debug';
import { IAuthToken, RoleType } from '../contracts/entities';
import AppError from '../error/app-error';

const debug = Debug('jwt-auth-service');

export default {

  authenticateRequest(req: Request, res: Response, next: NextFunction) {
    try {
      const authHeader = req.headers.authorization;
      if (authHeader) {
        const token = authHeader.split(' ')[1];
        try {
          const data = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string) as IAuthToken;

          req.authToken = data;
          debug('the request was successfully authenticated');
          next();
        } catch (err) {
          next(new AppError('Forbidden: invaild token', 403));
        }
      } else {
        next(new AppError('Unauthorized: no authentication provided', 401));
      }
    } catch (err) {
      next(err);
    }
  },
  authorizeRequest(req: Request, res: Response, next: NextFunction) {
    const token:IAuthToken = req.authToken as IAuthToken;
    if (token.userId === req.params.userId
      || token.roles.some((role) => role === RoleType.Admin)) {
      next();
    } else {
      next(new AppError('Forbidden: Not enough permission for user', 403));
    }
  },

  authorizeOnlyAdminRequest(req: Request, res: Response, next: NextFunction) {
    const token:IAuthToken = req.authToken as IAuthToken;
    if (token.roles.some((role) => role === RoleType.Admin)) {
      next();
    } else {
      next(new AppError('Forbidden: Not enough permission for user', 403));
    }
  },

};
