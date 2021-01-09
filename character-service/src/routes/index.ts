import express, {
  Request,
  Response,
  NextFunction,
} from 'express';

import asyncHandler from 'express-async-handler';
import IoCcontainer from '../config/dependencies';
import ICharacterController from '../contracts/controllers';
import authService from './jwt-auth';

const { characterController }: { characterController: ICharacterController } = IoCcontainer.cradle;

const router = express.Router();

router.use(authService.authenticateRequest);

router.get('/', asyncHandler(
  async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => characterController.getCharacters(req, res, next),
));

router.put('/favorites/:userId', authService.authorizeRequest, asyncHandler(
  async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => characterController.toggleFavorite(req, res, next),
));

export default router;
