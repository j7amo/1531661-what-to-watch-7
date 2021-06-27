export const ActionType = {
  SET_CURRENT_GENRE: 'filters/currentGenreSet',
  SET_MOVIES: 'movies/moviesSet',
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
