import {
  createContainer,
  InjectionMode,
  asClass,
  asFunction,
  asValue,
} from 'awilix';
import UserController from '../../controllers/user-controller';
import UserModel from '../../frameworks/persistence/mongo-db/models/user';
import UserRepository from '../../frameworks/persistence/mongo-db/repositories/user';
import MongoDbDatabaseService from '../../frameworks/persistence/mongo-db/in-memory/database-service';
import UserService from '../../services/user-service';

const container = createContainer({
  injectionMode: InjectionMode.PROXY,
});

container.register({
  databaseService: asClass(MongoDbDatabaseService).singleton(),
  userModel: asValue(UserModel),
  userRepository: asClass(UserRepository),
  userController: asClass(UserController),
  userService: asFunction(UserService),
});

export default container;
