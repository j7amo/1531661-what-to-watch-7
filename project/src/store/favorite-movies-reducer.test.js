import { favoriteMoviesReducer } from './favorite-movies-reducer';
import {RequestResult, RequestStatus} from '../const';
import {
  beginFavoriteMoviesDataFetch,
  beginFavoriteMovieStatusPost,
  setFavoriteMoviesData,
  setFavoriteMoviesError, setFavoriteMovieStatusPostData, setFavoriteMovieStatusPostError
} from './action';

const initialState = {
  requestStatus: RequestStatus.IDLE,
  requestResult: null,
  favoriteMovies: [],
  error: null,
  favoriteMovieRequestStatus: RequestStatus.IDLE,
  favoriteMovieRequestResult: null,
  favoriteMovieError: null,
};

const initialStateWithFavoriteMovie = {
  requestStatus: RequestStatus.IDLE,
  requestResult: null,
  favoriteMovies: [
    {
      name: 'Movie4',
      starring: [
        'Actor4',
      ],
      isFavorite: true,
    }
  ],
  error: null,
  favoriteMovieRequestStatus: RequestStatus.IDLE,
  favoriteMovieRequestResult: null,
  favoriteMovieError: null,
};

const favoriteMoviesMock = [
  {
    name: 'Movie1',
    starring: [
      'Actor1',
    ],
  },
  {
    name: 'Movie2',
    starring: [
      'Actor2',
    ],
  },
];

const errorMock = {message: 'some error'};

describe('Reducers: favoriteMoviesReducer', () => {

  it('should return new state with correctly set fields if called with BEGIN_FAVORITE_MOVIES_DATA_FETCH action', () => {

    const expectedState = {
      requestStatus: RequestStatus.LOADING,
      requestResult: null,
      favoriteMovies: [],
      error: null,
      favoriteMovieRequestStatus: RequestStatus.IDLE,
      favoriteMovieRequestResult: null,
      favoriteMovieError: null,
    };

    expect(favoriteMoviesReducer(initialState, beginFavoriteMoviesDataFetch())).toEqual(expectedState);
  });

  it('should return new state with correctly set fields if called with SET_FAVORITE_MOVIES_DATA action', () => {

    const expectedState = {
      requestStatus: RequestStatus.IDLE,
      requestResult: RequestResult.SUCCEEDED,
      favoriteMovies: [
        {
          name: 'Movie1',
          starring: [
            'Actor1',
          ],
        },
        {
          name: 'Movie2',
          starring: [
            'Actor2',
          ],
        },
      ],
      error: null,
      favoriteMovieRequestStatus: RequestStatus.IDLE,
      favoriteMovieRequestResult: null,
      favoriteMovieError: null,
    };

    expect(favoriteMoviesReducer(initialState, setFavoriteMoviesData(favoriteMoviesMock))).toEqual(expectedState);
  });

  it('should return new state with correctly set fields if called with SET_FAVORITE_MOVIES_ERROR action', () => {

    const expectedState = {
      requestStatus: RequestStatus.IDLE,
      requestResult: RequestResult.FAILED,
      favoriteMovies: [],
      error: {
        message: 'some error'
      },
      favoriteMovieRequestStatus: RequestStatus.IDLE,
      favoriteMovieRequestResult: null,
      favoriteMovieError: null,
    };

    expect(favoriteMoviesReducer(initialState, setFavoriteMoviesError(errorMock))).toEqual(expectedState);
  });

  it('should return new state with correctly set fields if called with BEGIN_FAVORITE_MOVIE_STATUS_POST action', () => {

    const expectedState = {
      requestStatus: RequestStatus.IDLE,
      requestResult: null,
      favoriteMovies: [],
      error: null,
      favoriteMovieRequestStatus: RequestStatus.LOADING,
      favoriteMovieRequestResult: null,
      favoriteMovieError: null,
    };

    expect(favoriteMoviesReducer(initialState, beginFavoriteMovieStatusPost())).toEqual(expectedState);
  });

  it('should return new state with correctly set fields if called with SET_FAVORITE_MOVIE_STATUS_POST_DATA action', () => {

    const favoriteMovieMock = {
      name: 'Movie3',
      starring: [
        'Actor3',
      ],
      isFavorite: true,
    };

    const notFavoriteMovieMock = {
      name: 'Movie4',
      starring: [
        'Actor4',
      ],
      isFavorite: false,
    };

    const expectedStateWithFavoriteMovieMock = {
      requestStatus: RequestStatus.IDLE,
      requestResult: null,
      favoriteMovies: [
        {
          name: 'Movie3',
          starring: [
            'Actor3',
          ],
          isFavorite: true,
        },
      ],
      error: null,
      favoriteMovieRequestStatus: RequestStatus.IDLE,
      favoriteMovieRequestResult: RequestResult.SUCCEEDED,
      favoriteMovieError: null,
    };

    const expectedStateWithNotFavoriteMovieMock = {
      requestStatus: RequestStatus.IDLE,
      requestResult: null,
      favoriteMovies: [],
      error: null,
      favoriteMovieRequestStatus: RequestStatus.IDLE,
      favoriteMovieRequestResult: RequestResult.SUCCEEDED,
      favoriteMovieError: null,
    };

    expect(favoriteMoviesReducer(initialState, setFavoriteMovieStatusPostData(favoriteMovieMock))).toEqual(expectedStateWithFavoriteMovieMock);
    expect(favoriteMoviesReducer(initialStateWithFavoriteMovie, setFavoriteMovieStatusPostData(notFavoriteMovieMock))).toEqual(expectedStateWithNotFavoriteMovieMock);
  });

  it('should return new state with correctly set fields if called with SET_FAVORITE_MOVIE_STATUS_POST_ERROR action', () => {

    const expectedState = {
      requestStatus: RequestStatus.IDLE,
      requestResult: null,
      favoriteMovies: [],
      error: null,
      favoriteMovieRequestStatus: RequestStatus.IDLE,
      favoriteMovieRequestResult: RequestResult.FAILED,
      favoriteMovieError: {
        message: 'some error',
      },
    };

    expect(favoriteMoviesReducer(initialState, setFavoriteMovieStatusPostError(errorMock))).toEqual(expectedState);
  });

  it('should return unchanged state if called with incorrect action', () => {

    const incorrectAction = {
      type: 'incorrect',
    };

    expect(favoriteMoviesReducer(initialState, incorrectAction)).toEqual(initialState);
  });
});
