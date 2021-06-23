import React from 'react';
import PropTypes from 'prop-types';
import reviewProp from '../film/review.prop.js';
import {getFixedLengthArrayOfRandomElements, getRandomInt} from '../../utils';
import Review from '../review/review.jsx';

function MovieReviews({reviews}) {
  const currentReviews = getFixedLengthArrayOfRandomElements(reviews, getRandomInt(0, reviews.length));
  const currentReviewsLeft = currentReviews.slice(0, Math.round(currentReviews.length / 2));
  const currentReviewsRight = currentReviews.slice(currentReviews.length - Math.round(currentReviews.length / 2) + 1);

  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {currentReviewsLeft.map((currentReview) => <Review key={currentReview.id} review={currentReview} />)}
      </div>
      <div className="film-card__reviews-col">
        {currentReviewsRight.map((currentReview) => <Review key={currentReview.id} review={currentReview} />)}
      </div>
    </div>
  );
}

MovieReviews.propTypes = {
  reviews: PropTypes.arrayOf(
    PropTypes.oneOfType(
      [reviewProp],
    )).isRequired,
};

export default MovieReviews;
