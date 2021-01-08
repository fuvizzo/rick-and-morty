import { IUser, IUserInfo } from '../entities';

export interface IRepository { }

interface IUserRepository<T> extends IRepository {
  update: (userId: T, userInfo: IUserInfo) => Promise<IUser<T> | null>
  delete: (userId: T) => Promise<void>
  getById: (userId: T) => Promise<IUser<T> | null>
  getSet: (size: number, lastId?: T) => Promise<IUser<T>[]>
}

export default IUserRepository;
