import configureMockStore from 'redux-mock-store';
import moxios from 'moxios';
import thunk, { ThunkDispatch } from 'redux-thunk';
import axios, { AxiosError } from 'axios';

import UIActions from '../actions';
import {
  SET_ERROR,
} from '../constants';

import {
  getUsers,

} from '../../users/thunk';

import { UIActionTypes } from '../types';

import { RootState } from '../..';

type DispatchExts = ThunkDispatch<RootState, undefined, any>;

const middlewares = [thunk];
const mockStore = configureMockStore<RootState, DispatchExts>(middlewares);

const store = mockStore();

describe('UI actions', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  it('should create an action to set a UI error on a 404 response', () => {
    const url = 'http://localhost:3004/users';
    moxios.stubRequest(url, {
      status: 404,
    });

    const expectedAction:UIActionTypes = {
      type: SET_ERROR,
      payload: {
        message: 'Request failed with status code 404',
      },
    };

    return store.dispatch<any>(getUsers()).then(async () => {
      let error:any = {};
      try {
        await axios.get(url);
      } catch (err) {
        error = err;
      }
      expect(UIActions.setError(error.message)).toEqual(expectedAction);
    });
  });
});
