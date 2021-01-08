import {
  createStore, applyMiddleware, compose, combineReducers, Action,
} from 'redux';

import thunk, { ThunkAction } from 'redux-thunk';

import CharacterListReducer from './characters/reducer';
import AuthReducer from './auth/reducer';
import UIReducer from './ui/reducer';

declare global {
   interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
// eslint-disable-next-line no-underscore-dangle
const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  characterList: CharacterListReducer,
  auth: AuthReducer,
  ui: UIReducer,
});

const Store = createStore(
  rootReducer,
  // Note: the following line is just used to enable Redux Dev Tools
  storeEnhancers(applyMiddleware(thunk)),
);

export type RootState = ReturnType<typeof rootReducer>

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

export default Store;
