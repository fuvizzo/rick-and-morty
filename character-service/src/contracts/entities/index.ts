export interface ICharacter {
  id: number
  name: string
  status: string
  species: string
  type: string
  gender: string
  image: string
  episode: string[]
  url: string
  created: string
  /* origin
  location */
  favorite: boolean
}

export interface IInfo {
  count: number
  pages: number
  next: string
  prev?: string
}

export type ICharacterHash = { [id: number]: ICharacter };

export interface ICharacterList {
  results: ICharacterHash
  info: IInfo
}

export interface IUserPreferences {
  userId: string
  favoriteCharacterIds: number[]
}

export interface IAuthToken {
  userId: string
}
