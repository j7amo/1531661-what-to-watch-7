import { combineReducers } from 'redux';
import { filtersReducer } from './filtersReducer';
import { moviesReducer } from './moviesReducer';
import { currentMovieReducer } from './currentMovieReducer';
import { authReducer } from './authReducer';
import { promoMovieReducer } from './promoMovieReducer';

const rootReducer = combineReducers({
  filters: filtersReducer,
  movies: moviesReducer,
  promoMovie: promoMovieReducer,
  currentMovie: currentMovieReducer,
  authorizationStatus: authReducer,
});

export { rootReducer };
