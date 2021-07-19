import { currentMovieReducer } from './current-movie-reducer';
import {RequestResult, RequestStatus} from '../const';
import {
  beginCommentPost,
  beginCurrentMovieDataFetch, clearCommentPostError,
  clearCurrentMovieError, setCommentPostData, setCommentPostError,
  setCurrentMovieData,
  setCurrentMovieError
} from './action';

const initialState = {
  currentMovieRequestStatus: RequestStatus.IDLE,
  currentMovieRequestResult: null,
  currentMovie: {
    starring: [],
  },
  currentSimilarMovies: [],
  currentComments: [],
  currentMovieError: null,
  commentPostRequestStatus: RequestStatus.IDLE,
  commentPostRequestResult: null,
  commentPostError: null,
};

const errorMock = {message: 'some error'};

describe('Reducers: currentMovieReducer', () => {
  it('should return new state with correctly set fields if called with BEGIN_CURRENT_MOVIE_DATA_FETCH action', () => {

    const expectedState = {
      currentMovieRequestStatus: RequestStatus.LOADING,
      currentMovieRequestResult: null,
      currentMovie: {
        starring: [],
      },
      currentSimilarMovies: [],
      currentComments: [],
      currentMovieError: null,
      commentPostRequestStatus: RequestStatus.IDLE,
      commentPostRequestResult: null,
      commentPostError: null,
    };

    expect(currentMovieReducer(initialState, beginCurrentMovieDataFetch())).toEqual(expectedState);
  });

  it('should return new state with correctly set fields if called with SET_CURRENT_MOVIE_DATA action', () => {

    const movieDataMock = [
      {
        name: 'Some movie',
        starring: [
          'Some actor',
        ],
      },
      [
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
      [
        {
          name: 'User1',
          comment: 'Comment1',
        },
        {
          name: 'User2',
          comment: 'Comment2',
        },
      ],
    ];

    const expectedState = {
      currentMovieRequestStatus: RequestStatus.IDLE,
      currentMovieRequestResult: RequestResult.SUCCEEDED,
      currentMovie: {
        name: 'Some movie',
        starring: [
          'Some actor',
        ],
      },
      currentSimilarMovies: [
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
      currentComments: [
        {
          name: 'User1',
          comment: 'Comment1',
        },
        {
          name: 'User2',
          comment: 'Comment2',
        },
      ],
      currentMovieError: null,
      commentPostRequestStatus: RequestStatus.IDLE,
      commentPostRequestResult: null,
      commentPostError: null,
    };

    expect(currentMovieReducer(initialState, setCurrentMovieData(movieDataMock))).toEqual(expectedState);
  });

  it('should return new state with correctly set fields if called with SET_CURRENT_MOVIE_ERROR action', () => {

    const expectedState = {
      currentMovieRequestStatus: RequestStatus.IDLE,
      currentMovieRequestResult: RequestResult.FAILED,
      currentMovie: {
        starring: [],
      },
      currentSimilarMovies: [],
      currentComments: [],
      currentMovieError: {
        message: 'some error'
      },
      commentPostRequestStatus: RequestStatus.IDLE,
      commentPostRequestResult: null,
      commentPostError: null,
    };

    expect(currentMovieReducer(initialState, setCurrentMovieError(errorMock))).toEqual(expectedState);
  });

  it('should return new state with correctly set fields if called with CLEAR_CURRENT_MOVIE_ERROR action', () => {

    const expectedState = {
      currentMovieRequestStatus: RequestStatus.IDLE,
      currentMovieRequestResult: null,
      currentMovie: {
        starring: [],
      },
      currentSimilarMovies: [],
      currentComments: [],
      currentMovieError: null,
      commentPostRequestStatus: RequestStatus.IDLE,
      commentPostRequestResult: null,
      commentPostError: null,
    };

    expect(currentMovieReducer(initialState, clearCurrentMovieError())).toEqual(expectedState);
  });

  it('should return new state with correctly set fields if called with BEGIN_COMMENT_POST action', () => {

    const expectedState = {
      currentMovieRequestStatus: RequestStatus.IDLE,
      currentMovieRequestResult: null,
      currentMovie: {
        starring: [],
      },
      currentSimilarMovies: [],
      currentComments: [],
      currentMovieError: null,
      commentPostRequestStatus: RequestStatus.LOADING,
      commentPostRequestResult: null,
      commentPostError: null,
    };

    expect(currentMovieReducer(initialState, beginCommentPost())).toEqual(expectedState);
  });

  it('should return new state with correctly set fields if called with SET_COMMENT_POST_DATA action', () => {

    const commentsMock = [
      {
        name: 'User1',
        comment: 'Comment1',
      },
      {
        name: 'User2',
        comment: 'Comment2',
      },
    ];

    const expectedState = {
      currentMovieRequestStatus: RequestStatus.IDLE,
      currentMovieRequestResult: null,
      currentMovie: {
        starring: [],
      },
      currentSimilarMovies: [],
      currentComments: [
        {
          name: 'User1',
          comment: 'Comment1',
        },
        {
          name: 'User2',
          comment: 'Comment2',
        },
      ],
      currentMovieError: null,
      commentPostRequestStatus: RequestStatus.IDLE,
      commentPostRequestResult: RequestResult.SUCCEEDED,
      commentPostError: null,
    };

    expect(currentMovieReducer(initialState, setCommentPostData(commentsMock))).toEqual(expectedState);
  });

  it('should return new state with correctly set fields if called with SET_COMMENT_POST_ERROR action', () => {

    const expectedState = {
      currentMovieRequestStatus: RequestStatus.IDLE,
      currentMovieRequestResult: null,
      currentMovie: {
        starring: [],
      },
      currentSimilarMovies: [],
      currentComments: [],
      currentMovieError: null,
      commentPostRequestStatus: RequestStatus.IDLE,
      commentPostRequestResult: RequestResult.FAILED,
      commentPostError: {
        message: 'some error',
      },
    };

    expect(currentMovieReducer(initialState, setCommentPostError(errorMock))).toEqual(expectedState);
  });

  it('should return new state with correctly set fields if called with CLEAR_COMMENT_POST_ERROR action', () => {

    const expectedState = {
      currentMovieRequestStatus: RequestStatus.IDLE,
      currentMovieRequestResult: null,
      currentMovie: {
        starring: [],
      },
      currentSimilarMovies: [],
      currentComments: [],
      currentMovieError: null,
      commentPostRequestStatus: RequestStatus.IDLE,
      commentPostRequestResult: null,
      commentPostError: null,
    };

    expect(currentMovieReducer(initialState, clearCommentPostError())).toEqual(expectedState);
  });

  it('should return unchanged state if called with incorrect action', () => {

    const incorrectAction = {
      type: 'incorrect',
    };

    expect(currentMovieReducer(initialState, incorrectAction)).toEqual(initialState);
  });
});
