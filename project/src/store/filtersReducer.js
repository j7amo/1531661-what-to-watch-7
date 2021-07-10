import { ActionType } from './action.js';

const initialState = {
  currentGenre: 'All genres',
};

const filtersReducer = (state = initialState, action) => {
  switch(action.type) {
    case ActionType.SET_CURRENT_GENRE:
      return {
        ...state,
        currentGenre: action.payload,
      };
    default:
      return state;
  }
};

export {filtersReducer};
