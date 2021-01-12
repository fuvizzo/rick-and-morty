/* eslint-disable @typescript-eslint/no-explicit-any */
import configureMockStore from 'redux-mock-store';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import thunk, { ThunkDispatch } from 'redux-thunk';
import * as AUTH_ACTIONS from '../constants';
import {
  signInWithEmailAndPassword,
  signUp,
} from '../thunk';

import { RootState } from '../..';

import mock from '../../../mocks/auth-data';
import { AuthActionTypes, IUser } from '../types';

const user : IUser = mock;

type DispatchExts = ThunkDispatch<RootState, undefined, AuthActionTypes>;

const middlewares = [thunk];
const mockStore = configureMockStore<RootState, DispatchExts>(middlewares);

const mockAdapter = new MockAdapter(axios);
const store = mockStore();

const baseUrl: string = '/auth-service-api';

describe('Auth actions', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('should create an action to sign in an User', () => {
    mockAdapter.onPost(`${baseUrl}/sign-in`).reply(200, {
      accessToken: user.auth.accessToken,
    });

    const expectedAction: AuthActionTypes = {
      type: AUTH_ACTIONS.SIGN_IN,
      payload: user.auth,
    };

    return store.dispatch<any>(signInWithEmailAndPassword({
      email: 'foo',
      password: 'boo',
    })).then((callback: () => void) => {
      callback = () => expect(store.getActions()[1]).toEqual(expectedAction);
    });
  });

  it('should create an action to sign up an User', () => {
    mockAdapter.onPost(`${baseUrl}/sign-up`).reply(201, {
      accessToken: user.auth.accessToken,
    });

    const expectedAction: AuthActionTypes = {
      type: AUTH_ACTIONS.SIGN_UP,
      payload: user.auth,
    };

    return store.dispatch<any>(signUp({
      email: 'foo@boo.com',
      password: 'boo',
      firstName: 'Foo',
      lastName: 'Boo',
    })).then((callback: () => void) => {
      callback = () => expect(store.getActions()[1]).toEqual(expectedAction);
    });
  });
});
