import * as AuthActions from './constants';

export interface IAuth {
  userData?: IUserData
  isAuthenticated: boolean
}

export interface IUserData {
  id: string
  name: string
}

interface SignIn {
  type: typeof AuthActions.SIGN_IN
  payload: IUserData
}

export type AuthActionTypes = SignIn;
