import reducer, { initialState } from '../reducer';
import * as UserActions from '../constants';
import jsonData from '../../../../mock/db.json';

import { ICurrentUser, CurrentUserActionTypes } from '../types';

const fakeUser: ICurrentUser = {
  name: 'Foo foo',
  id: 'c9c2fe64-3de6-4825-b2c2-5d374e48ec67',
};

describe('CurrentUser reducer', () => {
  describe('should handle GET_DATA', () => {
    it('retrieves the current user data', () => {
      const action: CurrentUserActionTypes = {
        type: UserActions.GET_DATA,
        payload: fakeUser,
      };

      expect(
        reducer(initialState, action),
      ).toEqual(fakeUser);
    });

    it('doesn\'t modifiy the orginal state', () => {
      expect(
        initialState.id,
      ).toEqual(0);
    });
  });
});
