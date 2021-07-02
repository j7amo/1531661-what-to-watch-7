import {APIRoute, AppRoute, AuthorizationStatus} from '../const.js';
import {beginMoviesDataFetch, redirectToRoute, setAuthorizationStatus, setMoviesData} from './action.js';

const adaptMovieDataToClient = (dataFromServer) => (

  dataFromServer.map((movie) => {

    const adaptedMovie = {
      ...movie,
      backgroundColor: movie['background_color'],
      backgroundImage: movie['background_image'],
      isFavorite: movie['is_favorite'],
      posterImage: movie['poster_image'],
      previewImage: movie['preview_image'],
      previewVideoLink: movie['preview_video_link'],
      runTime: movie['run_time'],
      scoresCount: movie['scores_count'],
      videoLink: movie['video_link'],
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
  })
);

// const adaptMovieDataToServer = (dataFromClient) => {
// };

export const fetchMoviesData = () => (dispatch, _getState, api) => {
  dispatch(beginMoviesDataFetch());
  api.get(APIRoute.FILMS)
    .then(({data}) => dispatch(setMoviesData(adaptMovieDataToClient(data))));
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
    .then(() => dispatch(setAuthorizationStatus(AuthorizationStatus.NO_AUTH)));
};
