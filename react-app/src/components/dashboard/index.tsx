import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Redirect } from 'react-router-dom';
import CharacterList from '../character-list';
import * as authActions from '../../store/auth/thunk';
import { signOut as localSignOut } from '../../store/auth/actions';
import { RootState } from '../../store';
import { MainHeader, MainHeaderWrapper } from './styles';

const connector = connect(
  (state: RootState) => ({
    user: state.user,
    auth: state.user.auth,
    ui: state.ui,
  }),
  { localSignOut, ...authActions },
);

type PropsFromRedux = ConnectedProps<typeof connector>;

const Dashboard: React.FC<PropsFromRedux> = (props) => {
  const {
    auth, ui, user, signOut, localSignOut, getNewAccessToken,
  } = props;

  const setIntervalRef = React.useRef<NodeJS.Timeout>();

  React.useEffect(() => {
    if (ui.error) {
      localSignOut();
    } else {
      setIntervalRef.current = setInterval(() => {
        getNewAccessToken(true);
      }, auth.tokenExpiration! * 1000 - Date.now());
    }
    return () => clearInterval(setIntervalRef.current!);
  }, [ui.error]);

  return (
    <>
      <MainHeaderWrapper>
        <MainHeader>
          {ui.error && <Redirect to="/authentication/sign-in" />}
          Welcome {user.userInfo!.firstName} {user.userInfo!.lastName}
          <button data-testid="more-btn" onClick={signOut}>
            Sign Out
          </button>
        </MainHeader>
      </MainHeaderWrapper>
      <CharacterList />
    </>
  );
};

export default connector(Dashboard);
