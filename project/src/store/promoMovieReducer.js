import { ActionType } from './action.js';
import { RequestResult, RequestStatus } from '../const.js';
import { adaptMovieDataToClient } from './api-actions.js';

const initialState = {
  requestStatus: RequestStatus.IDLE,
  requestResult: null,
  promoMovie: {},
  error: null,
};

const promoMovieReducer = (state = initialState, action) => {
  switch(action.type) {
    case ActionType.BEGIN_PROMO_MOVIE_DATA_FETCH:
      return {
        ...state,
        requestStatus: RequestStatus.LOADING,
      };
    case ActionType.SET_PROMO_MOVIE_DATA:
      return {
        ...state,
        requestStatus: RequestStatus.IDLE,
        requestResult: RequestResult.SUCCEEDED,
        promoMovie: action.payload,
      };
    case ActionType.SET_PROMO_MOVIE_ERROR:
      return {
        ...state,
        requestStatus: RequestStatus.IDLE,
        requestResult: RequestResult.FAILED,
        error: action.payload,
      };
    default:
      return state;
  }
};

export { promoMovieReducer };
