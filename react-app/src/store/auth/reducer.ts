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
        draft.userData = action.payload;
        draft.isAuthenticated = true;
        break;
    }
  }, initialState,
);

export default AuthReducer;
