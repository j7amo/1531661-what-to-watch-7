import { ActionType } from './action.js';
import { AuthorizationStatus } from '../const.js';

const initialState = {
  status: AuthorizationStatus.UNKNOWN,
};

const authReducer = (state = initialState, action) => {
  switch(action.type) {
    case ActionType.SET_AUTHORIZATION_STATUS:
      return {
        ...state,
        status: action.payload,
      };
    default:
      return state;
  }
};

export { authReducer };
