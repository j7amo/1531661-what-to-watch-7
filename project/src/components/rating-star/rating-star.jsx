import React from 'react';
import PropTypes from 'prop-types';

function RatingStar({index, isChecked}) {

  return (
    <React.Fragment>
      <input className="rating__input" id={`star-${10 - index}`} type="radio" name="rating" value={10 - index} checked={isChecked ? 'checked' : ''}/>
      <label className="rating__label" htmlFor={`star-${10 - index}`}>Rating {10 - index}</label>
    </React.Fragment>
  );
}

RatingStar.propTypes = {
  index: PropTypes.number.isRequired,
  isChecked: PropTypes.bool.isRequired,
};

export default RatingStar;
