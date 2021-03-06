import {APIRoute, AppRoute, AuthorizationStatus} from '../const.js';
import {
  beginMoviesDataFetch,
  setMoviesData,
  beginCurrentMovieDataFetch,
  setCurrentMovieData,
  setAuthorizationStatus,
  redirectToRoute,
  setCurrentMovieError,
  setMoviesError,
  setCommentPostData,
  setCommentPostError,
  beginCommentPost,
  beginPromoMovieDataFetch,
  setPromoMovieError,
  setPromoMovieData,
  beginFavoriteMoviesDataFetch,
  setFavoriteMoviesData,
  setFavoriteMoviesError,
  beginFavoriteMovieStatusPost,
  setFavoriteMovieStatusPostData,
  setFavoriteMovieStatusPostError
} from './action.js';

export const adaptMovieDataToClient = (dataFromServer) => {

  const adaptedMovie = {
    ...dataFromServer,
    backgroundColor: dataFromServer['background_color'],
    backgroundImage: dataFromServer['background_image'],
    isFavorite: dataFromServer['is_favorite'],
    posterImage: dataFromServer['poster_image'],
    previewImage: dataFromServer['preview_image'],
    previewVideoLink: dataFromServer['preview_video_link'],
    runTime: dataFromServer['run_time'],
    scoresCount: dataFromServer['scores_count'],
    videoLink: dataFromServer['video_link'],
  };

  delete adaptedMovie.background_color;
  delete adaptedMovie.background_image;
  delete adaptedMovie.is_favorite;
  delete adaptedMovie.poster_image;
  delete adaptedMovie.preview_image;
  delete adaptedMovie.preview_video_link;
  delete adaptedMovie.run_time;
  delete adaptedMovie.scores_count;
  delete adaptedMovie.video_link;

  return adaptedMovie;
};

export const fetchMoviesData = () => (dispatch, _getState, api) => {
  dispatch(beginMoviesDataFetch());
  return api.get(APIRoute.FILMS)
    .then(({data}) => dispatch(setMoviesData(data.map((movie) => adaptMovieDataToClient(movie)))))
    .catch((err) => dispatch(setMoviesError(err.message)));
};

export const fetchPromoMovieData = () => (dispatch, _getState, api) => {
  dispatch(beginPromoMovieDataFetch());
  return api.get(APIRoute.PROMO)
    .then(({data}) => dispatch(setPromoMovieData(adaptMovieDataToClient(data))))
    .catch((err) => dispatch(setPromoMovieError(err)));
};

export const fetchFavoriteMoviesData = () => (dispatch, _getState, api) => {
  dispatch(beginFavoriteMoviesDataFetch());
  return api.get(APIRoute.FAVORITE)
    .then(({data}) => dispatch(setFavoriteMoviesData(data.map((movie) => adaptMovieDataToClient(movie)))))
    .catch((err) => dispatch(setFavoriteMoviesError(err)));
};

export const postFavoriteMovieStatus = (id, status) => (dispatch, _getState, api) => {
  dispatch(beginFavoriteMovieStatusPost());
  return api.post(`${APIRoute.FAVORITE}/${id}/${status}`)
    .then(({data}) => dispatch(setFavoriteMovieStatusPostData(adaptMovieDataToClient(data))))
    .catch((err) => dispatch(setFavoriteMovieStatusPostError(err)));
};

export const fetchCurrentMovieData = (id) => (dispatch, _getState, api) => {
  dispatch(beginCurrentMovieDataFetch());
  return Promise.all([
    api.get(`${APIRoute.FILMS}/${id}`).then(({data}) => data),
    api.get(`${APIRoute.FILMS}/${id}/similar`).then(({data}) => data),
    api.get(`${APIRoute.COMMENTS}/${id}`).then(({data}) => data),
  ]).then((movieData) => dispatch(setCurrentMovieData(movieData)))
    .catch((err) => dispatch(setCurrentMovieError(err.message)));
};

export const checkAuthorization = () => (dispatch, _getState, api) => (
  api.get(APIRoute.SIGN_IN)
    .then(() => dispatch(setAuthorizationStatus(AuthorizationStatus.AUTH)))
    .catch(() => {})
);

export const signIn = ({email, password}) => (dispatch, _getState, api) => (
  api.post(APIRoute.SIGN_IN, {email, password})
    .then(({data}) => localStorage.setItem('token', data.token))
    .then(() => dispatch(setAuthorizationStatus(AuthorizationStatus.AUTH)))
    .then(() => dispatch(redirectToRoute(AppRoute.MAIN)))
);

export const signOut = () => (dispatch, _getState, api) => (
  api.delete(APIRoute.SIGN_OUT)
    .then(() => localStorage.removeItem('token'))
    .then(() => dispatch(setAuthorizationStatus(AuthorizationStatus.NO_AUTH)))
    .then(() => dispatch(redirectToRoute(AppRoute.MAIN)))
);

export const postComment = ({id, rating, comment}) => (dispatch, _getState, api) => {
  dispatch(beginCommentPost());
  return api.post(`${APIRoute.COMMENTS}/${id}`, {rating, comment})
    .then(({data}) => dispatch(setCommentPostData(data)))
    .then(() => dispatch(redirectToRoute(`${AppRoute.FILMS}/${id}`)))
    .catch((err) => dispatch(setCommentPostError(err)));
};
