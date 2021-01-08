import axios, { AxiosResponse } from 'axios';
import * as CharacterListActions from './actions';
import { AppThunk } from '..';
import { ICharacterHash, ICharacterList } from './types';
import buildRequestAndDispatchAction from '../helpers';

const URL: string = 'https://rickandmortyapi.com/api';

const getCharacters = (url?: string): AppThunk => async (dispatch) => {
  buildRequestAndDispatchAction(async () => {
    const response: AxiosResponse = await axios.get(url || `${URL}/character`);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const results: ICharacterHash = response.data.results.reduce((hash:ICharacterHash, item: any) => {
      const { id } = item;
      delete item.id;

      hash[id] = { ...item };
      return hash;
    }, {});
    const characterList: ICharacterList = {
      results,
      info: response.data.info,
    };
    dispatch(CharacterListActions.getCharacters(characterList));
  }, dispatch);
};

const toggleFavorite = (characterId: string)
  : AppThunk => async (dispatch, getState) => {
  buildRequestAndDispatchAction(async () => {
    const {
      characterList: {
        results,
      },

    } = getState();
    const character = { ...results[characterId] };
    if (character) {
      character.favorite = !character.favorite;
    }

    await axios.patch(`${URL}/characters`, character);
    dispatch(CharacterListActions.toggleFavorite(characterId));
  }, dispatch);
};

const getFilteredCharacters = (): AppThunk => async (dispatch, getState) => {
  buildRequestAndDispatchAction(async () => {
    const { query } = getState().ui.search;
    const results: AxiosResponse = await axios.get(`${URL}/characters?q=${query}`);
    const characters: ICharacterHash = results.data;
    dispatch(CharacterListActions.getFilteredCharacters(characters));
  }, dispatch, true);
};

export {
  getCharacters,
  getFilteredCharacters,
  toggleFavorite,
};
