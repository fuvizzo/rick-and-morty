import {
  Request,
  Response,
  NextFunction,
} from 'express';
import Debug from 'debug';

import { IUserInfo } from '../contracts/entities';
import { IUserService } from '../contracts/services';
import IUserController from '../contracts/controllers';

const debug = Debug('user-controller');

class UserController implements IUserController {
  userService: IUserService<string>;

  constructor({ userService }: {
    userService: IUserService<string>,

  }) {
    this.userService = userService;
  }

  getUsers = async (req: Request, res: Response, next: NextFunction) => {
    const { lastId, size } = req.query;
    let users;
    if (typeof lastId !== 'undefined') {
      users = await this.userService.getUsers(Number(size), String(lastId));
    } else {
      users = await this.userService.getUsers(Number(size));
    }

    res.json(users);
    res.status(200);
  };

  updateUser = async (req: Request, res: Response, next: NextFunction) => {
    const userInfo: IUserInfo = {
      address: req.body.address,
      phoneNumber: req.body.phoneNumber,
    };
    const userId: string = String(req.params.userId);
    await this.userService.updateUser(userId, userInfo);

    res.status(204);
    res.end();
  };

  deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;
    await this.userService.deleteUser(userId);

    res.status(204);
    res.end();
  };
}

export default UserController;
