import {
  createContainer,
  InjectionMode,
  asClass,
  asFunction,
  asValue,
} from 'awilix';

import MongoDbDatabaseService from '../../frameworks/persistence/mongo-db/in-memory/database-service';
import { AccountService, AuthTokenService } from '../../services';
import AuthController from '../../controllers/auth-controller';
import AccountRepository from '../../frameworks/persistence/mongo-db/repositories/account';
import AuthTokenRepository from '../../frameworks/persistence/mongo-db/repositories/auth-token';
import RefreshTokenModel from '../../frameworks/persistence/mongo-db/models/auth-token';
import AccountModel from '../../frameworks/persistence/mongo-db/models/account';

const container = createContainer({
  injectionMode: InjectionMode.PROXY,
});

container.register({
  databaseService: asClass(MongoDbDatabaseService).singleton(),
  accountModel: asValue(AccountModel),
  refreshTokenModel: asValue(RefreshTokenModel),
  accountRepository: asClass(AccountRepository),
  authTokenRepository: asClass(AuthTokenRepository),
  authController: asClass(AuthController),
  accountService: asFunction(AccountService.default),
  authTokenService: asFunction(AuthTokenService.default),
});

export default container;
