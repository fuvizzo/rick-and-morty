import { AuthActionTypes, IAuth } from './types';
import * as AuthActions from './constants';

const signIn = (authData: IAuth): AuthActionTypes => ({
  type: AuthActions.SIGN_IN,
  payload: authData,
});

const signOut = (): AuthActionTypes => ({
  type: AuthActions.SIGN_OUT,
});

export {
  signIn,
  signOut,
};
