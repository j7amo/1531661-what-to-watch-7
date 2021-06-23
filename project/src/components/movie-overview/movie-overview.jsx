import React from 'react';
import { MovieRating } from '../../const.js';
import PropTypes from 'prop-types';
import movieProp from '../film/film.prop';

function getMovieRatingLevel(movie) {
  const rating = movie.rating;
  switch (rating) {
    case rating >= 0 && rating < 3:
      return MovieRating.BAD;
    case rating >= 3 && rating < 5:
      return MovieRating.NORMAL;
    case rating >= 5 && rating < 8:
      return MovieRating.GOOD;
    case rating >= 8 && rating < 10:
      return MovieRating.VERY_GOOD;
    case rating === 10:
      return MovieRating.AWESOME;
  }
}

function MovieOverview({movie}) {
  const {
    rating,
    scoresCount,
    description,
    director,
    starring,
  } = movie;

  return (
    <>
      <div className="film-rating">
        <div className="film-rating__score">{rating}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">{getMovieRatingLevel(movie)}</span>
          <span className="film-rating__count">{scoresCount} {scoresCount > 1 ? 'ratings' : 'rating'}</span>
        </p>
      </div>

      <div className="film-card__text">
        <p>{description}</p>

        <p className="film-card__director"><strong>Director: {director}</strong></p>

        <p className="film-card__starring">
          <strong>
            Starring: {starring.join(', ')} and other
          </strong>
        </p>
      </div>
    </>
  );
}

MovieOverview.propTypes = {
  movie: PropTypes.oneOfType([movieProp]).isRequired,
};

export default MovieOverview;
