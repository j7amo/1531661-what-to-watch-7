import React from 'react';
import PropTypes from 'prop-types';
import { getRandomInt } from '../../utils.js';

function RatingStars({ratingStars, handleRatingStarsChange}) {

  return (
    <div className="rating__stars" onChange={handleRatingStarsChange}>
      {new Array(10).fill('').map((_,i) => (
        <React.Fragment key={getRandomInt(0, Number.MAX_VALUE)}>
          <input className="rating__input" id={`star-${10 - i}`} type="radio" name="rating" value={10 - i} checked={ratingStars === 10 - i ? 'checked' : ''}/>
          <label className="rating__label" htmlFor={`star-${10 - i}`}>Rating {10 - i}</label>
        </React.Fragment>
      ))}
    </div>
  );
}

RatingStars.propTypes = {
  ratingStars: PropTypes.number.isRequired,
  handleRatingStarsChange: PropTypes.func.isRequired,
};

export default RatingStars;
