import { ActionType } from './action.js';
import { movies } from '../mocks/films.js';

const MOVIE_RENDER_STEP = 8;

const initialState = {
  currentGenre: 'All genres',
  movies: movies,
  renderedMoviesLimit: MOVIE_RENDER_STEP,
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
    case ActionType.SET_MOVIES:
      return {
        ...state,
        movies: action.payload.movies,
      };
    case ActionType.ADD_RENDERED_MOVIES_LIMIT:
      return {
        ...state,
        movies: state.movies.map((movie) => ({
          ...movie,
          starring: [
            ...movie.starring,
          ],
        })),
        renderedMoviesLimit: state.renderedMoviesLimit + MOVIE_RENDER_STEP,
      };
    case ActionType.RESET_RENDERED_MOVIES_LIMIT:
      return {
        ...state,
        movies: state.movies.map((movie) => ({
          ...movie,
          starring: [
            ...movie.starring,
          ],
        })),
        renderedMoviesLimit: MOVIE_RENDER_STEP,
      };
    default:
      return state;
  }
};

export { reducer };
