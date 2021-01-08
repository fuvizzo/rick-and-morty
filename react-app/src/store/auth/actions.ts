/* eslint-disable import/prefer-default-export */
import { IAuth, AuthActionTypes } from './types';
import * as AuthActions from './constants';

export const login = (user: IAuth): AuthActionTypes => ({
  type: AuthActions.LOGIN,
  payload: user,
});
