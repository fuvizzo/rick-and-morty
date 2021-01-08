import {
  IAuthTokenBody,
} from '../contracts/entities';
import { IAuthTokenRepository } from '../contracts/repositories';
import { IAuthTokenService } from '../contracts/services';

const AuthTokenService = (
  {
    authTokenRepository,
  }:
    {
      authTokenRepository: IAuthTokenRepository
    },
): IAuthTokenService => ({
  createAccessToken: (tokenBody:IAuthTokenBody) => authTokenRepository.accessToken.create(tokenBody),
  createRefreshToken: (tokenBody:IAuthTokenBody) => authTokenRepository.refreshToken.create(tokenBody),
  deleteRefreshToken: (token: string) => authTokenRepository.refreshToken.delete(token),
  verifyRefreshToken: (token: string) => authTokenRepository.refreshToken.verify(token),
});

export default AuthTokenService;
