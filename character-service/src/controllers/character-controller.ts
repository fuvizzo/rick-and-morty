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
    const { pageURL } = req.query;
    let characters;
    if (typeof pageURL !== 'undefined') {
      characters = await this.getScopedContainer(req).characterService.getSet(<string>pageURL);
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
      const succesful = await this.getScopedContainer(req).userPreferencesService.toggleFavorite(characterId);
      if (succesful) {
        res.status(204);
        res.end();
      } else {
        next(new AppError('Resource not found', 404));
      }
    } else {
      next(new AppError('Resource not found', 404));
    }
  }
}

export default CharacterController;
