import { filtersReducer } from './filters-reducer';
import { setCurrentGenre } from './action';

const initialState = {
  currentGenre: 'All genres',
};

describe('Reducers: filtersReducer', () => {
  it('should return new state with correctly set fields if called with SET_CURRENT_GENRE action', () => {

    const genre = 'Drama';
    const expectedState = {
      currentGenre: 'Drama',
    };

    expect(filtersReducer(initialState, setCurrentGenre(genre))).toEqual(expectedState);
  });

  it('should return unchanged state if called with incorrect action', () => {

    const incorrectAction = {
      type: 'incorrect',
    };

    expect(filtersReducer(initialState, incorrectAction)).toEqual(initialState);
  });
});
