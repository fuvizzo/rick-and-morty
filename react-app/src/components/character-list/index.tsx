import * as React from 'react';
import { connect, ConnectedProps } from 'react-redux';

// import User from './user-record';
import * as characterListActions from '../../store/characters/thunk';
import * as uiActions from '../../store/ui/actions';
import { ICharacterData } from '../../store/characters/types';
import { RootState } from '../../store';

const connector = connect(
  (state: RootState) => ({
    ...state.characterList,
    ...state.ui.search,
  }),
  {
    ...characterListActions,
    ...uiActions,
  },
);

type PropsFromRedux = ConnectedProps<typeof connector>

export const UserListComponent: React.FC<PropsFromRedux> = (props) => {
  const {
    getCharacters,
    getFilteredCharacters,
    triggerCharacterSearch,
    toggleFavorite,
    results: characters,
    info,
    query,
  } = props;

  React.useEffect(() => {
    getCharacters();
    // return () => clearTimeout(timeoutRef.current);
  }, []);

  const showMoreHandler = React.useCallback((nextPageUrl: string) => {
    getCharacters(nextPageUrl);
  }, []);

  return <>
    {Object.keys(characters).map((characterId: string) => {
      const data: ICharacterData = characters[characterId];

      return (
        <div key={characterId}>
          {characterId}
          {data.name}
        </div>
      );
    })}
    <button
        data-testid="more-btn"
        onClick={() => showMoreHandler(info.next)}
      >
      Show more
      </button>
  </>;
};

export default connector(UserListComponent);
