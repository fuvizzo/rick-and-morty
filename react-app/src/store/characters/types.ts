import { Patch } from 'immer';
import * as CharacterActions from './constants';

export interface ICharacterData {
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

export interface ICharacter {
  id: string
  data: ICharacterData
}

export type ICharacterHash = { [id: string]: ICharacterData };

export interface ICharacterList {
  results: ICharacterHash
  info: IInfo
}

interface GetCharacters {
  type: typeof CharacterActions.GET_CHARACTERS
  payload: ICharacterList
}

interface GetFilterdCharacters {
  type: typeof CharacterActions.GET_FILTERED_CHARACTERS
  payload: ICharacterHash
}

interface ToggleFavorite {
  type: typeof CharacterActions.TOGGLE_FAVORITE
  payload: {
    characterId: string
  }
}

export interface ApplyPatchesActionType {
  type: typeof CharacterActions.APPLY_PATCHES
  payload: Patch[]
}

export type CharacterListActionTypes = GetCharacters
  | ToggleFavorite
  | GetFilterdCharacters
