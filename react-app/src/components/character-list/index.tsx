import * as React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import * as characterListActions from '../../store/characters/thunk';
import * as uiActions from '../../store/ui/actions';
import { ICharacterData, ICharacterList } from '../../store/characters/types';
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
  CardFooter,
  CardContentWrapper,
} from './styles';
import { Button } from '../common-styles';

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

interface Props extends PropsFromRedux {
  data: ICharacterList;
}

const ListComponent: React.FC<Props> = (props) => {
  const {
    data: { results },
    toggleFavorite,
  } = props;

  const toggleFavoriteHandler = (characterId: number): void => {
    toggleFavorite(characterId);
  };

  return (
    <>
      <GridContainer>
        {Object.keys(results).map((key: string) => {
          const data: ICharacterData = results[key];
          const characterId: number = Number(key);
          return (
            <CardWrapper key={characterId}>
              <Card>
                <CardImage url={data.image} />
                <CardContentWrapper>
                  <CardArticle>
                    <CardHeader> {data.name}</CardHeader>
                    <CardParagraph>
                      Gender: <CardSpan>{data.gender}</CardSpan>
                    </CardParagraph>
                    <CardParagraph>
                      Species: <CardSpan>{data.species}</CardSpan>
                    </CardParagraph>
                    <CardParagraph>
                      Status: <CardSpan>{data.status}</CardSpan>
                    </CardParagraph>
                  </CardArticle>
                  <CardFooter>
                    <Button
                      onClick={() => toggleFavoriteHandler(characterId)}
                      width="130px"
                      height="30px"
                    >
                      {data.favorite
                        ? 'One of my favorite!'
                        : 'Click to mark as Favorite'}
                    </Button>
                  </CardFooter>
                </CardContentWrapper>
              </Card>
            </CardWrapper>
          );
        })}
      </GridContainer>
    </>
  );
};

export default connector(ListComponent);
