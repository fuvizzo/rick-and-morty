/* eslint-disable import/prefer-default-export */
import axios, { AxiosResponse } from 'axios';
import * as AuthActions from './actions';
import buildRequestAndDispatchAction from '../helpers';

import { AppThunk } from '..';
import { IAuth } from './types';

const URL: string = process.env.REACT_APP_AUTH_SERVICE_URL as string;

export const login = (userName: string, password:string): AppThunk => async (dispatch) => {
  buildRequestAndDispatchAction(async () => {
    // todo build login request
    const results: AxiosResponse = await axios.post(URL);
    const user: IAuth = results.data;
    dispatch(AuthActions.login(user));
  }, dispatch);
};
