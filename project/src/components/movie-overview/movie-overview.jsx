import React from 'react';
import {MovieRating, MovieRatingLimits} from '../../const.js';
import PropTypes from 'prop-types';
import movieProp from '../film/film.prop';

function getMovieRatingLevel(movie) {
  const rating = movie.rating;

  if (rating >= MovieRatingLimits.BAD_LOWER_LIMIT && rating < MovieRatingLimits.BAD_UPPER_LIMIT) {
    return MovieRating.BAD;
  } else if (rating >= MovieRatingLimits.NORMAL_LOWER_LIMIT && rating < MovieRatingLimits.NORMAL_UPPER_LIMIT) {
    return MovieRating.NORMAL;
  } else if (rating >= MovieRatingLimits.GOOD_LOWER_LIMIT && rating < MovieRatingLimits.GOOD_UPPER_LIMIT) {
    return MovieRating.GOOD;
  } else if (rating >= MovieRatingLimits.VERY_GOOD_LOWER_LIMIT && rating < MovieRatingLimits.VERY_GOOD_UPPER_LIMIT) {
    return MovieRating.VERY_GOOD;
  } else if (rating === MovieRatingLimits.AWESOME_LOWER_LIMIT) {
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
  movie: PropTypes.oneOfType([movieProp]),
};

export default MovieOverview;
