import {
  Request,
  Response,
  NextFunction,
} from 'express';
import Debug from 'debug';
import bcrypt from 'bcrypt';
import { SignInSchema, SignUpSchema, RefreshTokenSchema } from '../schemas';
import {
  IAccount,
  IAuthTokenBody,
  IBasicInfo,
  IUserAccount,
} from '../contracts/entities';
import { IAccountService, IAuthTokenService } from '../contracts/services';
import AppError from '../error/app-error';
import IAuthController from '../contracts/controllers';

const debug = Debug('auth-controller');

const createAuthCookie = (res: Response,

  refreshToken: string): void => {
  res.cookie('refresh-token',
    refreshToken,
    {
      domain: 'auth-service',
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
      maxAge: Number(process.env.AUTH_COOKIE_MAX_AGE),
      httpOnly: true,
    });
};

class AuthController implements IAuthController {
  accountService: IAccountService<string>;

  authTokenService: IAuthTokenService;

  constructor({ accountService, authTokenService }: {
    accountService: IAccountService<string>,
    authTokenService: IAuthTokenService
  }) {
    this.accountService = accountService;
    this.authTokenService = authTokenService;
  }

  signUp = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const { error } = SignUpSchema.validate(req.body);
    if (error) {
      next(new AppError(error.message, 400));
    } else {
      const {
        email, password, lastName, firstName,
      } = req.body;
      const account: IAccount = {
        email,
        password,
      };
      const basicInfo: IBasicInfo = {
        lastName,
        firstName,
      };
      const user: IUserAccount<string> | null = await this.accountService.getByEmail(account.email);
      if (user) {
        next(new AppError('Email already in use', 409));
      } else {
        const userId: string = await this.accountService.create(account, basicInfo);

        const authTokenBody: IAuthTokenBody = {
          userId,
          userName: account.email,
          firstName,
          lastName,
          roles: account.roles!,
        };

        const accessToken: string = this.authTokenService.createAccessToken(authTokenBody);
        const refreshToken: string = await this.authTokenService.createRefreshToken(authTokenBody);
        createAuthCookie(res, refreshToken);
        res.status(201);
        res.json({
          accessToken,
        });
      }
    }
  };

  signIn = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const { error } = SignInSchema.validate(req.body);
    if (error) {
      next(new AppError(error.message, 400));
    } else {
      const {
        email, password,
      } = req.body;

      const userAccount: IUserAccount<string> | null = await this.accountService.getByEmail(email);

      if (userAccount && await bcrypt.compare(password, userAccount.password)) {
        const authTokenBody: IAuthTokenBody = {
          userId: userAccount.id!,
          userName: userAccount.email,
          roles: userAccount.roles!,
          firstName: userAccount.firstName,
          lastName: userAccount.lastName,
        };
        const accessToken: string = this.authTokenService.createAccessToken(authTokenBody);
        const refreshToken: string = await this.authTokenService.createRefreshToken(authTokenBody);
        createAuthCookie(res, refreshToken);

        res.json({
          accessToken,
        });
      } else {
        next(new AppError('Username or password incorrect', 401));
      }
    }
  };

  issueNewAccessToken = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const token = req.cookies['refresh-token'];
    const { error } = RefreshTokenSchema.validate(token);
    if (error) {
      next(new AppError('No refresh token provided', 401));
    } else {
      const refreshTokenBody: IAuthTokenBody | null = await this.authTokenService.verifyRefreshToken(token);
      if (!refreshTokenBody) {
        next(new AppError('Invalid refresh token', 403));
      } else {
        const accessToken = this.authTokenService.createAccessToken(refreshTokenBody);
        res.json({
          accessToken,
        });
      }
    }
  }

  signOut = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(' ')[1];
      const isLoggedOut: boolean = await this.authTokenService.deleteRefreshToken(token);
      if (isLoggedOut) {
        res.status(204);
        res.end();
      } else {
        next(new AppError('Unauthorized', 401));
      }
    } else {
      next(new AppError('Unauthorized', 401));
    }
  };
}

export default AuthController;
