import { createSelector } from 'reselect';

import {ALL_GENRES} from "../const";

export const getCurrentGenre = (state) => state.filters.currentGenre;

export const getPromoMovieID = (state) => state.promoMovie.promoMovie.id;

export const getPromoMovieName = (state) => state.promoMovie.promoMovie.name;

export const getPromoMovieGenre = (state) => state.promoMovie.promoMovie.genre;

export const getPromoMovieReleasedDate = (state) => state.promoMovie.promoMovie.released;

export const getPromoMovieBackgroundImage = (state) => state.promoMovie.promoMovie.backgroundImage;

export const getPromoMoviePosterImage = (state) => state.promoMovie.promoMovie.posterImage;

export const getMovies = (state) => state.movies.movies;

export const getMoviesByGenre = createSelector(
  [getMovies, getCurrentGenre],
  (movies, currentGenre) => movies.filter((movie) => currentGenre === ALL_GENRES || movie.genre === currentGenre)
);

export const getUniqueGenres = createSelector(
  [getMovies],
  (movies) => [ALL_GENRES, ...Array.from(new Set(movies.map((movie) => movie.genre)))]
);
