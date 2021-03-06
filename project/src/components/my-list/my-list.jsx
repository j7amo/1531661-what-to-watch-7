import React from 'react';
import SvgInjector from '../svg-injector/svg-injector';
import SiteLogo from '../site-logo/site-logo';
import UserBlock from '../user-block/user-block';
import PropTypes from 'prop-types';
import MovieList from '../movie-list/movie-list';
import Footer from '../footer/footer';
import movieProp from '../film/film.prop.js';
import { connect } from 'react-redux';
import {getFavoriteMovies, getFavoriteMoviesRequestResult} from '../../store/selectors';
import {RequestResult} from '../../const';
import NoSuchPage from '../no-such-page/no-such-page';

function MyList({favoriteMovies, favoriteMovieRequestResult}) {

  if (favoriteMovieRequestResult === RequestResult.FAILED) {
    return (
      <NoSuchPage />
    );
  }

  return (
    <React.Fragment>
      <SvgInjector />
      <div className="user-page">
        <header className="page-header user-page__head">
          <SiteLogo />
          <h1 className="page-title user-page__title">My list</h1>
          <UserBlock />
        </header>

        <section className="catalog" data-testid="movie-list">
          <h2 className="catalog__title visually-hidden">Catalog</h2>
          <MovieList movies={favoriteMovies} />
        </section>

        <Footer />
      </div>
    </React.Fragment>
  );
}

MyList.propTypes = {
  favoriteMovies: PropTypes.arrayOf(
    PropTypes.oneOfType(
      [movieProp],
    )),
  favoriteMovieRequestResult: PropTypes.string,
};

const mapStateToProps = (state) => ({
  favoriteMovies: getFavoriteMovies(state),
  favoriteMovieRequestResult: getFavoriteMoviesRequestResult(state),
});

const ConnectedMyList = connect(mapStateToProps)(MyList);

export default ConnectedMyList;
