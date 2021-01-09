import { IUserPreferences } from '../../../../contracts/entities';
import { IUserPreferencesRepository } from '../../../../contracts/repositories';

import {
  IMongoUserPreferencesModel,
} from '../models/user-preferences';

export type IMongoDbUserPreferencesRepository = IUserPreferencesRepository;

class MongoDbUserPreferencesRepository implements IMongoDbUserPreferencesRepository {
  userPreferencesModel: IMongoUserPreferencesModel;

  constructor({ userPreferencesModel }: { userPreferencesModel: IMongoUserPreferencesModel }) {
    this.userPreferencesModel = userPreferencesModel;
  }

  get = async (userId:string): Promise<IUserPreferences | null> => {
    const userPreference = await this.userPreferencesModel.findOne({ userId });
    if (userPreference) {
      return userPreference;
    }
    return null;
  }

  update = async (
    userPreferences:IUserPreferences,
  ): Promise<void> => {
    await this.userPreferencesModel.findOneAndUpdate(
      {
        userId: userPreferences.userId,
      },
      userPreferences, {
        useFindAndModify: false,
        new: true,
        upsert: true,
      },
    );
  }
}

export default MongoDbUserPreferencesRepository;
