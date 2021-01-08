import { IUserInfo } from '../contracts/entities';
import IUserRepository from '../contracts/repositories';
import { IUserService } from '../contracts/services';

export default (
  {
    userRepository,
  }:
    {
      userRepository: IUserRepository<string>
    },
): IUserService<string> => ({
  updateUser: (
    userId: string,
    userInfo:IUserInfo,
  ) => userRepository.update(userId, userInfo),
  getUsers: (size: number, lastId?: string) => userRepository.getSet(size, lastId),
  deleteUser: (userId: string) => userRepository.delete(userId),
});
