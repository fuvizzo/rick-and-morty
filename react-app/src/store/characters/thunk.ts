import axios, { AxiosResponse } from 'axios';
import * as CharacterListActions from './actions';
import { AppThunk } from '..';
import { ICharacterHash, ICharacterList } from './types';
import buildRequestAndDispatchAction from '../helpers';

const SERVICE_URL: string = '/character-service-api';

const getCharacters = (page?: number): AppThunk => async (dispatch, getState) => {
  buildRequestAndDispatchAction(async () => {
    const {
      user: {
        auth: {
          accessToken,
        },
      },

    } = getState();
    const response: AxiosResponse = await axios.get(page
      ? `${SERVICE_URL}/characters?page=${page}`
      : `${SERVICE_URL}/characters`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const characterList: ICharacterList = response.data;
    dispatch(CharacterListActions.getCharacters(characterList));
  }, dispatch);
};

const toggleFavorite = (characterId: number)
  : AppThunk => async (dispatch, getState) => {
  buildRequestAndDispatchAction(async () => {
    const {
      user: {
        auth: {
          userId,
          accessToken,
        },
      },
    } = getState();

    await axios.put(`${SERVICE_URL}/characters/favorites/${userId}`, { characterId },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    dispatch(CharacterListActions.toggleFavorite(characterId));
  }, dispatch);
};

const getFilteredCharacters = (): AppThunk => async (dispatch, getState) => {
  buildRequestAndDispatchAction(async () => {
    const { query } = getState().ui.search;
    const results: AxiosResponse = await axios.get(`${SERVICE_URL}/characters?q=${query}`);
    const characters: ICharacterHash = results.data;
    dispatch(CharacterListActions.getFilteredCharacters(characters));
  }, dispatch, true);
};

export {
  getCharacters,
  getFilteredCharacters,
  toggleFavorite,
};
