import reducer, { initialState } from '../reducer';
import * as CharacterActions from '../constants';
import {
  CharacterListActionTypes, ICharacterList,
} from '../types';
import mock from '../../../mocks/character-list';

const mockedCharacterList: ICharacterList = mock;

describe('CharacterList reducer', () => {
  describe('should handle GET_CHARACTERS', () => {
    it('retrieves the character list', () => {
      const action: CharacterListActionTypes = {
        type: CharacterActions.GET_CHARACTERS,
        payload: mockedCharacterList,
      };
      expect(
        reducer(initialState, action),
      ).toEqual(mockedCharacterList);
    });

    it('doesn\'t modifiy the orginal state', () => {
      expect(
        Object.keys(initialState.results).length,
      ).toEqual(0);
    });
  });

  describe('should handle TOGGLE_FAVORITE', () => {
    const characterList: ICharacterList = {
      info: mockedCharacterList.info,
      results: { 1: mockedCharacterList.results['1'] },
    };

    it('toggles character ID = 1 as favorite', () => {
      const action: CharacterListActionTypes = {
        type: CharacterActions.TOGGLE_FAVORITE,
        payload: {
          characterId: 1,
        },
      };
      const state = reducer(characterList, action);
      expect(state.results['1'].favorite).toEqual(true);
    });

    it('doesn\'t modifiy the orginal state', () => {
      expect(characterList.results['1'].favorite).toEqual(false);
    });
  });
});
