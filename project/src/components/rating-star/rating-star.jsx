import React from 'react';
import PropTypes from 'prop-types';
import { STARS_COUNT} from '../../const.js';

function RatingStar({index, isChecked}) {

  return (
    <React.Fragment>
      <input className="rating__input" id={`star-${STARS_COUNT - index}`} type="radio" name="rating" value={STARS_COUNT - index} defaultChecked={isChecked}/>
      <label className="rating__label" htmlFor={`star-${STARS_COUNT - index}`}>Rating {STARS_COUNT - index}</label>
    </React.Fragment>
  );
}

RatingStar.propTypes = {
  index: PropTypes.number.isRequired,
  isChecked: PropTypes.bool.isRequired,
};

export default RatingStar;
