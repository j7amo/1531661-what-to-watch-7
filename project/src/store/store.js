import {createStore, applyMiddleware} from 'redux';
import {reducer} from './reducer.js';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {createApi} from '../services/api.js';
// import {requireAuthorization} from './action.js';
// import {AuthorizationStatus} from '../const';

// const api = createApi(() => store.dispatch(requireAuthorization(AuthorizationStatus.NO_AUTH)));
const api = createApi(() => {});

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk.withExtraArgument(api))),
);

export { store };
