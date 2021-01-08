/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { render, screen } from '@testing-library/react';

import { UserList } from '..';
import jsonData from '../../../../mock/db.json';
import { IUserList } from '../../../store/users/types';
import * as crudUserActions from '../../../store/users/thunk';
import { uiActions } from '../../../store/users/actions';

const { users } = jsonData;
const mock :IUserList = {
  loading: false,
  users,
  search: { query: '' },
  sort: {
    column: 'username',
    direction: 'ascending',
  },
};

const props = { userList: mock, ...{ ...crudUserActions, ...uiActions } };

const UserListComponent = (
  <UserList {...props} />
);

describe('UserList', () => {
  it('shoud render properly', () => {
    render(UserListComponent);
  });

  it('shoud render a Table component', () => {
    render(UserListComponent);
    const table = screen.queryByTestId('table');
    expect(table).toBeTruthy();
  });
});
