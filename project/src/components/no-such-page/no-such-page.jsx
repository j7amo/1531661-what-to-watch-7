import React from 'react';
import {Link} from 'react-router-dom';
import {resetIncorrectMovieIDRequested} from '../../store/action';
import {connect} from 'react-redux';

function NoSuchPage({onGoToMainClick}) {

  return (
    <p>
      <p>
        404 Page Not Found
      </p>
      <Link to='/' onClick={onGoToMainClick}>
        Go to main page!
      </Link>
    </p>
  );
}

const mapDispatchToProps = (dispatch) => ({
  onGoToMainClick() {
    dispatch(resetIncorrectMovieIDRequested());
  }
});

const ConnectedNoSuchPage = connect(null, mapDispatchToProps)(NoSuchPage);

export default ConnectedNoSuchPage;
