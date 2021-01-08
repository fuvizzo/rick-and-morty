import React from 'react';
import {
  Link,
  Router,
  useParams,
} from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import './App.css';

import CharacterList from './components/character-list';

import * as currentUserActions from './store/auth/thunk';
import { RootState } from './store';

const connector = connect(
  (state: RootState) => ({
    loading: state.ui.loading,
    auth: state.auth,
  }),
  currentUserActions,
);

type PropsFromRedux = ConnectedProps<typeof connector>

const App: React.FC<PropsFromRedux> = (props) => {
  const { loading, auth } = props;

  return (
    <div className="App">

        {auth.name !== '' && (`Welcome ${auth.name}`)}
        <CharacterList />
    </div>
  );
};

export default connector(App);
