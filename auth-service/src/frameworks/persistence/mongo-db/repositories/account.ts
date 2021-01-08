import { IAccount, IBasicInfo, IUserAccount } from '../../../../contracts/entities';
import {
  IMongoAccountModel,
  IMongoDbAccountDocument,
} from '../models/account';
import { IAccountRepository } from '../../../../contracts/repositories';

export type IMongoDbAccountRepository = IAccountRepository<string>;

class MongoDbAccountRepository implements IMongoDbAccountRepository {
  accountModel: IMongoAccountModel;

  constructor({ accountModel }:{accountModel:IMongoAccountModel}) {
    this.accountModel = accountModel;
  }

  create = async (account: IAccount, basicInfo: IBasicInfo): Promise<string> => {
    const newAccount: IMongoDbAccountDocument = await this.accountModel.findOneAndUpdate({
      account,
    }, { account, basicInfo }, {
      useFindAndModify: false,
      new: true,
      upsert: true,
    });

    return newAccount.id!;
  }

  delete = async (userId: string): Promise<void> => {
    await this.accountModel.deleteOne({ _id: userId });
  }

  getById = async (userId: string): Promise<IUserAccount<string> | null> => {
    const data: IMongoDbAccountDocument | null = await this.accountModel.findOne({ _id: userId });
    if (data) {
      return {
        id: data.id!,
        ...data.account,
        ...data.basicInfo,
      };
    }
    return null;
  }

  getByEmail = async (email: string): Promise<IUserAccount<string> | null> => {
    const data: IMongoDbAccountDocument | null = await this.accountModel.findOne({
      'account.email': email,
    });
    if (data) {
      return {
        id: data.id!,
        ...data.account,
        ...data.basicInfo,
      };
    }
    return null;
  }
}

export default MongoDbAccountRepository;
