import * as AuthActions from './constants';

export interface IAuth {
  userData?: IUserData
  isAuthenticated: boolean
  refreshToken?: string
  accessToken?: string
}

export interface IUserData {
  id: string
  name: string
}

interface SignIn {
  type: typeof AuthActions.SIGN_IN
  payload: IAuth
}

interface SignOut {
  type: typeof AuthActions.SIGN_OUT
}

export type AuthActionTypes = SignIn | SignOut;
