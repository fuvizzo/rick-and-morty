import {
  createContainer,
  InjectionMode,
  asFunction,
  asClass,
  asValue,
} from 'awilix';
import CharacterController from '../controllers/character-controller';
import UserModel from '../frameworks/persistence/mongo-db/models/user-preferences';
import UserPreferencesRepository from '../frameworks/persistence/mongo-db/repositories/user-preferences';
import MongoDbDatabaseService from '../frameworks/persistence/mongo-db/in-memory/database-service';
import CharacterService from '../services/character-service';
import UserPreferencesService from '../services/user-preferences-service';

const container = createContainer({
  injectionMode: InjectionMode.PROXY,
});

container.register({
  databaseService: asClass(MongoDbDatabaseService).singleton(),
  userModel: asValue(UserModel),
  userPreferencesRepository: asClass(UserPreferencesRepository),
  characterController: asClass(CharacterController),
  characterService: asFunction(CharacterService),
  userPreferencesService: asFunction(UserPreferencesService),
});

export default container;
