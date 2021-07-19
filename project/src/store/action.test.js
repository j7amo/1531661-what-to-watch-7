import {
  setCurrentGenre,
  beginMoviesDataFetch,
  setMoviesData,
  setMoviesError,
  beginFavoriteMoviesDataFetch,
  setFavoriteMoviesData,
  setFavoriteMoviesError,
  beginFavoriteMovieStatusPost,
  setFavoriteMovieStatusPostData,
  setFavoriteMovieStatusPostError,
  beginPromoMovieDataFetch,
  setPromoMovieData,
  setPromoMovieError,
  beginCurrentMovieDataFetch,
  setCurrentMovieData,
  setCurrentMovieError,
  clearCurrentMovieError,
  beginCommentPost,
  setCommentPostData,
  setCommentPostError,
  clearCommentPostError,
  setAuthorizationStatus,
  redirectToRoute, ActionType
} from './action.js';

describe('Actions', () => {
  it('should return correct action for setting current genre',  () => {
    const genreMock = 'drama';
    const expectedAction = {
      type: ActionType.SET_CURRENT_GENRE,
      payload: genreMock,
    };

    expect(setCurrentGenre(genreMock)).toEqual(expectedAction);
  });

  it('should return correct action for beginning movies data fetch', () => {
    const expectedAction = {
      type: ActionType.BEGIN_MOVIES_DATA_FETCH,
    };
    expect(beginMoviesDataFetch()).toEqual(expectedAction);
  });

  it('should return correct action for setting movies data', () => {
    const moviesMock = [];
    const expectedAction = {
      type: ActionType.SET_MOVIES_DATA,
      payload: moviesMock,
    };
    expect(setMoviesData(moviesMock)).toEqual(expectedAction);
  });

  it('should return correct action for setting movies error after fetch', () => {
    const errorMock = {};
    const expectedAction = {
      type: ActionType.SET_MOVIES_ERROR,
      payload: errorMock,
    };
    expect(setMoviesError(errorMock)).toEqual(expectedAction);
  });

  it('should return correct action for beginning favorite movies data fetch', () => {
    const expectedAction = {
      type: ActionType.BEGIN_FAVORITE_MOVIES_DATA_FETCH,
    };
    expect(beginFavoriteMoviesDataFetch()).toEqual(expectedAction);
  });

  it('should return correct action for setting favorite movies data', () => {
    const moviesMock = [];
    const expectedAction = {
      type: ActionType.SET_FAVORITE_MOVIES_DATA,
      payload: moviesMock,
    };
    expect(setFavoriteMoviesData(moviesMock)).toEqual(expectedAction);
  });

  it('should return correct action for setting favorite movies error', () => {
    const errorMock = {};
    const expectedAction = {
      type: ActionType.SET_FAVORITE_MOVIES_ERROR,
      payload: errorMock,
    };
    expect(setFavoriteMoviesError(errorMock)).toEqual(expectedAction);
  });

  it('should return correct action for beginning favorite movie status post', () => {
    const expectedAction = {
      type: ActionType.BEGIN_FAVORITE_MOVIE_STATUS_POST,
    };
    expect(beginFavoriteMovieStatusPost()).toEqual(expectedAction);
  });

  it('should return correct action for setting favorite movie status post data', () => {
    const movieMock = {};
    const expectedAction = {
      type: ActionType.SET_FAVORITE_MOVIE_STATUS_POST_DATA,
      payload: movieMock,
    };
    expect(setFavoriteMovieStatusPostData(movieMock)).toEqual(expectedAction);
  });

  it('should return correct action for setting favorite movie status post error', () => {
    const errorMock = {};
    const expectedAction = {
      type: ActionType.SET_FAVORITE_MOVIE_STATUS_POST_ERROR,
      payload: errorMock,
    };
    expect(setFavoriteMovieStatusPostError(errorMock)).toEqual(expectedAction);
  });

  it('should return correct action for beginning promo movie data fetch', () => {
    const expectedAction = {
      type: ActionType.BEGIN_PROMO_MOVIE_DATA_FETCH,
    };
    expect(beginPromoMovieDataFetch()).toEqual(expectedAction);
  });

  it('should return correct action for setting promo movie data', () => {
    const movieMock = {};
    const expectedAction = {
      type: ActionType.SET_PROMO_MOVIE_DATA,
      payload: movieMock,
    };
    expect(setPromoMovieData(movieMock)).toEqual(expectedAction);
  });

  it('should return correct action for setting promo movie error', () => {
    const errorMock = {};
    const expectedAction = {
      type: ActionType.SET_PROMO_MOVIE_ERROR,
      payload: errorMock,
    };
    expect(setPromoMovieError(errorMock)).toEqual(expectedAction);
  });

  it('should return correct action for beginning current movie data fetch', () => {
    const expectedAction = {
      type: ActionType.BEGIN_CURRENT_MOVIE_DATA_FETCH,
    };
    expect(beginCurrentMovieDataFetch()).toEqual(expectedAction);
  });

  it('should return correct action for setting current movie data', () => {
    const movieMock = {};
    const expectedAction = {
      type: ActionType.SET_CURRENT_MOVIE_DATA,
      payload: movieMock,
    };
    expect(setCurrentMovieData(movieMock)).toEqual(expectedAction);
  });

  it('should return correct action for setting current movie error', () => {
    const errorMock = {};
    const expectedAction = {
      type: ActionType.SET_CURRENT_MOVIE_ERROR,
      payload: errorMock,
    };
    expect(setCurrentMovieError(errorMock)).toEqual(expectedAction);
  });

  it('should return correct action for clearing current movie error', () => {
    const expectedAction = {
      type: ActionType.CLEAR_CURRENT_MOVIE_ERROR,
    };
    expect(clearCurrentMovieError()).toEqual(expectedAction);
  });

  it('should return correct action for beginning comment post', () => {
    const expectedAction = {
      type: ActionType.BEGIN_COMMENT_POST,
    };
    expect(beginCommentPost()).toEqual(expectedAction);
  });

  it('should return correct action for setting comment post data', () => {
    const commentMock = {};
    const expectedAction = {
      type: ActionType.SET_COMMENT_POST_DATA,
      payload: commentMock,
    };
    expect(setCommentPostData(commentMock)).toEqual(expectedAction);
  });

  it('should return correct action for setting comment post error', () => {
    const errorMock = {};
    const expectedAction = {
      type: ActionType.SET_COMMENT_POST_ERROR,
      payload: errorMock,
    };
    expect(setCommentPostError(errorMock)).toEqual(expectedAction);
  });

  it('should return correct action for clearing comment post error', () => {
    const expectedAction = {
      type: ActionType.CLEAR_COMMENT_POST_ERROR,
    };
    expect(clearCommentPostError()).toEqual(expectedAction);
  });

  it('should return correct action for setting authorization status', () => {
    const statusMock = 'AUTH';
    const expectedAction = {
      type: ActionType.SET_AUTHORIZATION_STATUS,
      payload: statusMock,
    };
    expect(setAuthorizationStatus(statusMock)).toEqual(expectedAction);
  });

  it('should return correct action for redirecting to route', () => {
    const urlMock = '/someUrl';
    const expectedAction = {
      type: ActionType.REDIRECT_TO_ROUTE,
      payload: urlMock,
    };
    expect(redirectToRoute(urlMock)).toEqual(expectedAction);
  });

});
