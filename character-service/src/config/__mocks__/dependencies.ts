import {
  createContainer,
  InjectionMode,
  asClass,
  asFunction,
  asValue,
} from 'awilix';
import CharacterController from '../../controllers/character-controller';
import UserPreferencesModel from '../../frameworks/persistence/mongo-db/models/user-preferences';
import UserPreferencesRepository from '../../frameworks/persistence/mongo-db/repositories/user-preferences';
import MongoDbDatabaseService from '../../frameworks/persistence/mongo-db/in-memory/database-service';
import CharacterService from '../../services/character-service';
import UserPreferencesService from '../../services/user-preferences-service';

const container = createContainer({
  injectionMode: InjectionMode.PROXY,
});

container.register({
  databaseService: asClass(MongoDbDatabaseService).singleton(),
  userPreferencesModel: asValue(UserPreferencesModel),
  userPreferencesRepository: asClass(UserPreferencesRepository),
  characterController: asClass(CharacterController),
  characterService: asFunction(CharacterService).scoped(),
  userPreferencesService: asFunction(UserPreferencesService).scoped(),
});

export default container;
