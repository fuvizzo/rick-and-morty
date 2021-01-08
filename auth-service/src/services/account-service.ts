import { IAccount, IBasicInfo } from '../contracts/entities';
import { IAccountRepository } from '../contracts/repositories';
import { IAccountService } from '../contracts/services';

const AuthService = (
  {
    accountRepository,
  }:
    {
      accountRepository: IAccountRepository<string>
    },
): IAccountService<string> => ({
  create: (account: IAccount, basicInfo: IBasicInfo) => accountRepository.create(account, basicInfo),
  getById: (userId: string) => accountRepository.getById(userId),
  getByEmail: (userId: string) => accountRepository.getByEmail(userId),
  delete: (userId: string) => accountRepository.delete(userId),
});

export default AuthService;
