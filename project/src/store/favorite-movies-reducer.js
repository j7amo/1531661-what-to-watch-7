import { ActionType } from './action.js';
import {RequestResult, RequestStatus} from '../const.js';

const initialState = {
  requestStatus: RequestStatus.IDLE,
  requestResult: null,
  favoriteMovies: [],
  error: null,
  favoriteMovieRequestStatus: RequestStatus.IDLE,
  favoriteMovieRequestResult: null,
  favoriteMovieError: null,
};

const favoriteMoviesReducer = (state = initialState, action) => {
  switch(action.type) {
    case ActionType.BEGIN_FAVORITE_MOVIES_DATA_FETCH:
      return {
        ...state,
        requestStatus: RequestStatus.LOADING,
      };
    case ActionType.SET_FAVORITE_MOVIES_DATA:
      return {
        ...state,
        requestStatus: RequestStatus.IDLE,
        requestResult: RequestResult.SUCCEEDED,
        favoriteMovies: action.payload,
      };
    case ActionType.SET_FAVORITE_MOVIES_ERROR:
      return {
        ...state,
        requestStatus: RequestStatus.IDLE,
        requestResult: RequestResult.FAILED,
        error: action.payload,
      };
    case ActionType.BEGIN_FAVORITE_MOVIE_STATUS_POST:
      return {
        ...state,
        favoriteMovieRequestStatus: RequestStatus.LOADING,
      };
    case ActionType.SET_FAVORITE_MOVIE_STATUS_POST_DATA:
      if (action.payload.isFavorite) {
        return {
          ...state,
          favoriteMovieRequestStatus: RequestStatus.IDLE,
          favoriteMovieRequestResult: RequestResult.SUCCEEDED,
          favoriteMovies: [
            ...state.favoriteMovies,
            action.payload,
          ],
        };
      } else {
        return {
          ...state,
          favoriteMovieRequestStatus: RequestStatus.IDLE,
          favoriteMovieRequestResult: RequestResult.SUCCEEDED,
          favoriteMovies: state.favoriteMovies.filter((favoriteMovie) => favoriteMovie.id !== action.payload.id),
        };
      }
    case ActionType.SET_FAVORITE_MOVIE_STATUS_POST_ERROR:
      return {
        ...state,
        favoriteMovieRequestStatus: RequestStatus.IDLE,
        favoriteMovieRequestResult: RequestResult.FAILED,
        favoriteMovieError: action.payload,
      };
    default:
      return state;
  }
};

export { favoriteMoviesReducer };
