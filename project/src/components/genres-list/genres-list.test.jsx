import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import ConnectedGenresList from './genres-list';

let history = null;
let mockStore = null;

describe('Components : ConnectedGenresList', () => {
  beforeEach(() => {
    history = createMemoryHistory();
    mockStore = configureStore({});
  });

  it('should render correctly', () => {
    const store = mockStore({
      filters: {
        currentGenre: 'Drama',
      },
      movies: {
        movies: [
          {
            id: 1,
            name: 'Movie1',
            genre: 'Comedy',
          },
          {
            id: 2,
            name: 'Movie2',
            genre: 'Drama',
          },
          {
            id: 3,
            name: 'Movie3',
            genre: 'Action',
          },
        ],
      }
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <ConnectedGenresList />
        </Router>
      </Provider>,
    );

    expect(screen.getAllByTestId(/unique-genre/i)).toHaveLength(4);
  });
});
