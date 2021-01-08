import * as UIActions from './constants';

interface ToggleLoadingSpinner {
  type: typeof UIActions.TOGGLE_LOADING_SPINNER
}

interface TriggerUserSearch {
  type: typeof UIActions.TRIGGER_CHARACTER_SEARCH
  payload: {
    query: string
  }
}

interface SetError {
  type: typeof UIActions.SET_ERROR
  payload: {
    message: string
  }
}

export interface ISearch {
  query: string
}

export interface IUI {
  loading: boolean
  search: ISearch
  error: String | null
}

export type UIActionTypes = TriggerUserSearch
  | ToggleLoadingSpinner
  | SetError;
