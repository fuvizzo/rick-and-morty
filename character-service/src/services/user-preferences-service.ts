import { bool } from 'joi';
import { IUserPreferences } from '../contracts/entities';
import { IUserPreferencesRepository } from '../contracts/repositories';
import { IUserPreferencesService } from '../contracts/services';

export default (
  {
    // currentUserId,
    userPreferencesRepository,
  }:
    {
      // currentUserId: string,
      userPreferencesRepository: IUserPreferencesRepository
    },
): IUserPreferencesService => ({
  toggleFavorite: async (
    characterId: number,
  ) => {
    const userPreferences = await userPreferencesRepository.get('currentUserId');
    if (userPreferences) {
      const newPreferences = { ...userPreferences };
      const indexId = userPreferences.favoriteCharacterIds.indexOf(characterId);
      if (indexId !== -1) {
        newPreferences.favoriteCharacterIds.splice(indexId, 1);
      } else {
        newPreferences.favoriteCharacterIds.push(characterId);
      }
      await userPreferencesRepository.update(newPreferences);
      return true;
    }
    return false;
  },
});
