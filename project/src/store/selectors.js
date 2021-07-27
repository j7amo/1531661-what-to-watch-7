import { createSelector } from 'reselect';

import { ALL_GENRES, GENRES_LIMIT } from '../const';
const MAX_SIMILAR_MOVIES_NUMBER = 4;

export const getCurrentGenre = (state) => state.filters.currentGenre;

export const getPromoMovieRequestResult = (state) => state.promoMovie.requestResult;

export const getPromoMovieID = (state) => state.promoMovie.promoMovie.id;

export const getPromoMovieName = (state) => state.promoMovie.promoMovie.name;

export const getPromoMovieGenre = (state) => state.promoMovie.promoMovie.genre;

export const getPromoMovieReleasedDate = (state) => state.promoMovie.promoMovie.released;

export const getPromoMovieBackgroundImage = (state) => state.promoMovie.promoMovie.backgroundImage;

export const getPromoMoviePosterImage = (state) => state.promoMovie.promoMovie.posterImage;

export const getMovies = (state) => state.movies.movies;

export const getMoviesRequestStatus = (state) => state.movies.requestStatus;

export const getMoviesByGenre = createSelector(
  [getMovies, getCurrentGenre],
  (movies, currentGenre) => movies.filter((movie) => currentGenre === ALL_GENRES || movie.genre === currentGenre),
);

export const getUniqueGenres = createSelector(
  [getMovies],
  (movies) => [ALL_GENRES, ...Array.from(new Set(movies.map((movie) => movie.genre))).slice(0, GENRES_LIMIT)],
);

export const getMovieByID = (state, id) => state.movies.movies.find((movie) => movie.id === id);

export const getCurrentMovie = (state) => state.currentMovie.currentMovie;

export const getCurrentMovieID = (state) => state.currentMovie.currentMovie.id;

export const getCurrentMovieRequestStatus = (state) => state.currentMovie.currentMovieRequestStatus;

export const getCurrentMovieRequestResult = (state) => state.currentMovie.currentMovieRequestResult;

export const getCurrentMovieCommentPostError = (state) => state.currentMovie.commentPostError;

export const getCurrentSimilarMoviesUnfiltered = (state) => state.currentMovie.currentSimilarMovies;

export const getCurrentSimilarMovies = createSelector(
  [getCurrentSimilarMoviesUnfiltered, getCurrentMovieID],
  (similarMovies, currentMovieID) => similarMovies
    .filter((similarMovie) => similarMovie.id !== currentMovieID)
    .slice(0, MAX_SIMILAR_MOVIES_NUMBER),
);

export const getCurrentComments = (state) => state.currentMovie.currentComments;

export const getCommentPostRequestStatus = (state) => state.currentMovie.commentPostRequestStatus;

export const getAuthorizationStatus = (state) => state.authorizationStatus.status;

export const getFavoriteMovies = (state) => state.favoriteMovies.favoriteMovies;

export const getFavoriteMoviesRequestResult = (state) => state.favoriteMovies.requestResult;

export const getIsFavoriteMovie = (state, id) => {
  if (state.favoriteMovies.favoriteMovies.find((movie) => movie.id === id)) {
    return true;
  }

  return false;
};
