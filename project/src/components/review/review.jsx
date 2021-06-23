import React from 'react';
import PropTypes from 'prop-types';
import reviewProp from '../film/review.prop.js';

function Review({review}) {
  const {
    comment,
    rating,
    user : {
      name,
    },
    date,
  } = review;
  return (
    <div className="review">
      <blockquote className="review__quote">
        <p className="review__text">{comment}</p>
        <footer className="review__details">
          <cite className="review__author">{name}</cite>
          <time className="review__date" dateTime={date}>{date}</time>
        </footer>
      </blockquote>

      <div className="review__rating">{rating}</div>
    </div>
  );
}

Review.propTypes = {
  review: PropTypes.oneOfType([reviewProp]).isRequired,
};

export default Review;
