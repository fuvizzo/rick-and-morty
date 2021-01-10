/* eslint-disable import/prefer-default-export */
import axios, { AxiosResponse } from 'axios';
import * as AuthActions from './actions';
import buildRequestAndDispatchAction from '../helpers';

import { AppThunk } from '..';
import { IAuth } from './types';

const SERVICE_URL: string = '/auth-service-api';

const signInWithEmailAndPassword = (email: string, password:string): AppThunk => async (dispatch) => {
  buildRequestAndDispatchAction(async () => {
    const results: AxiosResponse = await axios.post(`${SERVICE_URL}/sign-in`, {
      email,
      password,
    });
    const authData: IAuth = results.data;
    dispatch(AuthActions.signIn(authData));
  }, dispatch);
};

const signOut = (): AppThunk => async (dispatch) => {
  buildRequestAndDispatchAction(async () => {
    await axios.post(`${SERVICE_URL}/sign-out`, null, {
      withCredentials: true,
    });

    dispatch(AuthActions.signOut());
  }, dispatch);
};

const getNewAccessToken = (renewateSilently = false): AppThunk => async (dispatch) => {
  buildRequestAndDispatchAction(async () => {
    const results: AxiosResponse = await axios.get(`${SERVICE_URL}/token`);
    console.log(Date.now());
    const authData: IAuth = results.data;
    dispatch(renewateSilently
      ? AuthActions.renewateSilentlyAcccessToken(authData)
      : AuthActions.signIn(authData));
  }, dispatch);
};

export {
  signInWithEmailAndPassword,
  signOut,
  getNewAccessToken,
};
