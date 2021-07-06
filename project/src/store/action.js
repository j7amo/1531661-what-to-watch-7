export const ActionType = {
  SET_CURRENT_GENRE: 'filters/currentGenreSet',
  BEGIN_MOVIES_DATA_FETCH: 'data/moviesDataFetchBegan',
  SET_INCORRECT_MOVIE_ID_REQUESTED: 'data/incorrectMovieIDRequestedSet',
  SET_MOVIES_DATA: 'data/moviesDataSet',
  SET_MOVIE_DATA: 'data/movieDataSet',
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

export function beginMovieDataFetch() {
  return {
    type: ActionType.BEGIN_MOVIES_DATA_FETCH,
  };
}

export function setIncorrectMovieIDRequested() {
  return {
    type: ActionType.SET_INCORRECT_MOVIE_ID_REQUESTED,
  }
}

export function setMoviesData(movies) {
  return {
    type: ActionType.SET_MOVIES_DATA,
    payload: movies,
  };
}

export function setMovieData(movieData) {
  return {
    type: ActionType.SET_MOVIE_DATA,
    payload: movieData,
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
