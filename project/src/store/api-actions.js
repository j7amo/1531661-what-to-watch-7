import {APIRoute} from '../const.js';
import {beginMoviesDataFetch, setMoviesData} from './action.js';

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
  api.get(APIRoute.FILMS).then(({data}) => {
    dispatch(setMoviesData(adaptMovieDataToClient(data)));
  });
};
