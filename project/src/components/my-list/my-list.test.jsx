import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import ConnectedMyList from './my-list';
import {AuthorizationStatus} from '../../const';

let history = null;
let mockStore = null;

describe('Components : ConnectedMyList', () => {
  beforeEach(() => {
    history = createMemoryHistory();
    mockStore = configureStore({});
  });

  it('should render correctly', () => {
    const store = mockStore({
      authorizationStatus: {
        status: AuthorizationStatus.AUTH,
      },
      filters: {
        currentGenre: 'Drama',
      },
      favoriteMovies: {
        favoriteMovies: [
          {
            name: 'Movie1',
          },
          {
            name: 'Movie2',
          },
          {
            name: 'Movie3',
          },
        ],
      },
      movies: {
        movies: [
          {
            name: 'Movie1',
          },
          {
            name: 'Movie2',
          },
          {
            name: 'Movie3',
          },
        ],
      }
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <ConnectedMyList />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/My list/i)).toBeInTheDocument();
    expect(screen.getByTestId(/movie-list-catalog/i)).toBeInTheDocument();
  });
});
