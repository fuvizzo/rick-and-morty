import * as React from 'react';
import { connect, ConnectedProps } from 'react-redux';

// import User from './user-record';
import * as characterListActions from '../../store/characters/thunk';
import * as uiActions from '../../store/ui/actions';
import { ICharacterData } from '../../store/characters/types';
import { RootState } from '../../store';
import {
  GridContainer, Card,
} from './styles';

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
  }, []);

  const showMoreHandler = React.useCallback((page: number) => {
    getCharacters(page);
  }, []);

  return <GridContainer>
    {Object.keys(characters).map((characterId: string) => {
      const data: ICharacterData = characters[characterId];

      return (
        <Card key={characterId}>
          {characterId}
          {data.name}
          {data.favorite && 'Is Favorite'}
        </Card>
      );
    })}
    <button
        data-testid="more-btn"
        onClick={() => showMoreHandler(1)}
      >
      Show more
      </button>
  </GridContainer>;
};

export default connector(UserListComponent);
