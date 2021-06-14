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

function App({movies, reviews}) {
  return (
    <Router>
      <Switch>
        <Route exact path={AppRoute.SIGN_IN}>
          <SignIn />
        </Route>
        <Route exact path={AppRoute.MAIN}>
          <MainPage movies={movies}/>
        </Route>
        <Route exact path={AppRoute.MY_LIST}>
          <MyList movies={movies}/>
        </Route>
        <Route exact path={AppRoute.FILM}>
          <Film />
        </Route>
        <Route exact path={AppRoute.ADD_REVIEW}>
          <AddReview />
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
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      posterImage: PropTypes.string.isRequired,
      previewImage: PropTypes.string.isRequired,
      backgroundImage: PropTypes.string.isRequired,
      backgroundColor: PropTypes.string.isRequired,
      videoLink: PropTypes.string.isRequired,
      previewVideoLink: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
      scoresCount: PropTypes.number.isRequired,
      director: PropTypes.string.isRequired,
      starring: PropTypes.arrayOf(PropTypes.string).isRequired,
      runTime: PropTypes.number.isRequired,
      genre: PropTypes.string.isRequired,
      released: PropTypes.number.isRequired,
      isFavorite: PropTypes.bool.isRequired,
    })).isRequired,
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      user: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      }).isRequired,
      rating: PropTypes.number.isRequired,
      comment: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
    })).isRequired,
};

export default App;
