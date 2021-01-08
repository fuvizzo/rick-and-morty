import {
  IAccount, IAuthTokenBody, IBasicInfo, IUserAccount,
} from '../entities';

export interface IRepository { }

export interface IAccountRepository<T> extends IRepository {
  create: (account: IAccount, basicInfo: IBasicInfo) => Promise<T>
  delete: (userId: T) => Promise<void>
  getById: (userId: T) => Promise<IUserAccount<T> | null>
  getByEmail: (email: T) => Promise<IUserAccount<T> | null>
}

export interface IAuthTokenRepository extends IRepository {
  accessToken: {
    create: (tokenBody: IAuthTokenBody) => string
  }
  refreshToken: {
    create: (tokenBody: IAuthTokenBody) => Promise<string>
    delete: (token: string) => Promise<boolean>
    verify: (token: string) => Promise<IAuthTokenBody | null>
  }
}
