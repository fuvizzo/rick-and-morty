/* eslint-disable @typescript-eslint/no-explicit-any */
import configureMockStore from 'redux-mock-store';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import thunk, { ThunkDispatch } from 'redux-thunk';
import * as CharacterActions from '../constants';
import {
  getCharacters,
  toggleFavorite,
} from '../thunk';

import { RootState } from '../..';

import mock from './mock-data';
import { CharacterListActionTypes, ICharacterList } from '../types';

const mockedCharacterList: ICharacterList = mock;

type DispatchExts = ThunkDispatch<RootState, undefined, CharacterListActionTypes>;

const middlewares = [thunk];
const mockStore = configureMockStore<RootState, DispatchExts>(middlewares);

const mockAdapter = new MockAdapter(axios);

const store = mockStore();

store.getState().user = {
  auth: {
    userId: 'foo',
    accessToken: 'boo',
    isAuthenticated: true,
  },
};
const baseUrl: string = '/character-service-api/characters';

describe('Character list actions', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('should create an action to get character list', () => {
    mockAdapter.onGet(baseUrl).reply(200, mockedCharacterList);

    const expectedAction: CharacterListActionTypes = {
      type: CharacterActions.GET_CHARACTERS,
      payload: mockedCharacterList,
    };

    return store.dispatch<any>(getCharacters()).then(() => {
      expect(store.getActions()[1]).toEqual(expectedAction);
    });
  });

  it('should create an action to toggle to favorite the character with ID = 1', () => {
    mockAdapter.onPut(`${baseUrl}/favorites/foo`, { characterId: 1 }).reply(204);

    const expectedAction: CharacterListActionTypes = {
      type: CharacterActions.TOGGLE_FAVORITE,
      payload: {
        characterId: 1,
      },
    };

    return store.dispatch<any>(toggleFavorite(1)).then(() => {
      expect(store.getActions()[1]).toEqual(expectedAction);
    });
  });
});
