import {
  createContainer,
  InjectionMode,
  asFunction,
  asClass,
  asValue,
} from 'awilix';
import AuthController from '../controllers/auth-controller';

import DatabaseService from '../frameworks/persistence/mongo-db/database-service';
import AccountRepository from '../frameworks/persistence/mongo-db/repositories/account';
import AuthTokenRepository from '../frameworks/persistence/mongo-db/repositories/auth-token';
import RefreshTokenModel from '../frameworks/persistence/mongo-db/models/auth-token';
import AccountModel from '../frameworks/persistence/mongo-db/models/account';
import { AccountService, AuthTokenService } from '../services';

const container = createContainer({
  injectionMode: InjectionMode.PROXY,
});

container.register({
  databaseService: asClass(DatabaseService).singleton(),
  accountModel: asValue(AccountModel),
  refreshTokenModel: asValue(RefreshTokenModel),
  accountRepository: asClass(AccountRepository),
  authTokenRepository: asClass(AuthTokenRepository),
  authController: asClass(AuthController),
  accountService: asFunction(AccountService.default),
  authTokenService: asFunction(AuthTokenService.default),
});

export default container;
