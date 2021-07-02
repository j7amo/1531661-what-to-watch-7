import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Route, Redirect} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const.js';

function PrivateRoute({path, exact, render, authorizationStatus}) {
  return (
    <Route path={path} exact={exact} render={(routeProps) => (
      authorizationStatus === AuthorizationStatus.AUTH ? render(routeProps) : <Redirect to={AppRoute.SIGN_IN}/>
    )}
    />
  );
}

const mapStateToProps = (state) => ({
  authorizationStatus: state.authorizationStatus,
});

const ConnectedPrivateRoute = connect(mapStateToProps)(PrivateRoute);

PrivateRoute.propTypes = {
  path: PropTypes.string.isRequired,
  exact: PropTypes.bool.isRequired,
  render: PropTypes.func.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
};

export default ConnectedPrivateRoute;
