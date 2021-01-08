import express, {
  Request,
  Response,
  NextFunction,
} from 'express';

import asyncHandler from 'express-async-handler';
import IoCcontainer from '../config/dependencies';
import IUserController from '../contracts/controllers';
import authService from './jwt-auth';

const { userController }: { userController: IUserController } = IoCcontainer.cradle;

const router = express.Router();

router.use(authService.authenticateRequest);

router.get('/', authService.authorizeOnlyAdminRequest, asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => userController.getUsers(req, res, next),
));

router.put('/:userId', authService.authorizeRequest, asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => userController.updateUser(req, res, next),
));

router.delete('/:userId', authService.authorizeRequest, asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => userController.deleteUser(req, res, next),
));

export default router;
