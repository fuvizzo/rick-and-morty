import {
  Request, Response, NextFunction,
} from 'express';

 interface ICharacterController {
  getCharacters: (req: Request, res: Response, next: NextFunction) => Promise<void>
  toggleFavorite: (req: Request, res: Response, next: NextFunction) => Promise<void>
}

export default ICharacterController;
