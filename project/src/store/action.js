export const ActionType = {
  SET_CURRENT_GENRE: 'filters/currentGenreSet',
  BEGIN_MOVIES_DATA_FETCH: 'data/moviesDataFetchBegan',
  SET_MOVIES_DATA: 'data/moviesDataSet',
  SET_MOVIES_ERROR: 'data/moviesDataErrorSet',
  BEGIN_PROMO_MOVIE_DATA_FETCH: 'data/promoMovieDataFetchBegan',
  SET_PROMO_MOVIE_DATA: 'data/promoMovieDataSet',
  SET_PROMO_MOVIE_ERROR: 'data/promoMovieDataErrorSet',
  BEGIN_CURRENT_MOVIE_DATA_FETCH: 'data/currentMovieDataFetchBegan',
  SET_CURRENT_MOVIE_DATA: 'data/currentMovieDataSet',
  SET_CURRENT_MOVIE_ERROR: 'data/currentMovieErrorSet',
  CLEAR_CURRENT_MOVIE_ERROR: 'data/currentMovieErrorCleared',
  BEGIN_COMMENT_POST: 'data/commentPostBegan',
  SET_COMMENT_POST_DATA: 'data/commentPostDataSet',
  SET_COMMENT_POST_ERROR: 'data/commentPostErrorSet',
  CLEAR_COMMENT_POST_ERROR: 'data/commentPostErrorCleared',
  SET_AUTHORIZATION_STATUS: 'user/authorizationStatusSet',
  REDIRECT_TO_ROUTE: 'user/redirectedToRoute',
};

export function setCurrentGenre(genre) {
  return {
    type: ActionType.SET_CURRENT_GENRE,
    payload: genre,
  };
}

export function beginMoviesDataFetch() {
  return {
    type: ActionType.BEGIN_MOVIES_DATA_FETCH,
  };
}

export function setMoviesData(movies) {
  return {
    type: ActionType.SET_MOVIES_DATA,
    payload: movies,
  };
}

export function setMoviesError(error) {
  return {
    type: ActionType.SET_MOVIES_ERROR,
    payload: error,
  };
}

export function beginPromoMovieDataFetch() {
  return {
    type: ActionType.BEGIN_PROMO_MOVIE_DATA_FETCH,
  };
}

export function setPromoMovieData(promoMovie) {
  return {
    type: ActionType.SET_PROMO_MOVIE_DATA,
    payload: promoMovie,
  };
}

export function setPromoMovieError(error) {
  return {
    type: ActionType.SET_PROMO_MOVIE_ERROR,
    payload: error,
  };
}

export function beginCurrentMovieDataFetch() {
  return {
    type: ActionType.BEGIN_CURRENT_MOVIE_DATA_FETCH,
  };
}

export function setCurrentMovieData(movieData) {
  return {
    type: ActionType.SET_CURRENT_MOVIE_DATA,
    payload: movieData,
  };
}

export function setCurrentMovieError(error) {
  return {
    type: ActionType.SET_CURRENT_MOVIE_ERROR,
    payload: error,
  };
}

export function clearCurrentMovieError() {
  return {
    type: ActionType.CLEAR_CURRENT_MOVIE_ERROR,
  };
}

export function beginCommentPost() {
  return {
    type: ActionType.BEGIN_COMMENT_POST,
  };
}

export function setCommentPostData(data) {
  return {
    type: ActionType.SET_COMMENT_POST_DATA,
    payload: data,
  };
}

export function setCommentPostError(err) {
  return {
    type: ActionType.SET_COMMENT_POST_ERROR,
    payload: err,
  };
}

export function clearCommentPostError() {
  return {
    type: ActionType.CLEAR_COMMENT_POST_ERROR,
  };
}

export function setAuthorizationStatus(status) {
  return {
    type: ActionType.SET_AUTHORIZATION_STATUS,
    payload: status,
  };
}

export function redirectToRoute(url) {
  return {
    type: ActionType.REDIRECT_TO_ROUTE,
    payload: url,
  };
}
