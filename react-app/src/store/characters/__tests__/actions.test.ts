import configureMockStore from 'redux-mock-store';
import moxios from 'moxios';
import thunk, { ThunkDispatch } from 'redux-thunk';
import UserActions from '../actions';
import { initialState } from '../reducer';
import {
  GET_USERS,
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER,
} from '../constants';
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from '../thunk';
import { IUser, IUserList, UserListActionTypes } from '../types';
import jsonData from '../../../../mock/db.json';

import { RootState } from '../..';

type DispatchExts = ThunkDispatch<RootState, undefined, UserListActionTypes>;

const middlewares = [thunk];
const mockStore = configureMockStore<RootState, DispatchExts>(middlewares);
const userList: IUserList = {
  ...initialState,
  users: jsonData.users,
};

const store = mockStore();
const baseUrl: string = 'http://localhost:3004';
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

describe('User list actions', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  it('should create an action to get user list', () => {
    moxios.stubRequest(`${baseUrl}/users`, {
      status: 200,
      response: {
        data: userList.users,
      },
    });

    const expectedAction: UserListActionTypes = {
      type: GET_USERS,
      payload: userList.users,
    };

    return store.dispatch<any>(getUsers()).then(() => {
      expect(UserActions.getUsers(userList.users)).toEqual(expectedAction);
    });
  });

  it('should create an action to add a new user', () => {
    moxios.stubRequest(`${baseUrl}/users`, {
      status: 200,
      response: {
        data: {
          fakeUser,
        },
      },
    });

    const expectedAction: UserListActionTypes = {
      type: CREATE_USER,
      payload: fakeUser,
    };

    return store.dispatch<any>(createUser(fakeUser)).then(() => {
      expect(UserActions.createUser(fakeUser)).toEqual(expectedAction);
    });
  });

  it('should create an action to edit an user', () => {
    moxios.stubRequest(`${baseUrl}/users/123`, {
      status: 200,
      response: {},
    });

    const expectedAction: UserListActionTypes = {
      type: UPDATE_USER,
      payload: fakeUser,
    };

    return store.dispatch<any>(updateUser(fakeUser)).then(() => {
      expect(UserActions.updateUser(fakeUser)).toEqual(expectedAction);
    });
  });

  it('should create an action to delete an user', () => {
    moxios.stubRequest(`${baseUrl}/users/123`, {
      status: 200,
      response: {},
    });

    const expectedAction: UserListActionTypes = {
      type: DELETE_USER,
      payload: { userId: fakeUser.id },
    };

    return store.dispatch<any>(deleteUser(fakeUser.id)).then(() => {
      expect(UserActions.deleteUser(fakeUser.id)).toEqual(expectedAction);
    });
  });
});
