import React, {useEffect, useState} from 'react';
import SvgInjector from '../svg-injector/svg-injector';
import SiteLogo from '../site-logo/site-logo';
import UserBlock from '../user-block/user-block';
import {Link, useParams} from 'react-router-dom';
import PropTypes from 'prop-types';
import MovieList from '../movie-list/movie-list';
import Footer from '../footer/footer';
import MovieTabs from '../movie-tabs/movie-tabs';
import {connect} from 'react-redux';
import {APIRoute, AuthorizationStatus} from '../../const';
import {createApi} from '../../services/api.js';
import {adaptMovieDataToClient} from '../../store/api-actions';
import LoadingScreen from '../loading-screen/loading-screen';
import NoSuchPage from '../no-such-page/no-such-page';

const MAX_SIMILAR_MOVIES_NUMBER = 4;

const api = createApi(() => {});

function Film({authorizationStatus}) {

  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [movie, setMovie] = useState({});
  const [similarMovies, setSimilarMovies] = useState([]);
  const [movieComments, setMovieComments] = useState([]);
  const [incorrectMovieIDRequested, setIncorrectMovieIDRequested] = useState(false);

  const {
    name,
    posterImage,
    backgroundImage,
    genre,
    released,
  } = movie;

  useEffect(() => {
    Promise.all([
      api.get(`${APIRoute.FILMS}/${id}`)
        .then(({data}) => setMovie(adaptMovieDataToClient(data)))
        .catch(() => setIncorrectMovieIDRequested(true)),
      api.get(`${APIRoute.FILMS}/${id}/similar`)
        .then(({data}) => {
          setSimilarMovies(data.filter((localMovie) => localMovie.id !== Number(id)).slice(0, MAX_SIMILAR_MOVIES_NUMBER).map((localMovie) => adaptMovieDataToClient(localMovie)));
        })
        .catch(() => setIncorrectMovieIDRequested(true)),
      api.get(`${APIRoute.COMMENTS}/${id}`)
        .then(({data}) => setMovieComments(data))
        .catch(() => setIncorrectMovieIDRequested(true)),
    ]).then(() => setIsLoading(false));
  },[id]);

  if (incorrectMovieIDRequested) {
    return (
      <NoSuchPage />
    );
  }

  if (isLoading) {
    return (
      <LoadingScreen />
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

            <MovieTabs movie={movie} reviews={movieComments}/>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>
          <MovieList movies={similarMovies} />
        </section>

        <Footer />
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  authorizationStatus: state.authorizationStatus,
});

const ConnectedFilm = connect(mapStateToProps)(Film);

Film.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
};

export default ConnectedFilm;
