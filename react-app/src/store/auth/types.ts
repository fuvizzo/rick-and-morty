import * as AuthActions from './constants';

export interface IAuth {
  isAuthenticated: boolean
  tokenExpiration?: number
  accessToken?: string
}

export interface IUserData {
  firstName: string
  lastName: string
}

export interface IUser {
  auth: IAuth
  userInfo?: IUserData
}

interface SignIn {
  type: typeof AuthActions.SIGN_IN
  payload: IAuth
}

interface SignOut {
  type: typeof AuthActions.SIGN_OUT
}

export type AuthActionTypes = SignIn | SignOut;
