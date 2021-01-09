import * as React from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { Redirect } from 'react-router-dom';
import * as authActions from '../../store/auth/thunk';
import { RootState } from '../../store';

const connector = connect(
  (state: RootState) => ({
    user: state.user,

  }),
  authActions,
);

type PropsFromRedux = ConnectedProps<typeof connector>

export const UserListComponent: React.FC<PropsFromRedux> = (props) => {
  const {
    signInWithEmailAndPassword,
    user: {
      auth: {
        isAuthenticated,
      }
      ,
    },
  } = props;

  const signInHandler = (userName: string, password:string) => {
    signInWithEmailAndPassword(userName, password);
  };

  return <>
    { isAuthenticated && <Redirect to="/dashboard" />}
    <button
        data-testid="more-btn"
        onClick={() => signInHandler('fulvio.cusimano@hotmail.com', 'password')}
      >
    Sign In
      </button>
  </>;
};

export default connector(UserListComponent);
