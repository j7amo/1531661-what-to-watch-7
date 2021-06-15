import React from 'react';
import PropTypes from 'prop-types';
import { getRandomInt } from '../../utils.js';
import RatingStar from '../rating-star/rating-star';

function RatingStars({ratingStars, handleRatingStarsChange}) {

  return (
    <div className="rating__stars" onChange={handleRatingStarsChange}>
      {new Array(10).fill('').map((_,i) => (
        <RatingStar key={getRandomInt(0, 1000)} index={i} isChecked={ratingStars === 10 - i}/>
      ))}
    </div>
  );
}

RatingStars.propTypes = {
  ratingStars: PropTypes.number.isRequired,
  handleRatingStarsChange: PropTypes.func.isRequired,
};

export default RatingStars;
