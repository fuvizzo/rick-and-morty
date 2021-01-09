import produce from 'immer';
import { Reducer } from 'redux';
import { SymbolFormatFlags } from 'typescript';
import {
  AuthActionTypes,
  IAuth,
  IUser,
} from './types';
import * as AuthActions from './constants';

export const initialState: IUser = {
  auth: {
    isAuthenticated: false,
  },
};

const AuthReducer: Reducer<IUser, AuthActionTypes> = produce(
  (
    draft: IUser,
    action: AuthActionTypes,
  ): void => {
    switch (action.type) {
      case AuthActions.SIGN_IN: {
        const segs: string[] = action.payload.accessToken!.split('.');
        const { firstName, lastName, exp: tokenExpiration } = JSON.parse(atob(segs[1]));
        draft.auth.tokenExpiration = tokenExpiration;
        draft.userInfo = { firstName, lastName };
        draft.auth.accessToken = action.payload.accessToken;
        draft.auth.isAuthenticated = true;
        break;
      }
      case AuthActions.SIGN_OUT:
        delete draft.userInfo;
        delete draft.auth.accessToken;
        delete draft.auth.tokenExpiration;
        draft.auth.isAuthenticated = false;
        break;
    }
  }, initialState,
);

export default AuthReducer;
