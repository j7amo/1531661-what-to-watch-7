import { moviesReducer } from './movies-reducer';
import {RequestResult, RequestStatus} from '../const';
import {beginMoviesDataFetch, setMoviesData, setMoviesError} from './action';

const initialState = {
  requestStatus: RequestStatus.IDLE,
  requestResult: null,
  movies: [],
  error: null,
};

const moviesMock = [
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

describe('Reducers: moviesReducer', () => {
  it('should return new state with correctly set fields if called with BEGIN_MOVIES_DATA_FETCH action', () => {

    const expectedState = {
      requestStatus: RequestStatus.LOADING,
      requestResult: null,
      movies: [],
      error: null,
    };

    expect(moviesReducer(initialState, beginMoviesDataFetch())).toEqual(expectedState);
  });

  it('should return new state with correctly set fields if called with SET_MOVIES_DATA action', () => {

    const expectedState = {
      requestStatus: RequestStatus.IDLE,
      requestResult: RequestResult.SUCCEEDED,
      movies: [
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
    };

    expect(moviesReducer(initialState, setMoviesData(moviesMock))).toEqual(expectedState);
  });

  it('should return new state with correctly set fields if called with SET_MOVIES_ERROR action', () => {

    const expectedState = {
      requestStatus: RequestStatus.IDLE,
      requestResult: RequestResult.FAILED,
      movies: [],
      error: {
        message: 'some error',
      },
    };

    expect(moviesReducer(initialState, setMoviesError(errorMock))).toEqual(expectedState);
  });

  it('should return unchanged state if called with incorrect action', () => {

    const incorrectAction = {
      type: 'incorrect',
    };

    expect(moviesReducer(initialState, incorrectAction)).toEqual(initialState);
  });
});
