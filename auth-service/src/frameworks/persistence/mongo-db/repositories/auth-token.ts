import jwt from 'jsonwebtoken';
import { IAuthTokenBody } from '../../../../contracts/entities';
import { IAuthTokenRepository } from '../../../../contracts/repositories';
import { IMongoRefreshToken } from '../models/auth-token';

export type IMongoDbAuthTokenRepository = IAuthTokenRepository;

class MongoDbAuthTokenRepository implements IMongoDbAuthTokenRepository {
  refreshTokenModel: IMongoRefreshToken;

  constructor({ refreshTokenModel }: { refreshTokenModel: IMongoRefreshToken }) {
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

      await this.refreshTokenModel.findOneAndUpdate({
        userName: authTokenBody.userName,
      }, {
        userName: authTokenBody.userName,
        value: refreshToken,
      }, {
        useFindAndModify: false,
        new: true,
        upsert: true,
      });

      return refreshToken;
    },
    delete: async (token: string): Promise<boolean> => {
      try {
        const authTokenBody = jwt.verify(
          token,
          process.env.REFRESH_TOKEN_SECRET as string,
        ) as IAuthTokenBody;
        const deletedToken = await this.refreshTokenModel.findOneAndDelete({
          userName: authTokenBody.userName,
        });
        return !!deletedToken;
      } catch (err) {
        return false;
      }
    },
    verify: async (token: string): Promise<IAuthTokenBody | null> => {
      try {
        const authTokenBody = jwt.verify(
          token,
          process.env.REFRESH_TOKEN_SECRET as string,
        ) as IAuthTokenBody;
        const itExists = await this.refreshTokenModel.exists({
          userName: authTokenBody.userName,
        });
        return itExists ? authTokenBody : null;
      } catch (err) {
        return null;
      }
    },
  }
}

export default MongoDbAuthTokenRepository;
