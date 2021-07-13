import React from 'react';
import PropTypes from 'prop-types';
import RatingStar from '../rating-star/rating-star';
import { STARS_COUNT } from '../../const.js';
import { nanoid } from 'nanoid';

function RatingStars({ratingStars, handleRatingStarsChange, isDisabled}) {

  return (
    <div className="rating__stars" onChange={handleRatingStarsChange}>
      {new Array(STARS_COUNT).fill('').map((_,i) => (
        <RatingStar key={nanoid()} index={i} isChecked={ratingStars === STARS_COUNT - i} isDisabled={isDisabled}/>
      ))}
    </div>
  );
}

RatingStars.propTypes = {
  ratingStars: PropTypes.number,
  handleRatingStarsChange: PropTypes.func,
  isDisabled: PropTypes.bool,
};

export default RatingStars;
