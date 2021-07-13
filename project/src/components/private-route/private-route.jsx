import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const.js';

function PrivateRoute({path, exact, render, authorizationStatus}) {
  return (
    <Route path={path} exact={exact} render={(routeProps) => (
      authorizationStatus === AuthorizationStatus.AUTH ? render(routeProps) : <Redirect to={AppRoute.SIGN_IN}/>
    )}
    />
  );
}

PrivateRoute.propTypes = {
  path: PropTypes.string,
  exact: PropTypes.bool,
  render: PropTypes.func,
  authorizationStatus: PropTypes.string,
};

const mapStateToProps = (state) => ({
  authorizationStatus: state.authorizationStatus.status,
});

const ConnectedPrivateRoute = connect(mapStateToProps)(PrivateRoute);

export default ConnectedPrivateRoute;
