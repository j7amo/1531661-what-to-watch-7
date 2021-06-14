import React from 'react';
import PropTypes from 'prop-types';

function RatingStars({ratingStars, handleRatingStarsChange}) {
  const stars = [];

  for (let i = 10; i > 0; i--) {
    if (ratingStars === i) {
      stars.push(
        <React.Fragment>
          <input className="rating__input" id={`star-${i}`} type="radio" name="rating" value={i} checked/>
          <label className="rating__label" htmlFor={`star-${i}`}>Rating {i}</label>
        </React.Fragment>,
      );
    } else {
      stars.push(
        <React.Fragment>
          <input className="rating__input" id={`star-${i}`} type="radio" name="rating" value={i}/>
          <label className="rating__label" htmlFor={`star-${i}`}>Rating {i}</label>
        </React.Fragment>,
      );
    }
  }

  return (
    <div className="rating__stars" onChange={handleRatingStarsChange}>
      {stars}
    </div>
  );
}

RatingStars.propTypes = {
  ratingStars: PropTypes.number.isRequired,
  handleRatingStarsChange: PropTypes.func.isRequired,
};

export default RatingStars;
