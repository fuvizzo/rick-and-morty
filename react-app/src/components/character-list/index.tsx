import * as React from 'react';
import { connect, ConnectedProps } from 'react-redux';

// import User from './user-record';
import * as characterListActions from '../../store/characters/thunk';
import * as uiActions from '../../store/ui/actions';
import { ICharacterData } from '../../store/characters/types';
import { RootState } from '../../store';
import {
  GridContainer,
  Card,
  CardWrapper,
  CardHeader,
  CardParagraph,
  CardArticle,
  CardSpan,
  CardImage,
} from './styles';

const connector = connect(
  (state: RootState) => ({
    ...state.characterList,
    ...state.ui.search,
    accessToken: state.user.auth.accessToken,
  }),
  {
    ...characterListActions,
    ...uiActions,
  },
);

type PropsFromRedux = ConnectedProps<typeof connector>;

export const UserListComponent: React.FC<PropsFromRedux> = (props) => {
  const {
    getCharacters,
    getFilteredCharacters,
    triggerCharacterSearch,
    toggleFavorite,
    results: characters,
    accessToken,
    info,
    query,
  } = props;

  React.useEffect(() => {
    getCharacters();
  }, []);

  const showMoreHandler = React.useCallback((page: number) => {
    getCharacters(page);
  }, [accessToken]);

  return (
    <GridContainer>
      {Object.keys(characters).map((characterId: string) => {
        const data: ICharacterData = characters[characterId];
        return (
          <CardWrapper key={characterId}>
            <Card>
             <CardImage url={data.image}/>
              <CardArticle>
                <CardHeader> {data.name}</CardHeader>
                <CardParagraph>
                  <CardSpan>
                    {characterId}
                    {data.favorite && 'Is Favorite'}
                  </CardSpan>
                </CardParagraph>
              </CardArticle>
            </Card>
          </CardWrapper>
        );
      })}
      <button data-testid="more-btn" onClick={() => showMoreHandler(2)}>
        Show more
      </button>
    </GridContainer>
  );
};

export default connector(UserListComponent);
