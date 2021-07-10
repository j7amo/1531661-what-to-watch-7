import {APIRoute, AppRoute, AuthorizationStatus} from '../const.js';
import {
  beginMoviesDataFetch,
  setMoviesData,
  beginCurrentMovieDataFetch,
  setCurrentMovieData,
  setAuthorizationStatus,
  redirectToRoute, setCurrentMovieError, setMoviesError, setCommentPostData, setCommentPostError, beginCommentPost,
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
  api.get(APIRoute.FILMS)
    .then(({data}) => dispatch(setMoviesData(data.map((movie) => adaptMovieDataToClient(movie)))))
    .catch((err) => dispatch(setMoviesError(err.message)));
};

export const fetchCurrentMovieData = (id) => (dispatch, _getState, api) => {
  dispatch(beginCurrentMovieDataFetch());
  Promise.all([
    api.get(`${APIRoute.FILMS}/${id}`).then(({data}) => data),
    api.get(`${APIRoute.FILMS}/${id}/similar`).then(({data}) => data),
    api.get(`${APIRoute.COMMENTS}/${id}`).then(({data}) => data),
  ]).then((movieData) => dispatch(setCurrentMovieData(movieData)))
    .catch((err) => dispatch(setCurrentMovieError(err.message)));
};

export const checkAuthorization = () => (dispatch, _getState, api) => {
  api.get(APIRoute.SIGN_IN)
    .then(() => dispatch(setAuthorizationStatus(AuthorizationStatus.AUTH)))
    .catch(() => {});
};

export const signIn = (credentials) => (dispatch, _getState, api) => {
  api.post(APIRoute.SIGN_IN, credentials)
    .then(({data}) => localStorage.setItem('token', data.token))
    .then(() => dispatch(setAuthorizationStatus(AuthorizationStatus.AUTH)))
    .then(() => dispatch(redirectToRoute(AppRoute.MAIN)));
};

export const signOut = () => (dispatch, _getState, api) => {
  api.delete(APIRoute.SIGN_OUT)
    .then(() => localStorage.removeItem('token'))
    .then(() => dispatch(setAuthorizationStatus(AuthorizationStatus.NO_AUTH)))
    .then(() => dispatch(redirectToRoute(AppRoute.MAIN)));
};

export const postComment = ({id, rating, comment}) => (dispatch, _getState, api) => {
  dispatch(beginCommentPost());
  api.post(`${APIRoute.COMMENTS}/${id}`, {rating, comment})
    .then(({data}) => dispatch(setCommentPostData(data)))
    .then(() => dispatch(redirectToRoute(`${AppRoute.FILMS}/${id}`)))
    .catch((err) => dispatch(setCommentPostError(err)));
};
