/* eslint-disable @typescript-eslint/no-explicit-any */
import configureMockStore from 'redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import thunk, { ThunkDispatch } from 'redux-thunk';
import axios from 'axios';
import { SET_ERROR } from '../constants';

import { getCharacters } from '../../characters/thunk';

import { UIActionTypes } from '../types';

import { RootState } from '../..';

type DispatchExts = ThunkDispatch<RootState, undefined, UIActionTypes>;

const middlewares = [thunk];
const mockStore = configureMockStore<RootState, DispatchExts>(middlewares);

const mockAdapter = new MockAdapter(axios);

const store = mockStore();

const characterAPIbaseUrl: string = '/character-service-api/characters';

store.getState().user = {
  auth: {
    userId: 'foo',
    accessToken: 'boo',
    isAuthenticated: true,
  },
};
describe('UI actions', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('should create an action to set a UI error on a 404 response', () => {
    mockAdapter.onGet(characterAPIbaseUrl).reply(404);

    const expectedAction: UIActionTypes = {
      type: SET_ERROR,
      payload: {
        message: 'Request failed with status code 404',
      },
    };

    return store.dispatch<any>(getCharacters()).then(() => {
      expect(store.getActions()[1]).toEqual(expectedAction);
    });
  });
});
