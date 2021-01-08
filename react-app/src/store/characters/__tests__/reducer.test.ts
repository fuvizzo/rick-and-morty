import reducer, { initialState } from '../reducer';
import * as UserActions from '../constants';
import jsonData from '../../../../mock/db.json';
import { IUser, IUserList, UserListActionTypes } from '../types';

const currentUserId = '123';
const fakeUser: IUser = {
  id: 'd0634484-6c21-4680-9d78-47d46d68e91f',
  data: {
    username: 'xyz',
    name: 'Foo foo',
    email: 'foo@foo.foo',
    age: 30,
    enabled: false,
  },
};

describe('UserList reducer', () => {
  describe('should handle GET_USERS', () => {
    const userList: IUserList = {
      ...initialState,
      users: jsonData.users,
    };
    it('retrieves the user list', () => {
      const action: UserListActionTypes = {
        type: UserActions.GET_USERS,
        payload: jsonData.users,
      };
      expect(
        reducer(initialState, action),
      ).toEqual(userList);
    });

    it('doesn\'t modifiy the orginal state', () => {
      expect(
        Object.keys(initialState.users).length,
      ).toEqual(0);
    });
  });

  describe('should handle CREATE_USER', () => {
    const userList: IUserList = {
      ...initialState,
      users: {
        [fakeUser.id]: fakeUser.data,
      },
    };

    it('creates a new user', () => {
      const action: UserListActionTypes = {
        type: UserActions.CREATE_USER,
        payload: fakeUser,
      };
      expect(
        reducer(initialState, action),
      ).toEqual(userList);
    });
  });

  describe('should handle DELETE_USER', () => {
    const action: UserListActionTypes = {
      type: UserActions.DELETE_USER,
      payload: { userId: fakeUser.id },
    };

    it('deletes an existing user', () => {
      expect(
        reducer(initialState, action),
      ).toEqual(initialState);
    });
  });

  describe('should handle UPDATE_USER', () => {
    const userList: IUserList = {
      ...initialState,
      users: {
        [fakeUser.id]: fakeUser.data,
      },
    };

    it('updates an existing user', () => {
      const action: UserListActionTypes = {
        type: UserActions.UPDATE_USER,
        payload: {
          id: fakeUser.id,
          data: {
            username: 'xyz_boo',
            name: 'Foo Boo',
            email: 'boo@foo.foo',
            age: 30,
            enabled: false,
          },
        },
      };
      const state = reducer(userList, action);
      expect(state.users[fakeUser.id].name).toEqual('Foo Boo');
    });
  });

  describe('should handle TOGGLE_SUPERVISED_BY', () => {
    it('toggles supervisedBy to some supervisor user ID', () => {
      const userList: IUserList = {
        ...initialState,
        users: {
          [fakeUser.id]: fakeUser.data,
        },
      };
      const action: UserListActionTypes = {
        type: UserActions.TOGGLE_SUPERVISED_BY,
        payload: {
          currentUserId,
          userId: fakeUser.id,
        },
      };
      const state = reducer(userList, action);
      expect(state.users[fakeUser.id].supervisedBy).toEqual(currentUserId);
    });

    it('toggles supervisedBy to undefined if supervisor user ID is the same as supervisedBy value', () => {
      const userList: IUserList = {
        ...initialState,
        users: {
          [fakeUser.id]: {
            ...fakeUser.data,
            supervisedBy: currentUserId,
          },
        },
      };
      const action: UserListActionTypes = {
        type: UserActions.TOGGLE_SUPERVISED_BY,
        payload: {
          currentUserId,
          userId: fakeUser.id,
        },
      };
      const state = reducer(userList, action);
      expect(state.users[fakeUser.id].supervisedBy).toEqual(undefined);
    });
  });
});
