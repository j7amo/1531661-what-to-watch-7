import { ActionType } from './action.js';
import {AuthorizationStatus} from '../const.js';

const initialState = {
  currentGenre: 'All genres',
  isLoading: false,
  movies: [],
  authorizationStatus: AuthorizationStatus.UNKNOWN,
  // error: '',
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case ActionType.SET_CURRENT_GENRE:
      return {
        ...state,
        currentGenre: action.payload,
        movies: state.movies.map((movie) => ({
          ...movie,
          starring: [
            ...movie.starring,
          ],
        })),
      };
    case ActionType.BEGIN_MOVIES_DATA_FETCH:
      return {
        ...state,
        isLoading: true,
        movies: state.movies.map((movie) => ({
          ...movie,
          starring: [
            ...movie.starring,
          ],
        })),
      };
    case ActionType.SET_MOVIES_DATA:
      return {
        ...state,
        isLoading: false,
        movies: action.payload,
      };
    // case ActionType.SET_MOVIES_DATA_ERROR:
    //   return {
    //     ...state,
    //     isLoading: false,
    //     error: action.payload,
    //     movies: state.movies.map((movie) => ({
    //       ...movie,
    //       starring: [
    //         ...movie.starring,
    //       ],
    //     })),
    //   };
    case ActionType.SET_AUTHORIZATION_STATUS:
      return {
        ...state,
        movies: state.movies.map((movie) => ({
          ...movie,
          starring: [
            ...movie.starring,
          ],
        })),
        authorizationStatus: action.payload,
      };
    // case ActionType.SIGN_OUT:
    //   return {
    //     ...state,
    //     movies: state.movies.map((movie) => ({
    //       ...movie,
    //       starring: [
    //         ...movie.starring,
    //       ],
    //     })),
    //     authorizationStatus: AuthorizationStatus.NO_AUTH,
    //   };
    default:
      return state;
  }
};

export { reducer };
