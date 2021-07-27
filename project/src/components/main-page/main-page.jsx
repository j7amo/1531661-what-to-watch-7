import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import SvgInjector from '../svg-injector/svg-injector';
import SiteLogo from '../site-logo/site-logo';
import UserBlock from '../user-block/user-block';
import Footer from '../footer/footer';
import GenresList from '../genres-list/genres-list';
import ConnectedMovieListByGenreContainer from '../movie-list-by-genre-container/movie-list-by-genre-container';
import { connect } from 'react-redux';
import {
  getAuthorizationStatus,
  getIsFavoriteMovie, getMoviesRequestStatus,
  getPromoMovieBackgroundImage,
  getPromoMovieGenre,
  getPromoMovieID,
  getPromoMovieName, getPromoMoviePosterImage,
  getPromoMovieReleasedDate, getPromoMovieRequestResult
} from '../../store/selectors';
import {fetchFavoriteMoviesData, postFavoriteMovieStatus} from '../../store/api-actions';
import {AuthorizationStatus, FavoriteStatus, RequestResult} from '../../const';
import NoSuchPage from '../no-such-page/no-such-page';
import { Link } from 'react-router-dom';

function MainPage(props) {

  const {
    promoMovieRequestResult,
    moviesRequestResult,
    id,
    name,
    genre,
    released,
    backgroundImage,
    posterImage,
    isFavorite,
    onMyListClick,
    authorizationStatus,
    onMainPageComponentLayoutRendered,
  } = props;

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.AUTH) {
      onMainPageComponentLayoutRendered();
    }
  },[authorizationStatus]);

  if (promoMovieRequestResult === RequestResult.FAILED || moviesRequestResult === RequestResult.FAILED) {
    return (
      <NoSuchPage />
    );
  }

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
                <Link className="btn btn--play film-card__button" to={`/player/${id}`}>
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"/>
                  </svg>
                  <span>Play</span>
                </Link>
                {authorizationStatus === AuthorizationStatus.AUTH &&
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
                </button>}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>
          <GenresList />
          <ConnectedMovieListByGenreContainer />
        </section>
        <Footer />
      </div>
    </React.Fragment>
  );
}

MainPage.propTypes = {
  promoMovieRequestResult: PropTypes.string,
  moviesRequestResult: PropTypes.string,
  id: PropTypes.number,
  name: PropTypes.string,
  genre: PropTypes.string,
  released: PropTypes.number,
  backgroundImage: PropTypes.string,
  posterImage: PropTypes.string,
  isFavorite: PropTypes.bool,
  onMyListClick: PropTypes.func,
  authorizationStatus: PropTypes.string,
  onMainPageComponentLayoutRendered: PropTypes.func,
};

const mapStateToProps = (state) => ({
  promoMovieRequestResult: getPromoMovieRequestResult(state),
  moviesRequestResult: getMoviesRequestStatus(state),
  id: getPromoMovieID(state),
  name: getPromoMovieName(state),
  genre: getPromoMovieGenre(state),
  released: getPromoMovieReleasedDate(state),
  backgroundImage: getPromoMovieBackgroundImage(state),
  posterImage: getPromoMoviePosterImage(state),
  isFavorite: getIsFavoriteMovie(state, getPromoMovieID(state)),
  authorizationStatus: getAuthorizationStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  onMyListClick(id, status) {
    dispatch(postFavoriteMovieStatus(id, status));
  },
  onMainPageComponentLayoutRendered() {
    dispatch(fetchFavoriteMoviesData());
  },
});

const ConnectedMainPage = connect(mapStateToProps, mapDispatchToProps)(MainPage);

export default memo(ConnectedMainPage);
