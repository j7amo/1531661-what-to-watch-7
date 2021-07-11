import React from 'react';
import {Link} from 'react-router-dom';
import { clearCurrentMovieError } from '../../store/action.js';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

function NoSuchPage({onMainClick}) {

  return (
    <p>
      <p>
        404 Page Not Found
      </p>
      <Link to='/' onClick={onMainClick}>
        Go to main page!
      </Link>
    </p>
  );
}

NoSuchPage.propTypes = {
  onMainClick: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  onMainClick() {
    dispatch(clearCurrentMovieError());
  },
});

const ConnectedNoSuchPage = connect(null, mapDispatchToProps)(NoSuchPage);

export default ConnectedNoSuchPage;
