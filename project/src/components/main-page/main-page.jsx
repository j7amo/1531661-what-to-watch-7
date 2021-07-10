import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import SvgInjector from '../svg-injector/svg-injector';
import SiteLogo from '../site-logo/site-logo';
import UserBlock from '../user-block/user-block';
import MovieList from '../movie-list/movie-list';
import Footer from '../footer/footer';
import movieProp from '../film/film.prop.js';
import { Link } from 'react-router-dom';
import GenresList from '../genres-list/genres-list';
import {connect} from 'react-redux';
import { ALL_GENRES } from '../../const';

function getMoviesByGenre(movies, genre) {
  if (genre === ALL_GENRES) {
    return movies;
  }

  return movies.filter((movie) => movie.genre === genre);
}

function MainPage({movies, currentGenre}) {
  const {
    id,
    name,
    genre,
    released,
    backgroundImage,
    posterImage,
  } = movies[19];

  useEffect(() => {

  });

  return (
    <React.Fragment>
      <SvgInjector />
      <section className="film-card">
        <div className="film-card__bg">
          <img src={backgroundImage} alt={name}/>
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header film-card__head">
          <SiteLogo />
          <UserBlock />
        </header>

        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img src={posterImage} alt={name} width="218" height="327"/>
            </div>

            <div className="film-card__desc">
              <h2 className="film-card__title">{name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{genre}</span>
                <span className="film-card__year">{released}</span>
              </p>

              <div className="film-card__buttons">
                <Link to={`/player/${id}`}>
                  <button className="btn btn--play film-card__button" type="button">
                    <svg viewBox="0 0 19 19" width="19" height="19">
                      <use xlinkHref="#play-s"/>
                    </svg>
                    <span>Play</span>
                  </button>
                </Link>
                <button className="btn btn--list film-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"/>
                  </svg>
                  <span>My list</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>
          <GenresList />
          <MovieList movies={getMoviesByGenre(movies, currentGenre)}/>
        </section>
        <Footer />
      </div>
    </React.Fragment>
  );
}

MainPage.propTypes = {
  currentGenre: PropTypes.string.isRequired,
  movies: PropTypes.arrayOf(
    PropTypes.oneOfType(
      [movieProp],
    )).isRequired,
};

const mapStateToProps = (state) => ({
  currentGenre: state.filters.currentGenre,
  movies: state.movies.movies,
});

const ConnectedMainPage = connect(mapStateToProps)(MainPage);

export default ConnectedMainPage;
