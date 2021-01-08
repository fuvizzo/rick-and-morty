/* eslint-disable import/prefer-default-export */
import axios, { AxiosResponse } from 'axios';
import * as AuthActions from './actions';
import buildRequestAndDispatchAction from '../helpers';

import { AppThunk } from '..';
import { IAuth, IUserData } from './types';

const AUTH_SERVICE_URL: string = '/auth-service-api';

const signInWithEmailAndPassword = (email: string, password:string): AppThunk => async (dispatch) => {
  buildRequestAndDispatchAction(async () => {
    const results: AxiosResponse = await axios.post(`${AUTH_SERVICE_URL}/sign-in`, {
      email,
      password,
    });
    console.log(results.data);
    const authData: IAuth = {
      userData: {
        id: '123',
        name: 'Foo Boo',
      },
      accessToken: 'foo',
      refreshToken: 'boo',
      isAuthenticated: false,

    };
    dispatch(AuthActions.signIn(authData));
  }, dispatch);
};

const signOut = (): AppThunk => async (dispatch, getState) => {
  buildRequestAndDispatchAction(async () => {
    const {
      auth: {
        refreshToken,
      },

    } = getState();

    // todo build sign-out request
    // const results: AxiosResponse = await axios.post(URL);
    // const user: IUserData = results.data;

    dispatch(AuthActions.signOut());
  }, dispatch);
};

export {
  signInWithEmailAndPassword,
  signOut,
};
