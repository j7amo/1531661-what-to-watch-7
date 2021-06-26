import React from 'react';
import MainPage from '../main-page/main-page';
import PropTypes from 'prop-types';
import {
  BrowserRouter as Router,
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
import reviewProp from '../film/review.prop.js';

function App({movies, reviews}) {
  return (
    <Router>
      <Switch>
        <Route exact path={AppRoute.SIGN_IN}>
          <SignIn />
        </Route>
        <Route exact path={AppRoute.MAIN}>
          <MainPage />
        </Route>
        <Route exact path={AppRoute.MY_LIST}>
          <MyList />
        </Route>
        <Route exact path={AppRoute.FILM}>
          <Film reviews={reviews}/>
        </Route>
        <Route exact path={AppRoute.ADD_REVIEW}>
          <AddReview movies={movies}/>
        </Route>
        <Route exact path={AppRoute.PLAYER}>
          <Player movies={movies}/>
        </Route>
        <Route>
          <NoSuchPage />
        </Route>
      </Switch>
    </Router>
  );
}

App.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.oneOfType(
      [movieProp],
    )).isRequired,
  reviews: PropTypes.arrayOf(
    PropTypes.oneOfType(
      [reviewProp],
    )).isRequired,
};

export default App;
