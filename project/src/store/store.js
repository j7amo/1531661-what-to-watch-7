import {createStore} from 'redux';
import {reducer} from './reducer.js';
import {composeWithDevTools} from 'redux-devtools-extension';

const store = createStore(
  reducer,
  composeWithDevTools(),
);

export { store };
