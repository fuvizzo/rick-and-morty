export enum RoleType {
  Admin,
  Customer
}

export interface IAccount {
  email: string
  password: string
  disabled?: boolean
  roles?: [RoleType]
}

export interface IBasicInfo {
  firstName: string
  lastName: string
}

export interface IUserAccount<T> extends IAccount, IBasicInfo {
  id?: T
}

export interface IAuthTokenBody {
  userId: string
  userName: string,
  roles: RoleType[]
}
