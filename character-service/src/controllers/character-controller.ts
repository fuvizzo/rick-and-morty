import {
  Request,
  Response,
  NextFunction,
} from 'express';
import Debug from 'debug';

import { AwilixContainer } from 'awilix';
import { ICharacterService, IUserPreferencesService } from '../contracts/services';
import ICharacterController from '../contracts/controllers';
import AppError from '../error/app-error';

const debug = Debug('user-controller');

class CharacterController implements ICharacterController {
  getScopedContainer = (req: Request) => {
    const { cradle } = <AwilixContainer>req.scope;
    return cradle;
  }

  getCharacters = async (req: Request, res: Response, next: NextFunction) => {
    const { page } = req.query;
    let characters;
    if (typeof page !== 'undefined') {
      characters = await this.getScopedContainer(req).characterService.getSet(<string>page);
    } else {
      characters = await this.getScopedContainer(req).characterService.getSet();
    }

    res.json(characters);
    res.status(200);
  };

  toggleFavorite = async (req: Request, res: Response, next: NextFunction) => {
    const {
      characterId,
    } = req.body;
    const character = await this.getScopedContainer(req).characterService.getOne(characterId);
    if (character) {
      await this.getScopedContainer(req).userPreferencesService.toggleFavorite(characterId);

      res.status(204);
      res.end();
    } else {
      next(new AppError('Resource not found', 404));
    }
  }
}

export default CharacterController;
