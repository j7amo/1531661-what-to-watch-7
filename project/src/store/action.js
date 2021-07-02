export const ActionType = {
  SET_CURRENT_GENRE: 'filters/currentGenreSet',
  BEGIN_MOVIES_DATA_FETCH: 'data/moviesDataFetchBegan',
  SET_MOVIES_DATA: 'data/moviesDataSet',
  // SET_MOVIES_DATA_ERROR: 'data/moviesDataErrorSet',
  // REQUIRE_AUTHORIZATION: 'user/authorizationRequired',
  // LOGOUT: 'user/loggedOut',
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

// export function setMoviesDataError(err) {
//   return {
//     type: ActionType.SET_MOVIES_DATA_ERROR,
//     payload: err,
//   };
// }

// export function requireAuthorization(status) {
//   return {
//     type: ActionType.REQUIRE_AUTHORIZATION,
//     payload: status,
//   };
// }
//
// export function logOut() {
//   return {
//     type: ActionType.LOGOUT,
//   };
// }

