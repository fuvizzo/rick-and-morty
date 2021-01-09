import { ICharacter, IUserPreferences } from '../entities';

export interface IRepository { }

export interface IUserPreferencesRepository extends IRepository {
  update: (userPreferences: IUserPreferences) => Promise<void>
  get: (userId: string) => Promise<IUserPreferences | null>
}
