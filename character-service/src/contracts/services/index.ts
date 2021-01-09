import { ICharacter, ICharacterList } from '../entities';

export interface IUserPreferencesService {
  toggleFavorite: (characterId: number) => Promise<boolean>
}

export interface ICharacterService {
  getSet: (pageURL?: string) => Promise<ICharacterList>
  getOne: (characterId: number) => Promise<ICharacter | null>
}
