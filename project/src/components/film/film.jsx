import React, { useEffect } from 'react';
import SvgInjector from '../svg-injector/svg-injector';
import SiteLogo from '../site-logo/site-logo';
import UserBlock from '../user-block/user-block';
import { Link, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import MovieList from '../movie-list/movie-list';
import Footer from '../footer/footer';
import { connect } from 'react-redux';
import {AuthorizationStatus, FavoriteStatus, RequestResult, RequestStatus} from '../../const';
import LoadingScreen from '../loading-screen/loading-screen';
import NoSuchPage from '../no-such-page/no-such-page';
import movieProp from '../film/film.prop.js';
import {fetchCurrentMovieData, postFavoriteMovieStatus} from '../../store/api-actions';
import {
  getAuthorizationStatus,
  getCurrentMovie,
  getCurrentMovieID,
  getCurrentMovieRequestResult,
  getCurrentMovieRequestStatus,
  getCurrentSimilarMovies,
  getIsFavoriteMovie
} from '../../store/selectors';
import ConnectedMovieTabs from '../movie-tabs/movie-tabs';

function Film(props) {

  const {
    isLoading,
    loadingResult,
    currentMovie,
    currentSimilarMovies,
    authorizationStatus,
    isFavorite,
    onFilmComponentLayoutRendered,
    onMyListClick,
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
    if (currentMovie.id !== Number(id) && isLoading !== RequestStatus.LOADING) {
      onFilmComponentLayoutRendered(id);
    }
  });


  if (isLoading === RequestStatus.LOADING) {
    return (
      <LoadingScreen />
    );
  }

  if (loadingResult === RequestResult.FAILED) {
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
                {authorizationStatus === AuthorizationStatus.AUTH &&
                <>
                  <button className="btn btn--list film-card__button" type="button" onClick={() => onMyListClick(id, (isFavorite ? FavoriteStatus.REMOVED_FROM_FAVORITES : FavoriteStatus.ADDED_TO_FAVORITES))}>
                    {isFavorite
                      ?
                      <svg viewBox="0 0 18 14" width="18" height="14">
                        <use xlinkHref="#in-list"/>
                      </svg>
                      :
                      <svg viewBox="0 0 19 20" width="19" height="20">
                        <use xlinkHref="#add"/>
                      </svg>}
                    <span>My list</span>
                  </button>
                  <Link to={`/films/${id}/review`} className="btn film-card__button">Add review</Link>
                </>}
              </div>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={posterImage} alt={`${name} poster`} width="218" height="327"/>
            </div>

            <ConnectedMovieTabs />
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

Film.propTypes = {
  isLoading: PropTypes.string,
  loadingResult: PropTypes.string,
  currentMovie: PropTypes.oneOfType([movieProp]),
  currentSimilarMovies: PropTypes.arrayOf(PropTypes.oneOfType([movieProp])),
  authorizationStatus: PropTypes.string,
  isFavorite: PropTypes.bool,
  onFilmComponentLayoutRendered: PropTypes.func,
  onMyListClick: PropTypes.func,
};

const mapStateToProps = (state) => ({
  isLoading: getCurrentMovieRequestStatus(state),
  loadingResult: getCurrentMovieRequestResult(state),
  currentMovie: getCurrentMovie(state),
  currentSimilarMovies: getCurrentSimilarMovies(state),
  authorizationStatus: getAuthorizationStatus(state),
  isFavorite: getIsFavoriteMovie(state, getCurrentMovieID(state)),
});

const mapDispatchToProps = (dispatch) => ({
  onFilmComponentLayoutRendered(id) {
    dispatch(fetchCurrentMovieData(id));
  },
  onMyListClick(id, status) {
    dispatch(postFavoriteMovieStatus(id, status));
  },
});

const ConnectedFilm = connect(mapStateToProps, mapDispatchToProps)(Film);

export default ConnectedFilm;
