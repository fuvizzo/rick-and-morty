import produce from 'immer';
import { Reducer } from 'redux';
import {
  AuthActionTypes,
  IAuth,
} from './types';
import * as AuthActions from './constants';

export const initialState: IAuth = {
  isAuthenticated: false,
};

const AuthReducer: Reducer<IAuth, AuthActionTypes> = produce(
  (
    draft: IAuth,
    action: AuthActionTypes,
  ): void => {
    switch (action.type) {
      case AuthActions.SIGN_IN:
        draft.userData = action.payload.userData;
        draft.accessToken = action.payload.accessToken;
        draft.refreshToken = action.payload.refreshToken;
        draft.isAuthenticated = true;
        break;
      case AuthActions.SIGN_OUT:
        delete draft.userData;
        delete draft.accessToken;
        delete draft.refreshToken;
        draft.isAuthenticated = false;
        break;
    }
  }, initialState,
);

export default AuthReducer;
