import produce from 'immer';
import { Reducer } from 'redux';
import atob from 'atob';
import {
  AuthActionTypes,
  IUser,
} from './types';
import * as AuthActions from './constants';

export const initialState: IUser = {
  auth: {
    isAuthenticated: false,
  },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseAccessTokenPayload = (accessToken: string): any => {
  const segs: string[] = accessToken!.split('.');
  return JSON.parse(atob(segs[1]));
};

const AuthReducer: Reducer<IUser, AuthActionTypes> = produce(
  (
    draft: IUser,
    action: AuthActionTypes,
  ): void => {
    switch (action.type) {
      case AuthActions.SIGN_UP:
      case AuthActions.SIGN_IN: {
        const {
          userId,
          firstName,
          lastName,
          exp: tokenExpiration,
        } = parseAccessTokenPayload(action.payload.accessToken!);
        draft.auth.tokenExpiration = tokenExpiration;

        draft.userInfo = { firstName, lastName };
        draft.auth.accessToken = action.payload.accessToken;
        draft.auth.userId = userId;
        draft.auth.isAuthenticated = true;
        break;
      }
      case AuthActions.SIGN_OUT:
        delete draft.userInfo;
        delete draft.auth.accessToken;
        delete draft.auth.tokenExpiration;
        draft.auth.isAuthenticated = false;
        break;
      case AuthActions.RENEWATE_SILENTLY_ACCESS_TOKEN: {
        const { exp: tokenExpiration } = parseAccessTokenPayload(action.payload.accessToken!);
        draft.auth.tokenExpiration = tokenExpiration;
        draft.auth.accessToken = action.payload.accessToken;
        break;
      }
    }
  }, initialState,
);

export default AuthReducer;
