import { ActionType } from './action.js';
import {RequestResult, RequestStatus} from '../const.js';
import {adaptMovieDataToClient} from './api-actions.js';

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

const currentMovieReducer = (state = initialState, action) => {
  switch(action.type) {
    case ActionType.BEGIN_CURRENT_MOVIE_DATA_FETCH:
      return {
        ...state,
        currentMovieRequestStatus: RequestStatus.LOADING,
        currentMovieRequestResult: null,
        currentMovieError: null,
      };
    case ActionType.SET_CURRENT_MOVIE_DATA:
      return {
        ...state,
        currentMovieRequestStatus: RequestStatus.IDLE,
        currentMovieRequestResult: RequestResult.SUCCEEDED,
        currentMovie: adaptMovieDataToClient(action.payload[0]),
        currentSimilarMovies: action.payload[1].map((similarMovie) => adaptMovieDataToClient(similarMovie)),
        currentComments: action.payload[2],
      };
    case ActionType.SET_CURRENT_MOVIE_ERROR:
      return {
        ...state,
        currentMovieRequestStatus: RequestStatus.IDLE,
        currentMovieRequestResult: RequestResult.FAILED,
        currentMovieError: action.payload,
      };
    case ActionType.CLEAR_CURRENT_MOVIE_ERROR:
      return {
        ...state,
        currentMovieRequestResult: null,
        currentMovieError: null,
      };
    case ActionType.BEGIN_COMMENT_POST:
      return {
        ...state,
        commentPostRequestStatus: RequestStatus.LOADING,
        commentPostRequestResult: null,
        commentPostError: null,
      };
    case ActionType.SET_COMMENT_POST_DATA:
      return {
        ...state,
        commentPostRequestStatus: RequestStatus.IDLE,
        commentPostRequestResult: RequestResult.SUCCEEDED,
        currentComments: action.payload,
        commentPostError: null,
      };
    case ActionType.SET_COMMENT_POST_ERROR:
      return {
        ...state,
        commentPostRequestStatus: RequestStatus.IDLE,
        commentPostRequestResult: RequestResult.FAILED,
        commentPostError: action.payload,
      };
    case ActionType.CLEAR_COMMENT_POST_ERROR:
      return {
        ...state,
        commentPostRequestResult: null,
        commentPostError: null,
      };
    default:
      return state;
  }
};

export { currentMovieReducer };
