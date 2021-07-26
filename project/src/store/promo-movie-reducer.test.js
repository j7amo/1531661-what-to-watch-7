import { promoMovieReducer } from './promo-movie-reducer';
import {RequestResult, RequestStatus} from '../const';
import {beginPromoMovieDataFetch, setPromoMovieData, setPromoMovieError} from './action';

const initialState = {
  requestStatus: RequestStatus.IDLE,
  requestResult: null,
  promoMovie: {},
  error: null,
};

const promoMovieMock = {
  name: 'Movie1',
  starring: [
    'Actor1',
  ],
};

const errorMock = {message: 'some error'};

describe('Reducers: promoMovieReducer', () => {
  it('should return new state with correctly set fields if called with BEGIN_PROMO_MOVIE_DATA_FETCH action', () => {

    const expectedState = {
      requestStatus: RequestStatus.LOADING,
      requestResult: null,
      promoMovie: {},
      error: null,
    };

    expect(promoMovieReducer(initialState, beginPromoMovieDataFetch())).toEqual(expectedState);
  });

  it('should return new state with correctly set fields if called with SET_PROMO_MOVIE_DATA action', () => {

    const expectedState = {
      requestStatus: RequestStatus.IDLE,
      requestResult: RequestResult.SUCCEEDED,
      promoMovie: {
        name: 'Movie1',
        starring: [
          'Actor1',
        ],
      },
      error: null,
    };

    expect(promoMovieReducer(initialState, setPromoMovieData(promoMovieMock))).toEqual(expectedState);
  });

  it('should return new state with correctly set fields if called with SET_PROMO_MOVIE_ERROR action', () => {

    const expectedState = {
      requestStatus: RequestStatus.IDLE,
      requestResult: RequestResult.FAILED,
      promoMovie: {},
      error: {
        message: 'some error',
      },
    };

    expect(promoMovieReducer(initialState, setPromoMovieError(errorMock))).toEqual(expectedState);
  });

  it('should return unchanged state if called with incorrect action', () => {

    const incorrectAction = {
      type: 'incorrect',
    };

    expect(promoMovieReducer(initialState, incorrectAction)).toEqual(initialState);
  });
});
