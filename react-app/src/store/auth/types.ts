import * as AuthActions from './constants';

export interface IAuth {
  isAuthenticated: boolean
  tokenExpiration?: number
  accessToken?: string
  userId?: string
}

export interface IUserData {
  firstName: string
  lastName: string
}

export interface IUser {
  auth: IAuth
  userInfo?: IUserData
}

export interface IUserSignInData {
  email: string
  password: string
}

export interface IUserSignUpData extends IUserSignInData, IUserData { }

interface SignIn {
  type: typeof AuthActions.SIGN_IN
  payload: IAuth
}

interface SignUp {
  type: typeof AuthActions.SIGN_UP
  payload: IAuth
}

interface RenewateSilentlyAcccessToken {
  type: typeof AuthActions.RENEWATE_SILENTLY_ACCESS_TOKEN
  payload: IAuth
}

interface SignOut {
  type: typeof AuthActions.SIGN_OUT
}

export type AuthActionTypes = SignIn
  | SignOut
  | SignUp
  | RenewateSilentlyAcccessToken;
