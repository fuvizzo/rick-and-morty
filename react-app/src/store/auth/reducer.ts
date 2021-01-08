import produce from 'immer';
import { Reducer } from 'redux';
import {
  AuthActionTypes,
  IAuth,
} from './types';
import * as AuthActions from './constants';

export const initialState: IAuth = {
  id: '',
  name: '',
};

const AuthReducer: Reducer<IAuth, AuthActionTypes> = produce(
  (
    draft: IAuth,
    action: AuthActionTypes,
  ): void => {
    switch (action.type) {
      case AuthActions.LOGIN:
        draft.id = action.payload.id;
        draft.name = action.payload.name;
        break;
    }
  }, initialState,
);

export default AuthReducer;
