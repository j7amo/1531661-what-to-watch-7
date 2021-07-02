export const ActionType = {
  SET_CURRENT_GENRE: 'filters/currentGenreSet',
  BEGIN_MOVIES_DATA_FETCH: 'data/moviesDataFetchBegan',
  SET_MOVIES_DATA: 'data/moviesDataSet',
  SET_AUTHORIZATION_STATUS: 'user/authorizationStatusSet',
  REDIRECT_TO_ROUTE: 'user/redirectedToRoute',
  // SET_MOVIES_DATA_ERROR: 'data/moviesDataErrorSet',
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


// export function setMoviesDataError(err) {
//   return {
//     type: ActionType.SET_MOVIES_DATA_ERROR,
//     payload: err,
//   };
// }

