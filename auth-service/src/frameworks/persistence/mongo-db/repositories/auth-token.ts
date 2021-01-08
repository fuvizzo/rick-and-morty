import jwt from 'jsonwebtoken';
import { IAuthTokenBody } from '../../../../contracts/entities';
import { IAuthTokenRepository } from '../../../../contracts/repositories';
import { IMongoRefreshToken } from '../models/auth-token';

export type IMongoDbAuthTokenRepository = IAuthTokenRepository;

class MongoDbAuthTokenRepository implements IMongoDbAuthTokenRepository {
  refreshTokenModel: IMongoRefreshToken;

  constructor({ refreshTokenModel }:{refreshTokenModel:IMongoRefreshToken}) {
    this.refreshTokenModel = refreshTokenModel;
  }

  accessToken = {
    create: (authTokenBody: IAuthTokenBody): string => (
      jwt.sign(authTokenBody,
        process.env.ACCESS_TOKEN_SECRET as string,
        {
          expiresIn: process.env.ACCESS_TOKEN_EXPIRATION_TIME,
        })
    ),
  }

  refreshToken = {
    create: async (authTokenBody: IAuthTokenBody): Promise<string> => {
      const refreshToken = jwt.sign(
        authTokenBody,
        process.env.REFRESH_TOKEN_SECRET as string,

      );
      const Model = this.refreshTokenModel;
      await new Model({ value: refreshToken }).save();
      return refreshToken;
    },
    delete: async (token: string): Promise<boolean> => {
      const deletedToken = await this.refreshTokenModel.findOneAndDelete({ value: token });
      return !!deletedToken;
    },
    verify: async (token: string): Promise<IAuthTokenBody | null> => {
      const tokenExists = await this.refreshTokenModel.exists({ value: token });
      if (tokenExists) {
        try {
          return jwt.verify(
            token,
            process.env.REFRESH_TOKEN_SECRET as string,
          ) as IAuthTokenBody;
        } catch (err) {
          return null;
        }
      }
      return null;
    },
  }
}

export default MongoDbAuthTokenRepository;
