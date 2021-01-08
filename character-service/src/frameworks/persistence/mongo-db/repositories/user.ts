import { Types } from 'mongoose';
import IUserRepository from '../../../../contracts/repositories';
import { IUser, IUserInfo } from '../../../../contracts/entities';
import {
  User,
  IMongoDbUserDocument,
  IMongoUserModel,
} from '../models/user';

type IMongoDbUser = IUser<string>

export type IMongoDbUserRepository = IUserRepository<string>;

class MongoDbUserRepository implements IMongoDbUserRepository {
  userModel: IMongoUserModel;

  constructor({ userModel }:{userModel:IMongoUserModel}) {
    this.userModel = userModel;
  }

  update = async (
    userId: string, userInfo: IUserInfo,
  ): Promise<IMongoDbUser | null> => {
    const user = new User(Types.ObjectId(String(userId)), userInfo);

    const result = await this.userModel.findByIdAndUpdate({ _id: userId }, user, {
      useFindAndModify: false,
      new: true,
      upsert: true,
    });
    if (result.value) {
      const document:IMongoDbUserDocument = result.value;
      return {
        id: document.id,
        address: document.address,
        phoneNumber: document.phoneNumber,
      };
    }
    return null;
  }

  delete = async (userId: string): Promise<void> => {
    await this.userModel.deleteOne({ _id: userId });
  }

  getById = async (userId: string): Promise<IMongoDbUser | null> => {
    const user: IMongoDbUserDocument | null = await this.userModel.findOne({ _id: userId });
    if (user) {
      return user;
    }
    return null;
  }

  getSet = async (size: number, lastId?: string):
    Promise<IMongoDbUser[]> => {
    const users: IMongoDbUserDocument[] = await this.userModel.find(
      lastId
        ? { _id: { $gt: lastId } }
        : {},
    ).limit(size);
    return users;
  }
}

export default MongoDbUserRepository;
