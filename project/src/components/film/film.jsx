import React, {useEffect} from 'react';
import SvgInjector from '../svg-injector/svg-injector';
import SiteLogo from '../site-logo/site-logo';
import UserBlock from '../user-block/user-block';
import {Link, useParams} from 'react-router-dom';
import PropTypes from 'prop-types';
import MovieList from '../movie-list/movie-list';
import Footer from '../footer/footer';
import MovieTabs from '../movie-tabs/movie-tabs';
import {connect} from 'react-redux';
import {AuthorizationStatus} from '../../const';
import LoadingScreen from '../loading-screen/loading-screen';
import NoSuchPage from '../no-such-page/no-such-page';
import movieProp from '../film/film.prop.js';
import commentProp from '../film/film.prop.js';
import {fetchMovieData} from '../../store/api-actions';

function Film(props) {

  const {
    isLoading,
    currentMovie,
    currentSimilarMovies,
    currentComments,
    incorrectMovieIDRequested,
    authorizationStatus,
    onFilmComponentLayoutRendered,
  } = props;

  const { id } = useParams();

  const {
    name,
    posterImage,
    backgroundImage,
    genre,
    released,
  } = currentMovie;

  useEffect(() => {
    if (currentMovie.id !== Number(id) && !incorrectMovieIDRequested) {
      onFilmComponentLayoutRendered(id);
    }
  });


  if (isLoading) {
    return (
      <LoadingScreen />
    );
  }

  if (incorrectMovieIDRequested) {
    return (
      <NoSuchPage />
    );
  }

  return (
    <React.Fragment>
      <SvgInjector />
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={backgroundImage} alt={name}/>
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header film-card__head">
            <SiteLogo />
            <UserBlock />
          </header>

          <div className="film-card__wrap">
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
                {authorizationStatus === AuthorizationStatus.AUTH
                && <Link to={`/films/${id}/review`} className="btn film-card__button">Add review</Link>}
              </div>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={posterImage} alt={`${name} poster`} width="218" height="327"/>
            </div>

            <MovieTabs movie={currentMovie} reviews={currentComments}/>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>
          <MovieList movies={currentSimilarMovies} />
        </section>

        <Footer />
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  isLoading: state.isLoading,
  currentMovie: state.currentMovie,
  currentSimilarMovies: state.currentSimilarMovies,
  currentComments: state.currentComments,
  incorrectMovieIDRequested: state.incorrectMovieIDRequested,
  authorizationStatus: state.authorizationStatus,
});

const mapDispatchToProps = (dispatch) => ({
  onFilmComponentLayoutRendered(id) {
    dispatch(fetchMovieData(id));
  }
});

const ConnectedFilm = connect(mapStateToProps, mapDispatchToProps)(Film);

Film.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  currentMovie: PropTypes.oneOfType([movieProp]),
  currentSimilarMovies: PropTypes.arrayOf(PropTypes.oneOfType([movieProp])).isRequired,
  currentComments: PropTypes.arrayOf(PropTypes.oneOfType([commentProp])).isRequired,
  incorrectMovieIDRequested: PropTypes.bool.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  onFilmComponentLayoutRendered: PropTypes.func.isRequired,
};

export default ConnectedFilm;
