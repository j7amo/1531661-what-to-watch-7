import React from 'react';
import MainPage from '../main-page/main-page';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import {AppRoute, RequestStatus} from '../../const';
import SignIn from '../sign-in/sign-in';
import MyList from '../my-list/my-list';
import Film from '../film/film';
import AddReview from '../add-review/add-review';
import Player from '../player/player';
import NoSuchPage from '../no-such-page/no-such-page';
import {connect} from 'react-redux';
import LoadingScreen from '../loading-screen/loading-screen.jsx';
import {default as PrivateRoute} from '../private-route/private-route';
import {getMoviesRequestStatus} from '../../store/selectors';

function App({isLoading}) {

  if (isLoading === RequestStatus.LOADING) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <Switch>
      <Route exact path={AppRoute.SIGN_IN}>
        <SignIn />
      </Route>
      <Route exact path={AppRoute.MAIN}>
        <MainPage />
      </Route>
      <PrivateRoute exact path={AppRoute.MY_LIST} render={() => <MyList />} />
      <Route exact path={AppRoute.FILM_WITH_ID}>
        <Film />
      </Route>
      <PrivateRoute exact path={AppRoute.ADD_REVIEW} render={({history}) =>
        <AddReview onFormSubmitClick={(id) => history.push(`${AppRoute.FILMS}/${id}`)}/>}
      />
      <Route exact path={AppRoute.PLAYER} render={({history}) =>
        <Player onExitClick={() => history.push(AppRoute.MAIN)}/>}
      />
      <Route>
        <NoSuchPage />
      </Route>
    </Switch>
  );
}

App.propTypes = {
  isLoading: PropTypes.string,
};

const mapStateToProps = (state) => ({
  isLoading: getMoviesRequestStatus(state),
});

const ConnectedApp = connect(mapStateToProps)(App);

export { App };
export default ConnectedApp;
