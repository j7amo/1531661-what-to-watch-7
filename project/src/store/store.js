import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from './reducer.js';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { createApi } from '../services/api.js';
import { AuthorizationStatus } from '../const.js';
import { setAuthorizationStatus } from './action';
import { redirect } from './middlewares/redirect.js';

const api = createApi(() => store.dispatch(setAuthorizationStatus(AuthorizationStatus.NO_AUTH)));

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk.withExtraArgument(api), redirect)),
);

export { store };
