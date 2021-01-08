import { UIActionTypes } from './types';
import * as UIActions from './constants';

const toggleLoadingSpinner = (): UIActionTypes => ({
  type: UIActions.TOGGLE_LOADING_SPINNER,
});

const triggerCharacterSearch = (query: string): UIActionTypes => ({
  type: UIActions.TRIGGER_CHARACTER_SEARCH,
  payload: { query },
});

const setError = (message: string): UIActionTypes => ({
  type: UIActions.SET_ERROR,
  payload: { message },
});

export {
  triggerCharacterSearch,
  toggleLoadingSpinner,
  setError,
};
