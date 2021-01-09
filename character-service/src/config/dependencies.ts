import {
  createContainer,
  InjectionMode,
  asFunction,
  asClass,
  asValue,
} from 'awilix';
import DatabaseService from '../frameworks/persistence/mongo-db/database-service';
import CharacterController from '../controllers/character-controller';
import UserPreferencesModel from '../frameworks/persistence/mongo-db/models/user-preferences';
import UserPreferencesRepository from '../frameworks/persistence/mongo-db/repositories/user-preferences';
import CharacterService from '../services/character-service';
import UserPreferencesService from '../services/user-preferences-service';

const container = createContainer({
  injectionMode: InjectionMode.PROXY,
});

container.register({
  databaseService: asClass(DatabaseService).singleton(),
  userPreferencesModel: asValue(UserPreferencesModel),
  userPreferencesRepository: asClass(UserPreferencesRepository),
  characterController: asClass(CharacterController),
  characterService: asFunction(CharacterService).scoped(),
  userPreferencesService: asFunction(UserPreferencesService).scoped(),
});

export default container;
