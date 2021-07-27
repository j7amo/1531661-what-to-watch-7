import React from 'react';
import {Link} from 'react-router-dom';
import { clearCurrentMovieError } from '../../store/action.js';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

function NoSuchPage({onMainClick}) {

  return (
    <>
      <h1>
        404. Page Not Found
      </h1>
      <p>
        If you entered a web address please check if it was correct. If you are certain that it was correct there might be some server maintenance going on right now.
      </p>
      <Link to='/' onClick={onMainClick}>
        Try to go to main page!
      </Link>
    </>
  );
}

NoSuchPage.propTypes = {
  onMainClick: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => ({
  onMainClick() {
    dispatch(clearCurrentMovieError());
  },
});

const ConnectedNoSuchPage = connect(null, mapDispatchToProps)(NoSuchPage);

export default ConnectedNoSuchPage;
