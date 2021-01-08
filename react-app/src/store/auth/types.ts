import * as AuthActions from './constants';

export interface IAuth {
  id: string
  name: string
}

interface GetData {
  type: typeof AuthActions.GET_DATA
  payload: IAuth
}

export type AuthActionTypes = GetData;
