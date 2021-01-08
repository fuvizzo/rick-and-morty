/* eslint-disable import/prefer-default-export */
import axios, { AxiosResponse } from 'axios';
import * as AuthActions from './actions';
import buildRequestAndDispatchAction from '../helpers';

import { AppThunk } from '..';
import { IUserData } from './types';

const URL: string = process.env.REACT_APP_AUTH_SERVICE_URL as string;

export const signInWithEmailAndPassword = (userName: string, password:string): AppThunk => async (dispatch) => {
  buildRequestAndDispatchAction(async () => {
    // todo build login request
    // const results: AxiosResponse = await axios.post(URL);
    // const user: IUserData = results.data;
    const user: IUserData = {
      id: '123',
      name: 'Foo',
    };
    dispatch(AuthActions.signIn(user));
  }, dispatch);
};
