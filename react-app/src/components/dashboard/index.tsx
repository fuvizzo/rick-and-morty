import React from 'react';
import { connect, ConnectedProps } from 'react-redux';

import CharacterList from '../character-list';

import * as currentUserActions from '../../store/auth/thunk';
import { RootState } from '../../store';

const connector = connect(
  (state: RootState) => ({
    loading: state.ui.loading,
    auth: state.auth,
  }),
  currentUserActions,
);

type PropsFromRedux = ConnectedProps<typeof connector>

const Dashboard: React.FC<PropsFromRedux> = (props) => {
  const { loading, auth } = props;

  return (
    <div>
      {auth.userData && (`Welcome ${auth.userData.name}`)}
      <CharacterList />
    </div>
  );
};

export default connector(Dashboard);
