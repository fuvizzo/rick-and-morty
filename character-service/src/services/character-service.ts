import axios, { AxiosResponse } from 'axios';
import { ICharacterList, ICharacter, ICharacterHash } from '../contracts/entities';
import { IUserPreferencesRepository } from '../contracts/repositories';
import { ICharacterService } from '../contracts/services';

const URL: string = 'https://rickandmortyapi.com/api';

export default ({
  currentUserId,
  userPreferencesRepository,
}:
  {
    currentUserId : string
    userPreferencesRepository: IUserPreferencesRepository
  }): ICharacterService => ({
  getSet: async (
    page?: string,
  ) => {
    const response: AxiosResponse = await axios.get(
      `${URL}/character?page=${page}` || `${URL}/character`,
    );

    const userPreferences = await userPreferencesRepository.get(currentUserId);

    const results: ICharacterHash = response.data.results.reduce(
      (hash: ICharacterHash, item: ICharacter) => {
        const { id } = item;
        item.favorite = userPreferences
          ? userPreferences.favoriteCharacterIds.some((favoriteId) => id === favoriteId)
          : false;
        hash[id] = { ...item };
        return hash;
      }, {},
    );
    const characterList: ICharacterList = {
      results,
      info: response.data.info,
    };
    return characterList;
  },
  getOne: async (
    characterId: number,
  ) => {
    const response: AxiosResponse = await axios.get(`${URL}/character/${characterId}`);

    return response.data as ICharacter;
  },

});
