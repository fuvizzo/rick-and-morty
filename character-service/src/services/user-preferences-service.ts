import { bool } from 'joi';
import { IUserPreferences } from '../contracts/entities';
import { IUserPreferencesRepository } from '../contracts/repositories';
import { IUserPreferencesService } from '../contracts/services';

export default (
  {
    currentUserId,
    userPreferencesRepository,
  }:
    {
      currentUserId: string,
      userPreferencesRepository: IUserPreferencesRepository
    },
): IUserPreferencesService => ({
  toggleFavorite: async (
    characterId: number,
  ) => {
    let userPreferences = await userPreferencesRepository.get(currentUserId);
    if (userPreferences) {
      const indexId = userPreferences.favoriteCharacterIds.indexOf(characterId);
      if (indexId !== -1) {
        userPreferences.favoriteCharacterIds.splice(indexId, 1);
      } else {
        userPreferences.favoriteCharacterIds.push(characterId);
      }
    } else {
      userPreferences = {
        userId: currentUserId,
        favoriteCharacterIds: [characterId],
      };
    }
    await userPreferencesRepository.update(userPreferences);
  },
});
