/* eslint-disable import/prefer-default-export */
import axios, { AxiosResponse } from 'axios';
import * as AuthActions from './actions';
import buildRequestAndDispatchAction from '../helpers';

import { AppThunk } from '..';
import { IAuth, IUserSignInData, IUserSignUpData } from './types';

const SERVICE_URL: string = '/auth-service-api';

const signInWithEmailAndPassword = (signInData:IUserSignInData): AppThunk => async (dispatch) => {
  buildRequestAndDispatchAction(async () => {
    const results: AxiosResponse = await axios.post(`${SERVICE_URL}/sign-in`, signInData);
    const authData: IAuth = results.data;
    dispatch(AuthActions.signIn(authData));
  }, dispatch);
};

const signUp = (signUpData:IUserSignUpData): AppThunk => async (dispatch) => {
  buildRequestAndDispatchAction(async () => {
    const results: AxiosResponse = await axios.post(`${SERVICE_URL}/sign-up`, signUpData);
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
    const authData: IAuth = results.data;

    dispatch(renewateSilently
      ? AuthActions.renewateSilentlyAcccessToken(authData)
      : AuthActions.signIn(authData));
  }, dispatch, true, false);
};

export {
  signInWithEmailAndPassword,
  signOut,
  signUp,
  getNewAccessToken,
};
