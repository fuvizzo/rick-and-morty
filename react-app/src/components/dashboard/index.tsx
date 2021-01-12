import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import CharacterList from '../character-list';
import * as authActions from '../../store/auth/thunk';

import { getCharacters as getCharacterList } from '../../store/characters/thunk';
import { signOut as localSignOut } from '../../store/auth/actions';
import { RootState } from '../../store';
import { DashboardContainer, MainHeader, MainHeaderWrapper } from './styles';

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
      auth: { tokenExpiration, isAuthenticated },
    },
    characterList,
    getCharacterList,
    signOut,
    localSignOut,
    getNewAccessToken,
  } = props;

  const setIntervalRef = React.useRef<ReturnType<typeof setTimeout>>();
  const [nextPageIndex, setNextPageIndex] = React.useState<number>(2);
  const [viewPortHeight, setViewPortHeight] = React.useState<number>(
    window.innerHeight,
  );

  const handleResize = () => {
    setViewPortHeight(window.innerHeight);
  };

  const signOutHandler = (): void => {
    clearInterval(setIntervalRef.current!);
    window.removeEventListener('resize', handleResize);
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
      window.addEventListener('resize', handleResize);
    }
    return () => {
      clearInterval(setIntervalRef.current!);
      window.removeEventListener('resize', handleResize);
    };
  }, [ui.error]);

  const onScrollHandler = (event: React.UIEvent<HTMLDivElement>): void => {
    const target: HTMLDivElement = event.target as HTMLDivElement;
    if (
      characterList.info.pages > nextPageIndex
      && target.scrollHeight - target.scrollTop === target.clientHeight
    ) {
      getCharacterList(nextPageIndex);
      setNextPageIndex(nextPageIndex + 1);
    }
  };

  return (
    <DashboardContainer
      height={`${viewPortHeight}px`}
      onScroll={onScrollHandler}
    >
      <MainHeaderWrapper>
        <MainHeader>
          Welcome... {userInfo!.firstName} {userInfo!.lastName}!
          <button data-testid="sign-out" onClick={signOutHandler}>
            Sign Out
          </button>
        </MainHeader>
      </MainHeaderWrapper>
      <CharacterList data={characterList} />
    </DashboardContainer>
  );
};

export default connector(Dashboard);
