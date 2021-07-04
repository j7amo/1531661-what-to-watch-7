import React from 'react';
import MainPage from '../main-page/main-page';
import PropTypes from 'prop-types';
import {
  Router,
  Switch,
  Route
} from 'react-router-dom';
import { AppRoute } from '../../const';
import SignIn from '../sign-in/sign-in';
import MyList from '../my-list/my-list';
import Film from '../film/film';
import AddReview from '../add-review/add-review';
import Player from '../player/player';
import NoSuchPage from '../no-such-page/no-such-page';
import movieProp from '../film/film.prop.js';
import {connect} from 'react-redux';
import LoadingScreen from '../loading-screen/loading-screen.jsx';
import {default as PrivateRoute} from '../private-route/private-route';
import browserHistory from '../../browser-history';

function App({movies, isLoading}) {

  if (isLoading) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <Router history={browserHistory}>
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
          <AddReview movies={movies} onFormSubmitClick={(id) => history.push(`${AppRoute.FILMS}/${id}`)}/>}
        />
        <Route exact path={AppRoute.PLAYER} render={({history}) =>
          <Player movies={movies} onExitClick={() => history.push(AppRoute.MAIN)}/>}
        />
        <Route>
          <NoSuchPage />
        </Route>
      </Switch>
    </Router>
  );
}

const mapStateToProps = (state) => ({
  movies: state.movies,
  isLoading: state.isLoading,
});

const ConnectedApp = connect(mapStateToProps)(App);

App.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.oneOfType(
      [movieProp],
    )).isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default ConnectedApp;
