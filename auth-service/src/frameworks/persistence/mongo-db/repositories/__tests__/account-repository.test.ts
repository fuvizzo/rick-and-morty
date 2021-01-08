import sinon, { SinonStub } from 'sinon';

import AccountRepository from '../account';
import { IAccount, IBasicInfo, RoleType } from '../../../../../contracts/entities';
import { IAccountRepository } from '../../../../../contracts/repositories';
import AccountModel, { IMongoAccountModel } from '../../models/account';

const account: IAccount = {
  email: 'foo@foo.boo',
  password: 'password',
  roles: [RoleType.Customer],
  disabled: false,
};
const basicInfo: IBasicInfo = {
  firstName: 'foo',
  lastName: 'boo',
};

describe('Account repo unit tests', () => {
  it('Has a module', () => {
    expect(AccountRepository).toBeDefined();
  });

  describe('Create a new Account', () => {
    it('saves a new Account in the db', async () => {
      const accountModel: IMongoAccountModel = AccountModel;

      const method:SinonStub = sinon
        .mock(AccountModel)
        .expects('findOneAndUpdate')
        .resolves({
          id: 'abc123',
          account,
          basicInfo,
        });

      const accountRepository: IAccountRepository<string> = new AccountRepository({ accountModel });
      const userId: string = await accountRepository.create(account, basicInfo);

      sinon.assert.calledOnce(method);

      expect(userId).toEqual('abc123');
    });
  });
});
