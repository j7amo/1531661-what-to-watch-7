import React, {useCallback} from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {AuthorizationStatus} from '../../const.js';
import {signOut} from '../../store/api-actions.js';

function UserBlock({authorizationStatus, onSignOutClick}) {

  const handleOnClick = useCallback((evt) => {
    evt.preventDefault();
    onSignOutClick();
  },[]);

  if(authorizationStatus !== AuthorizationStatus.AUTH) {
    return (
      <ul className="user-block">
        <li className="user-block__item">
        </li>
        <li className="user-block__item">
          <Link to="/login" className="user-block__link">Sign in</Link>
        </li>
      </ul>
    );
  }

  return (
    <ul className="user-block">
      <li className="user-block__item">
        <div className="user-block__avatar">
          <Link to="/myList">
            <img src="img/avatar.jpg" alt="User avatar" width="63" height="63"/>
          </Link>
        </div>
      </li>
      <li className="user-block__item">
        <a className="user-block__link" onClick={handleOnClick}>Sign out</a>
      </li>
    </ul>
  );
}

const mapStateToProps = (state) => ({
  authorizationStatus: state.authorizationStatus.status,
});

const mapDispatchToProps = (dispatch) => ({
  onSignOutClick() {
    dispatch(signOut());
  },
});

const ConnectedUserBlock = connect(mapStateToProps, mapDispatchToProps)(UserBlock);

UserBlock.propTypes = {
  authorizationStatus: PropTypes.string,
  onSignOutClick: PropTypes.func,
};

export default ConnectedUserBlock;
