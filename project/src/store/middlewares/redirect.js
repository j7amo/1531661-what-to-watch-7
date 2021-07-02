import {ActionType} from '../action.js';
import browserHistory from '../../browser-history.js';

export const redirect = (_store) => (next) => (action) => {
  if (action.type === ActionType.REDIRECT_TO_ROUTE) {
    browserHistory.push(action.payload);
  }

  next(action);
};
