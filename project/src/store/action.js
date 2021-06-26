export const ActionType = {
  SET_CURRENT_GENRE: 'filters/currentGenreSet',
  SET_MOVIES: 'movies/moviesSet',
  ADD_RENDERED_MOVIES_LIMIT: 'movies/renderedMoviesLimitAdded',
  RESET_RENDERED_MOVIES_LIMIT: 'movies/renderedMoviesCounterReset',
};

export function setCurrentGenre(genre) {
  return {
    type: ActionType.SET_CURRENT_GENRE,
    payload: genre,
  };
}

export function setMovies(movies) {
  return {
    type: ActionType.SET_MOVIES,
    payload: movies,
  };
}

export function addRenderedMoviesLimit() {
  return {
    type: ActionType.ADD_RENDERED_MOVIES_LIMIT,
  };
}

export function resetRenderedMoviesLimit() {
  return {
    type: ActionType.RESET_RENDERED_MOVIES_LIMIT,
  };
}
