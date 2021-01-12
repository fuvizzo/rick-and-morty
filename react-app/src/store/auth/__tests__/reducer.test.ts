import reducer, { initialState } from '../reducer';
import * as AuthActions from '../constants';
import { AuthActionTypes, IUser } from '../types';
import mock from '../../../mocks/auth-data';

const user : IUser = mock;

describe('Auth reducer', () => {
  describe('should handle SIGN_IN', () => {
    it('signs in an User', () => {
      const action: AuthActionTypes = {
        type: AuthActions.SIGN_IN,
        payload: user.auth,
      };
      expect(
        reducer(initialState, action),
      ).toEqual(user);
    });

    it('doesn\'t modifiy the orginal state', () => {
      expect(
        initialState.auth.isAuthenticated,
      ).toEqual(false);
      expect(
        initialState.userInfo,
      ).toEqual(undefined);
    });
  });

  describe('should handle SIGN_UP', () => {
    it('signs in an User', () => {
      const action: AuthActionTypes = {
        type: AuthActions.SIGN_UP,
        payload: user.auth,
      };
      expect(
        reducer(initialState, action),
      ).toEqual(user);
    });

    it('doesn\'t modifiy the orginal state', () => {
      expect(
        initialState.auth.isAuthenticated,
      ).toEqual(false);
      expect(
        initialState.userInfo,
      ).toEqual(undefined);
    });
  });
});
