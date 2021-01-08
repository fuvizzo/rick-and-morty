import { IUser, IUserInfo } from '../entities';

export interface IUserService<T> {
  updateUser: (userId: T, userInfo: IUserInfo) => Promise<IUser<T> | null>
  getUsers: (size: number, lastId?: T) => Promise<IUser<T>[]>
  deleteUser: (userId: T) => Promise<void>
}
