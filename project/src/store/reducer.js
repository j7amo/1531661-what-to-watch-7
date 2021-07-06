import { ActionType } from './action.js';
import {AuthorizationStatus} from '../const.js';
import {adaptMovieDataToClient} from './api-actions.js';

const MAX_SIMILAR_MOVIES_NUMBER = 4;

const initialState = {
  currentGenre: 'All genres',
  isLoading: false,
  movies: [],
  currentMovie: {
    starring: [],
  },
  currentSimilarMovies: [],
  currentComments: [],
  incorrectMovieIDRequested: false,
  authorizationStatus: AuthorizationStatus.UNKNOWN,
};

const reducer = (state = initialState, action) => {
  // debugger;
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
        currentMovie: {
          ...state.currentMovie,
          starring: [
            ...state.currentMovie.starring,
          ]
        },
        currentSimilarMovies: state.currentSimilarMovies.map((movie) => ({
          ...movie,
          starring: [
            ...movie.starring,
          ],
        })),
        currentComments: state.currentComments.map((comment) => ({
          ...comment,
          user: {
            ...state.user,
          },
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
        currentMovie: {
          ...state.currentMovie,
          starring: [
            ...state.currentMovie.starring,
          ]
        },
        currentSimilarMovies: state.currentSimilarMovies.map((movie) => ({
          ...movie,
          starring: [
            ...movie.starring,
          ],
        })),
        currentComments: state.currentComments.map((comment) => ({
          ...comment,
          user: {
            ...state.user,
          },
        })),
        incorrectMovieIDRequested: false,
      };
    case ActionType.SET_INCORRECT_MOVIE_ID_REQUESTED:
      return {
        ...state,
        isLoading: false,
        movies: state.movies.map((movie) => ({
          ...movie,
          starring: [
            ...movie.starring,
          ],
        })),
        currentMovie: {
          ...state.currentMovie,
          starring: [
            ...state.currentMovie.starring,
          ]
        },
        currentSimilarMovies: state.currentSimilarMovies.map((movie) => ({
          ...movie,
          starring: [
            ...movie.starring,
          ],
        })),
        currentComments: state.currentComments.map((comment) => ({
          ...comment,
          user: {
            ...state.user,
          },
        })),
        incorrectMovieIDRequested: true,
      };
    case ActionType.RESET_INCORRECT_MOVIE_ID_REQUESTED:
      return {
        ...state,
        isLoading: false,
        movies: state.movies.map((movie) => ({
          ...movie,
          starring: [
            ...movie.starring,
          ],
        })),
        currentMovie: {
          ...state.currentMovie,
          starring: [
            ...state.currentMovie.starring,
          ]
        },
        currentSimilarMovies: state.currentSimilarMovies.map((movie) => ({
          ...movie,
          starring: [
            ...movie.starring,
          ],
        })),
        currentComments: state.currentComments.map((comment) => ({
          ...comment,
          user: {
            ...state.user,
          },
        })),
        incorrectMovieIDRequested: false,
      };
    case ActionType.SET_MOVIES_DATA:
      return {
        ...state,
        isLoading: false,
        movies: action.payload,
        currentMovie: {
          ...state.currentMovie,
          starring: [
            ...state.currentMovie.starring,
          ]
        },
        currentSimilarMovies: state.currentSimilarMovies.map((movie) => ({
          ...movie,
          starring: [
            ...movie.starring,
          ],
        })),
        currentComments: state.currentComments.map((comment) => ({
          ...comment,
          user: {
            ...state.user,
          },
        })),
      };
    case ActionType.SET_MOVIE_DATA:
      return {
        ...state,
        isLoading: false,
        movies: state.movies.map((movie) => ({
          ...movie,
          starring: [
            ...movie.starring,
          ],
        })),
        currentMovie: adaptMovieDataToClient(action.payload[0]),
        currentSimilarMovies: action.payload[1].filter((localMovie) => localMovie.id !== Number(action.payload[0].id)).slice(0, MAX_SIMILAR_MOVIES_NUMBER).map((similarMovie) => adaptMovieDataToClient(similarMovie)),
        currentComments: action.payload[2],
        incorrectMovieIDRequested: false,
      };
    case ActionType.SET_AUTHORIZATION_STATUS:
      return {
        ...state,
        movies: state.movies.map((movie) => ({
          ...movie,
          starring: [
            ...movie.starring,
          ],
        })),
        currentMovie: {
          ...state.currentMovie,
          starring: [
            ...state.currentMovie.starring,
          ]
        },
        currentSimilarMovies: state.currentSimilarMovies.map((movie) => ({
          ...movie,
          starring: [
            ...movie.starring,
          ],
        })),
        currentComments: state.currentComments.map((comment) => ({
          ...comment,
          user: {
            ...state.user,
          },
        })),
        authorizationStatus: action.payload,
      };
    default:
      return state;
  }
};

export { reducer };
