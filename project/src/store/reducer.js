import { combineReducers } from 'redux';
import { filtersReducer } from './filtersReducer';
import { moviesReducer } from './moviesReducer';
import { currentMovieReducer } from './currentMovieReducer';
import { authReducer } from './authReducer';

const rootReducer = combineReducers({
  filters: filtersReducer,
  movies: moviesReducer,
  currentMovie: currentMovieReducer,
  authorizationStatus: authReducer,
});

export { rootReducer };
