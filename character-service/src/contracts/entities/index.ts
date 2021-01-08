export interface IAddress {
  street: string
  streetNumber: string
  city: string
  zipCode: string
  country: string
}

export interface IUserInfo {
  phoneNumber: string
  address: IAddress
}

export interface IUser<T> extends IUserInfo {
  id?: T
}

export enum RoleType {
  Admin,
  Customer
}

export interface IAuthToken {
  userId: string
  username: string,
  roles: RoleType[]
}
