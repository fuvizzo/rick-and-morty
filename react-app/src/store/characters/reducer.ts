import {
  Patch,
  produce,
  produceWithPatches,
  enablePatches,
  applyPatches,
} from 'immer';

import { Reducer } from 'redux';

import {
  ICharacterList,
  ApplyPatchesActionType,
  CharacterListActionTypes,
} from './types';
import * as CharacterActions from './constants';

export const initialState: ICharacterList = {
  results: {},
  info: {
    count: 0,
    pages: 0,
    next: '',
  },

};

enablePatches();

const recipe = (draft: ICharacterList, action: CharacterListActionTypes): void => {
  switch (action.type) {
    case CharacterActions.GET_CHARACTERS:

      draft.results = { ...draft.results, ...action.payload.results };
      draft.info = action.payload.info;
      break;

    case CharacterActions.GET_FILTERED_CHARACTERS:
      draft.results = action.payload;
      break;

    case CharacterActions.TOGGLE_FAVORITE: {
      const character = draft.results[action.payload.characterId];
      if (character) {
        character.favorite = !character.favorite;
      }
      break;
    }
  }
};

export const UserListReducer: Reducer<ICharacterList, CharacterListActionTypes> = produce(
  recipe,
  initialState,
);

const PatchesUserListReducer: Reducer<ICharacterList, CharacterListActionTypes | ApplyPatchesActionType> = (
  state: ICharacterList = initialState,
  action: CharacterListActionTypes | ApplyPatchesActionType,
) => {
  if (action.type === CharacterActions.APPLY_PATCHES) {
    return applyPatches(state, action.payload);
  }
  const [newState, patches]: [ICharacterList, Patch[], Patch[]] = (
    produceWithPatches(recipe,
      initialState)
  )(state, action);

  return newState;
};

export default PatchesUserListReducer;
