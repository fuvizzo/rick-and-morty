import { AuthActionTypes, IAuth } from './types';
import * as AuthActions from './constants';

const signIn = (authData: IAuth): AuthActionTypes => ({
  type: AuthActions.SIGN_IN,
  payload: authData,
});

const signUp = (authData: IAuth): AuthActionTypes => ({
  type: AuthActions.SIGN_IN,
  payload: authData,
});

const signOut = (): AuthActionTypes => ({
  type: AuthActions.SIGN_OUT,
});

const renewateSilentlyAcccessToken = (authData: IAuth): AuthActionTypes => ({
  type: AuthActions.RENEWATE_SILENTLY_ACCESS_TOKEN,
  payload: authData,
});

export {
  signIn,
  signOut,
  renewateSilentlyAcccessToken,
};
