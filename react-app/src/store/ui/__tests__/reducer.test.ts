import reducer, { initialState } from '../reducer';
import * as UserActions from '../constants';

import { UIActionTypes } from '../types';

describe('UI reducer', () => {
  describe('should handle TOGGLE_LOADING_SPINNER', () => {
    it('toggles the loading spinner on true state', () => {
      const action: UIActionTypes = {
        type: UserActions.TOGGLE_LOADING_SPINNER,
      };

      expect(
        reducer(initialState, action).loading,
      ).toEqual(true);
    });

    it('doesn\'t modifiy the orginal state', () => {
      expect(
        initialState.loading,
      ).toEqual(false);
    });
  });

  describe('should handle SET_ERROR', () => {
    it('set the error', () => {
      const action: UIActionTypes = {
        type: UserActions.SET_ERROR,
        payload: {
          message: 'Something went wrong',
        },
      };

      expect(
        reducer(initialState, action).error,
      ).toEqual(action.payload.message);
    });

    it('doesn\'t modifiy the orginal state', () => {
      expect(
        initialState.error,
      ).toEqual(null);
    });
  });
});
