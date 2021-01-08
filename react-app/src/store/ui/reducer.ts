
import produce from 'immer';
import { Reducer } from 'redux';
import {
  UIActionTypes,
  IUI,
} from './types';
import * as UIActions from './constants';

export const initialState: IUI = {
  loading: false,
  search: {
    query: '',
  },
  error: null,
};

const UIReducer: Reducer<IUI, UIActionTypes> = produce(
  (
    draft: IUI,
    action: UIActionTypes,
  ): void => {
    switch (action.type) {
      case UIActions.TOGGLE_LOADING_SPINNER:
        draft.loading = !draft.loading;
        break;
      case UIActions.TRIGGER_CHARACTER_SEARCH:
        draft.loading = true;
        draft.search = { query: action.payload.query };
        break;
      case UIActions.SET_ERROR:
        draft.error = action.payload.message;
        break;
    }
  }, initialState,
);

export default UIReducer;
