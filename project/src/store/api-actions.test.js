import MockAdapter from 'axios-mock-adapter';
import {createApi} from '../services/api';
import {APIRoute, AppRoute, AuthorizationStatus} from '../const';
import {ActionType} from './action';
import {
  checkAuthorization, fetchCurrentMovieData,
  fetchFavoriteMoviesData,
  fetchMoviesData,
  fetchPromoMovieData, postComment,
  postFavoriteMovieStatus, signIn, signOut
} from './api-actions';

let api = null;
let apiMock = null;
let dispatch = null;

describe('Asynchronous actions', () => {
  beforeAll(() => {
    api = createApi(() => {});
  });
  beforeEach(() => {
    apiMock = new MockAdapter(api);
    dispatch = jest.fn();
  });

  it('should make a correct API call to GET /films in successful API response case', () => {
    const fetchMoviesDataLoader = fetchMoviesData();

    apiMock
      .onGet(APIRoute.FILMS)
      .reply(200, [{fake: true}]);

    return fetchMoviesDataLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.BEGIN_MOVIES_DATA_FETCH,
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.SET_MOVIES_DATA,
          payload: [{fake: true}],
        });
      });
  });

  it('should make a correct API call to GET /films in unsuccessful API response case', () => {
    const fetchMoviesDataLoader = fetchMoviesData();

    apiMock
      .onGet(APIRoute.FILMS)
      .reply(500, {error: true});

    return fetchMoviesDataLoader(dispatch, () => {}, api)
      .catch(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.BEGIN_MOVIES_DATA_FETCH,
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.SET_MOVIES_ERROR,
          payload: {error: true},
        });
      });
  });

  it('should make a correct API call to GET /promo in successful API response case', () => {
    const fetchPromoMovieDataLoader = fetchPromoMovieData();

    apiMock
      .onGet(APIRoute.PROMO)
      .reply(200, {fake: true});

    return fetchPromoMovieDataLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.BEGIN_PROMO_MOVIE_DATA_FETCH,
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.SET_PROMO_MOVIE_DATA,
          payload: {fake: true},
        });
      });
  });

  // it('should make a correct API call to GET /promo in unsuccessful API response case', () => {
  //   const fetchPromoMovieDataLoader = fetchPromoMovieData();
  //
  //   apiMock
  //     .onGet(APIRoute.PROMO)
  //     .reply(500, {error: true});
  //
  //   return fetchPromoMovieDataLoader(dispatch, () => {}, api)
  //     .catch(() => {
  //       expect(dispatch).toHaveBeenCalledTimes(2);
  //       expect(dispatch).toHaveBeenNthCalledWith(1, {
  //         type: ActionType.BEGIN_PROMO_MOVIE_DATA_FETCH,
  //       });
  //       expect(dispatch).toHaveBeenNthCalledWith(2, {
  //         type: ActionType.SET_PROMO_MOVIE_ERROR,
  //         payload: {error: true},
  //       });
  //     });
  // });

  it('should make a correct API call to GET /favorite in successful API response case', () => {
    const fetchFavoriteMoviesDataLoader = fetchFavoriteMoviesData();

    apiMock
      .onGet(APIRoute.FAVORITE)
      .reply(200, [{fake: true}]);

    return fetchFavoriteMoviesDataLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.BEGIN_FAVORITE_MOVIES_DATA_FETCH,
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.SET_FAVORITE_MOVIES_DATA,
          payload: [{fake: true}],
        });
      });
  });

  // it('should make a correct API call to GET /favorite in unsuccessful API response case', () => {
  //   const fetchFavoriteMoviesDataLoader = fetchFavoriteMoviesData();
  //
  //   apiMock
  //     .onGet(APIRoute.FAVORITE)
  //     .reply(500, {error: true});
  //
  //   return fetchFavoriteMoviesDataLoader(dispatch, () => {}, api)
  //     .catch(() => {
  //       expect(dispatch).toHaveBeenCalledTimes(2);
  //       expect(dispatch).toHaveBeenNthCalledWith(1, {
  //         type: ActionType.BEGIN_FAVORITE_MOVIES_DATA_FETCH,
  //       });
  //       expect(dispatch).toHaveBeenNthCalledWith(2, {
  //         type: ActionType.SET_FAVORITE_MOVIES_ERROR,
  //         payload: {error: true},
  //       });
  //     });
  // });

  it('should make a correct API call to POST /favorite/:id/:status in successful API response case', () => {
    const fakeId = 12345;
    const fakeStatus = 1;
    const postFavoriteMovieStatusLoader = postFavoriteMovieStatus(fakeId, fakeStatus);

    apiMock
      .onPost(`${APIRoute.FAVORITE}/${fakeId}/${fakeStatus}`)
      .reply(200, {fake: true});

    return postFavoriteMovieStatusLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.BEGIN_FAVORITE_MOVIE_STATUS_POST,
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.SET_FAVORITE_MOVIE_STATUS_POST_DATA,
          payload: {fake: true},
        });
      });
  });

  // it('should make a correct API call to POST /favorite/:id/:status in unsuccessful API response case', () => {
  //   const fakeId = 12345;
  //   const fakeStatus = 1;
  //   const postFavoriteMovieStatusLoader = postFavoriteMovieStatus(fakeId, fakeStatus);
  //
  //   apiMock
  //     .onPost(`${APIRoute.FAVORITE}/${fakeId}/${fakeStatus}`)
  //     .reply(500, {error: true});
  //
  //   return postFavoriteMovieStatusLoader(dispatch, () => {}, api)
  //     .catch(() => {
  //       expect(dispatch).toHaveBeenCalledTimes(2);
  //       expect(dispatch).toHaveBeenNthCalledWith(1, {
  //         type: ActionType.BEGIN_FAVORITE_MOVIE_STATUS_POST,
  //       });
  //       expect(dispatch).toHaveBeenNthCalledWith(2, {
  //         type: ActionType.SET_FAVORITE_MOVIE_STATUS_POST_ERROR,
  //         payload: {fake: true},
  //       });
  //     });
  // });

  it('should make a correct API calls to GET /films/:id , /films/:id/similar , /comments/:id in successful API response case', () => {
    const fakeId = 12345;
    const fetchCurrentMovieDataLoader = fetchCurrentMovieData(fakeId);

    apiMock
      .onGet(`${APIRoute.FILMS}/${fakeId}`)
      .reply(200, {fake: true})
      .onGet(`${APIRoute.FILMS}/${fakeId}/similar`)
      .reply(200, {fake: true})
      .onGet(`${APIRoute.COMMENTS}/${fakeId}`)
      .reply(200, {fake: true});


    return fetchCurrentMovieDataLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.BEGIN_CURRENT_MOVIE_DATA_FETCH,
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.SET_CURRENT_MOVIE_DATA,
          payload: [{fake: true}, {fake: true}, {fake: true}],
        });
      });
  });

  // it('should make a correct API calls to GET /films/:id , /films/:id/similar , /comments/:id in unsuccessful API response case', () => {
  //   const fakeId = 12345;
  //   const fetchCurrentMovieDataLoader = fetchCurrentMovieData(fakeId);
  //
  //   apiMock
  //     .onGet(`${APIRoute.FILMS}/${fakeId}`)
  //     .reply(500, {error: true})
  //     .onGet(`${APIRoute.FILMS}/${fakeId}/similar`)
  //     .reply(500, {error: true})
  //     .onGet(`${APIRoute.COMMENTS}/${fakeId}`)
  //     .reply(500, {error: true});
  //
  //
  //   return fetchCurrentMovieDataLoader(dispatch, () => {}, api)
  //     .catch(() => {
  //       expect(dispatch).toHaveBeenCalledTimes(2);
  //       expect(dispatch).toHaveBeenNthCalledWith(1, {
  //         type: ActionType.BEGIN_CURRENT_MOVIE_DATA_FETCH,
  //       });
  //       expect(dispatch).toHaveBeenNthCalledWith(2, {
  //         type: ActionType.SET_CURRENT_MOVIE_ERROR,
  //         payload: [{error: true}, {error: true}, {error: true}],
  //       });
  //     });
  // });

  it('should make a correct API call to GET /login', () => {
    const checkAuthorizationLoader = checkAuthorization();

    apiMock
      .onGet(APIRoute.SIGN_IN)
      .reply(200, [{fake: true}]);

    return checkAuthorizationLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.SET_AUTHORIZATION_STATUS,
          payload: AuthorizationStatus.AUTH,
        });
      });
  });

  it('should make a correct API call to POST /login in successful API response case', () => {
    const fakeLogin = '12345@gmail.com';
    const fakePassword = '12345';
    const signInLoader = signIn({email: fakeLogin, password: fakePassword});
    const fakeToken = '1q2w3e4r5t';
    Storage.prototype.setItem = jest.fn();

    apiMock
      .onPost(APIRoute.SIGN_IN)
      .reply(200, {token: fakeToken});

    return signInLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.SET_AUTHORIZATION_STATUS,
          payload: AuthorizationStatus.AUTH,
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.REDIRECT_TO_ROUTE,
          payload: AppRoute.MAIN,
        });
        expect(Storage.prototype.setItem).toBeCalledTimes(1);
        expect(Storage.prototype.setItem).toHaveBeenNthCalledWith(1, 'token', fakeToken);
      });
  });

  it('should make a correct API call to DELETE /logout in successful API response case', () => {
    const signOutLoader = signOut();
    Storage.prototype.removeItem = jest.fn();

    apiMock
      .onDelete(APIRoute.SIGN_OUT)
      .reply(204);

    return signOutLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.SET_AUTHORIZATION_STATUS,
          payload: AuthorizationStatus.NO_AUTH,
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.REDIRECT_TO_ROUTE,
          payload: AppRoute.MAIN,
        });
        expect(Storage.prototype.removeItem).toBeCalledTimes(1);
        expect(Storage.prototype.removeItem).toHaveBeenNthCalledWith(1, 'token');
      });
  });

  it('should make a correct API call to POST /comments/:id in successful API response case', () => {
    const fakeID = 123;
    const fakeRating = 1;
    const fakeComment = 'Hello world';
    const postCommentLoader = postComment({id: fakeID, rating: fakeRating, comment: fakeComment});

    apiMock
      .onPost(`${APIRoute.COMMENTS}/${fakeID}`)
      .reply(200, [{comment: true}]);

    return postCommentLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(3);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.BEGIN_COMMENT_POST,
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.SET_COMMENT_POST_DATA,
          payload: [{comment: true}],
        });
        expect(dispatch).toHaveBeenNthCalledWith(3, {
          type: ActionType.REDIRECT_TO_ROUTE,
          payload: `${AppRoute.FILMS}/${fakeID}`,
        });
      });
  });

  // it('should make a correct API call to POST /comments/:id in unsuccessful API response case', () => {
  //   const fakeID = 123;
  //   const fakeRating = 1;
  //   const fakeComment = 'Hello world';
  //   const postCommentLoader = postComment({id: fakeID, rating: fakeRating, comment: fakeComment});
  //
  //   apiMock
  //     .onPost(`${APIRoute.COMMENTS}/${fakeID}`)
  //     .reply(500, {error: true});
  //
  //   return postCommentLoader(dispatch, () => {}, api)
  //     .catch(() => {
  //       expect(dispatch).toHaveBeenCalledTimes(2);
  //       expect(dispatch).toHaveBeenNthCalledWith(1, {
  //         type: ActionType.BEGIN_COMMENT_POST,
  //       });
  //       expect(dispatch).toHaveBeenNthCalledWith(2, {
  //         type: ActionType.SET_COMMENT_POST_ERROR,
  //         payload: {error: true},
  //       });
  //     });
  // });
});
