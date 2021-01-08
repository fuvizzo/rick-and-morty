/* eslint-disable import/prefer-default-export */
import { IUserData, AuthActionTypes } from './types';
import * as AuthActions from './constants';

export const signIn = (userData: IUserData): AuthActionTypes => ({
  type: AuthActions.SIGN_IN,
  payload: userData,
});
