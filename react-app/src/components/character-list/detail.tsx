import * as React from 'react';
import { ICharacter } from '../../store/characters/types';

type Props = {
  character: ICharacter
  toggleFavorite: (characterId: string) => void
}

const User: React.FC<Props> = ({
  character,

  toggleFavorite,
}) => {
  const {
    id: characterId,
    data: {
      favorite,
    },
  } = character;

  const favoriteHandler = React.useCallback(() => {
    toggleFavorite(characterId);
  }, [favorite]);

  return (
    <>
      <button
        data-testid="favorite-btn"
        onClick={favoriteHandler}
      >
        {favorite ? 'favorite!' : 'Mark as favorite'}
      </button>
    </>
  );
};

export default React.memo(User);
