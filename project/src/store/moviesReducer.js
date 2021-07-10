import { ActionType } from './action.js';
import {RequestResult, RequestStatus} from '../const.js';

const initialState = {
  requestStatus: RequestStatus.IDLE,
  requestResult: null,
  movies: [],
  error: null,
};

const moviesReducer = (state = initialState, action) => {
  switch(action.type) {
    case ActionType.BEGIN_MOVIES_DATA_FETCH:
      return {
        ...state,
        requestStatus: RequestStatus.LOADING,
      };
    case ActionType.SET_MOVIES_DATA:
      return {
        ...state,
        requestStatus: RequestStatus.IDLE,
        requestResult: RequestResult.SUCCEEDED,
        movies: action.payload,
      };
    case ActionType.SET_MOVIES_ERROR:
      return {
        ...state,
        requestStatus: RequestStatus.IDLE,
        requestResult: RequestResult.FAILED,
        error: action.payload,
      }
    default:
      return state;
  }
};

export { moviesReducer };
