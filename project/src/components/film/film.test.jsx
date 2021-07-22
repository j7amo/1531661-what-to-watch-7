import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import ConnectedFilm from './film';
import { AuthorizationStatus, RequestResult, RequestStatus } from '../../const';

let history = null;
let mockStore = null;

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    id: 1,
  }),
}));

describe('Components : ConnectedFilm', () => {
  beforeEach(() => {
    history = createMemoryHistory();
    mockStore = configureStore({});
  });

  it('should render correctly', () => {
    const store = mockStore({
      filters: {
        currentGenre: 'Comedy',
      },
      authorizationStatus: {
        status: AuthorizationStatus.AUTH,
      },
      movies: {
        movies: [
          {
            id: 1,
            name: 'Titanic',
            genre: 'Comedy',
            released: 666,
            starring: [
              'Vasya',
              'Kolya',
            ],
          },
          {
            id: 2,
            name: 'Botanic',
            genre: 'Comedy',
            released: 777,
            starring: [
              'Sasha',
              'Kolya',
            ],
          },
        ],
        requestStatus: RequestStatus.IDLE,
      },
      currentMovie: {
        currentMovieRequestStatus: RequestStatus.IDLE,
        currentMovieRequestResult: RequestResult.SUCCEEDED,
        currentMovie: {
          id: 1,
          name: 'Titanic',
          genre: 'Comedy',
          released: 666,
          starring: [
            'Vasya',
            'Kolya',
          ],
        },
        currentSimilarMovies: [
          {
            id: 2,
            name: 'Botanic',
            genre: 'Comedy',
            released: 777,
            starring: [
              'Sasha',
              'Kolya',
            ],
          },
        ],
      },
      favoriteMovies: {
        favoriteMovies: [
          {
            id: 1,
            name: 'Titanic',
            genre: 'Comedy',
            released: 666,
            starring: [
              'Vasya',
              'Kolya',
            ],
          },
        ]
      },
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <ConnectedFilm />
        </Router>
      </Provider>
    );

    expect(screen.getByText(/Titanic/i)).toBeInTheDocument();
  });
});
