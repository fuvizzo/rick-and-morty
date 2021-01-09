import React from 'react';
import { connect, ConnectedProps } from 'react-redux';

import CharacterList from '../character-list';

import * as authActions from '../../store/auth/thunk';
import { RootState } from '../../store';

const connector = connect(
  (state: RootState) => ({
    loading: state.ui.loading,
    user: state.user,
  }),
  authActions,
);

type PropsFromRedux = ConnectedProps<typeof connector>

const Dashboard: React.FC<PropsFromRedux> = (props) => {
  const { loading, user, signOut } = props;
  const signOutHandler = () => {
    signOut();
  };

  return (
    <div>
      Welcome {user.userInfo!.firstName} {user.userInfo!.lastName}
      <button
        data-testid="more-btn"
        onClick={signOutHandler}
      >
        Sign Out
      </button>
      <CharacterList />
    </div>
  );
};

export default connector(Dashboard);
