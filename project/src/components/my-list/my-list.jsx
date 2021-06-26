import React from 'react';
import SvgInjector from '../svg-injector/svg-injector';
import SiteLogo from '../site-logo/site-logo';
import UserBlock from '../user-block/user-block';
import PropTypes from 'prop-types';
import MovieList from '../movie-list/movie-list';
import Footer from '../footer/footer';
import movieProp from '../film/film.prop.js';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  movies: state.movies,
});

const ConnectedMyList = connect(mapStateToProps)(MyList);

function MyList({movies}) {

  return (
    <React.Fragment>
      <SvgInjector />
      <div className="user-page">
        <header className="page-header user-page__head">
          <SiteLogo />
          <h1 className="page-title user-page__title">My list</h1>
          <UserBlock />
        </header>

        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>
          <MovieList movies={movies.filter((movie) => movie.isFavorite)} />
        </section>

        <Footer />
      </div>
    </React.Fragment>
  );
}

MyList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.oneOfType(
      [movieProp],
    )).isRequired,
};

export default ConnectedMyList;
