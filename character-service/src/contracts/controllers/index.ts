import {
  Request, Response, NextFunction,
} from 'express';

 interface IUserController {
  getUsers: (req: Request, res: Response, next: NextFunction) => Promise<void>
  updateUser: (req: Request, res: Response, next: NextFunction) => Promise<void>
  deleteUser: (req: Request, res: Response, next: NextFunction) => Promise<void>
}

export default IUserController;
