import React from 'react';
import PropTypes from 'prop-types';
import RatingStar from '../rating-star/rating-star';
import { STARS_COUNT } from '../../const.js';
import { nanoid } from 'nanoid';

function RatingStars({ratingStars, handleRatingStarsChange}) {

  return (
    <div className="rating__stars" onChange={handleRatingStarsChange}>
      {new Array(STARS_COUNT).fill('').map((_,i) => (
        <RatingStar key={nanoid()} index={i} isChecked={ratingStars === STARS_COUNT - i}/>
      ))}
    </div>
  );
}

RatingStars.propTypes = {
  ratingStars: PropTypes.number.isRequired,
  handleRatingStarsChange: PropTypes.func.isRequired,
};

export default RatingStars;
