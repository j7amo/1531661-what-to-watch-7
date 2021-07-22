import React from 'react';
import PropTypes from 'prop-types';
import reviewProp from '../film/review.prop.js';
import Review from '../review/review.jsx';

function MovieReviews({reviews}) {
  const currentReviewsLeft = reviews.slice(0, Math.round(reviews.length / 2));
  const currentReviewsRight = reviews.slice(Math.round(reviews.length / 2));

  return (
    <div className="film-card__reviews film-card__row" data-testid="reviews-tab-content">
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
    )),
};

export default MovieReviews;
