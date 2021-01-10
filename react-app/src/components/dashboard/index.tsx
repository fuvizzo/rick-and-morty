import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import CharacterList from '../character-list';
import * as authActions from '../../store/auth/thunk';

import { getCharacters as getCharacterList } from '../../store/characters/thunk';
import { signOut as localSignOut } from '../../store/auth/actions';
import { RootState } from '../../store';
import { Container, MainHeader, MainHeaderWrapper } from './styles';

const connector = connect(
  (state: RootState) => ({
    user: state.user,
    characterList: state.characterList,
    ui: state.ui,
  }),
  { localSignOut, getCharacterList, ...authActions },
);

type PropsFromRedux = ConnectedProps<typeof connector>;

const Dashboard: React.FC<PropsFromRedux> = (props) => {
  const {
    ui,
    user: {
      userInfo,
      auth: {
        tokenExpiration,
        isAuthenticated,
      },
    },
    characterList,
    getCharacterList,
    signOut,
    localSignOut,
    getNewAccessToken,
  } = props;

  const setIntervalRef = React.useRef<NodeJS.Timeout>();
  const [nextPageIndex, setNextPageIndex] = React.useState<number>(2);

  const signOutHandler = () => {
    clearInterval(setIntervalRef.current!);
    signOut();
  };

  React.useEffect(() => {
    if (isAuthenticated) {
      if (ui.error) {
        localSignOut();
      } else {
        setIntervalRef.current = setInterval(() => {
          getNewAccessToken(true);
        }, tokenExpiration! * 1000 - Date.now());
        getCharacterList();
      }
    }
    return () => {
      clearInterval(setIntervalRef.current!);
    };
  }, [ui.error]);

  const onScrollHandler = (event: React.UIEvent<HTMLDivElement >) => {
    const target:HTMLDivElement = event.target as HTMLDivElement;
    if (
      characterList.info.pages > nextPageIndex
        && target.scrollHeight - target.scrollTop === target.clientHeight
    ) {
      getCharacterList(nextPageIndex);
      setNextPageIndex(nextPageIndex + 1);
    }
  };

  return (
    <Container onScroll={onScrollHandler}>
      <MainHeaderWrapper>
        <MainHeader>
          Welcome {userInfo!.firstName} {userInfo!.lastName}
          <button data-testid="sign-out" onClick={signOutHandler}>
            Sign Out
          </button>
        </MainHeader>
      </MainHeaderWrapper>
      <CharacterList data={characterList} />
    </Container>
  );
};

export default connector(Dashboard);
