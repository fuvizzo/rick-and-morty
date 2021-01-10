/* eslint-disable @typescript-eslint/no-explicit-any */
import configureMockStore from 'redux-mock-store';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import thunk, { ThunkDispatch } from 'redux-thunk';
import * as CharacterActions from '../actions';
import { initialState } from '../reducer';
import {
  GET_CHARACTERS,
  TOGGLE_FAVORITE,
} from '../constants';
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

const store = mockStore();
store.getState().user = {
  auth: {
    accessToken: 'foo',
    isAuthenticated: true,
  },
};
const mockAdapter = new MockAdapter(axios);
const baseUrl: string = '/character-service-api/characters';

describe('Character list actions', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('should create an action to get character list', () => {
    mockAdapter.onGet(baseUrl).reply(200, {
      response: {
        data: mockedCharacterList,
      },
    });

    const expectedAction: CharacterListActionTypes = {
      type: GET_CHARACTERS,
      payload: mockedCharacterList,
    };

    return store.dispatch<any>(getCharacters()).then((callback: () => void) => {
      callback = () => expect(store.getActions()).toEqual([expectedAction]);
    });
  });

  it('should create an action to toggle to favorite the character with ID = 1', () => {
    mockAdapter.onGet(`${baseUrl}/characters/favorites/1`).reply(204);

    const expectedAction: CharacterListActionTypes = {
      type: TOGGLE_FAVORITE,
      payload: {
        characterId: 1,
      },
    };

    return store.dispatch<any>(getCharacters()).then((callback: () => void) => {
      callback = () => expect(store.getActions()).toEqual([expectedAction]);
    });
  });
});
