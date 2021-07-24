import { combineReducers } from 'redux';
import { filtersReducer } from './filters-reducer';
import { moviesReducer } from './movies-reducer';
import { currentMovieReducer } from './current-movie-reducer';
import { authReducer } from './auth-reducer';
import { promoMovieReducer } from './promo-movie-reducer';
import { favoriteMoviesReducer } from './favorite-movies-reducer';

const rootReducer = combineReducers({
  filters: filtersReducer,
  movies: moviesReducer,
  favoriteMovies: favoriteMoviesReducer,
  promoMovie: promoMovieReducer,
  currentMovie: currentMovieReducer,
  authorizationStatus: authReducer,
});

export { rootReducer };
