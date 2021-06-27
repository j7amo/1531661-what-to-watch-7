import { ActionType } from './action.js';
import { movies } from '../mocks/films.js';

const initialState = {
  currentGenre: 'All genres',
  movies: movies,
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
    default:
      return state;
  }
};

export { reducer };
