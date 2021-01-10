import { Patch } from 'immer';
import {
  ICharacterHash, CharacterListActionTypes, ApplyPatchesActionType, ICharacterList,
} from './types';
import * as UserActions from './constants';

const getCharacters = (results: ICharacterList): CharacterListActionTypes => ({
  type: UserActions.GET_CHARACTERS,
  payload: results,
});

const getFilteredCharacters = (results: ICharacterHash): CharacterListActionTypes => ({
  type: UserActions.GET_FILTERED_CHARACTERS,
  payload: results,
});

const toggleFavorite = (characterId: number): CharacterListActionTypes => ({
  type: UserActions.TOGGLE_FAVORITE,
  payload: { characterId },
});

export const applyPatches = (patches:Patch[]): ApplyPatchesActionType => ({
  type: UserActions.APPLY_PATCHES,
  payload: patches,
});

export {
  getCharacters,
  getFilteredCharacters,
  toggleFavorite,
};
