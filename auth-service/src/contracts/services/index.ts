import {
  IAccount, IAuthTokenBody, IBasicInfo, IUserAccount,
} from '../entities';

export interface IAccountService<T> {
  create: (account: IAccount, basicInfo: IBasicInfo) => Promise<T>
  getById: (userId: T) => Promise<IUserAccount<T> | null>
  getByEmail: (email: string) => Promise<IUserAccount<T> | null>
  delete: (userId: T) => Promise<void>
}

export interface IAuthTokenService {
  createAccessToken: (tokenBody: IAuthTokenBody) => string
  createRefreshToken: (tokenBody: IAuthTokenBody) => Promise<string>
  deleteRefreshToken: (userName: string) => Promise<boolean>
  verifyRefreshToken: (token: string) => Promise<IAuthTokenBody | null>
}
