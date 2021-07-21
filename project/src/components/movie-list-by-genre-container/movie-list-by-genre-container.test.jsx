import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import ConnectedMovieListByGenreContainer from './movie-list-by-genre-container';

let history = null;
let mockStore = null;

describe('Components : ConnectedMovieListByGenreContainer', () => {
  beforeEach(() => {
    history = createMemoryHistory();
    mockStore = configureStore({});
  });

  it('should render correctly', () => {
    const store = mockStore({
      filters: {
        currentGenre: 'Horror',
      },
      movies: {
        movies: [
          {
            id: 1,
            name: 'Movie1',
          },
          {
            id: 2,
            name: 'Movie2',
          },
          {
            id: 3,
            name: 'Movie3',
          },
        ],
      }
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <ConnectedMovieListByGenreContainer />
        </Router>
      </Provider>
    );

    expect(screen.getByTestId(/movie-list-catalog/i)).toBeInTheDocument();
  });
});
