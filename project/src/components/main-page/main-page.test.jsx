import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { AuthorizationStatus, RequestStatus } from '../../const';
import { createApi } from '../../services/api';
import ConnectedMainPage from './main-page';

let history = null;
let mockStore = null;
let api = null;
let store = null;

describe('Components : ConnectedMainPage', () => {
  beforeAll(() => {
    api = createApi(() => {});
    history = createMemoryHistory();
    mockStore = configureStore([thunk.withExtraArgument(api)]);

    store = mockStore({
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
          },
          {
            id: 2,
            name: 'Botanic',
            genre: 'Comedy',
            released: 777,
          },
        ],
        requestStatus: RequestStatus.IDLE,
      },
      currentMovie: {
        currentMovieRequestStatus: RequestStatus.IDLE,
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
          },
        ],
      },
      promoMovie: {
        promoMovie: {
          id: 1,
          name: 'Titanic',
          genre: 'Comedy',
          released: 666,
        },
      },
      favoriteMovies: {
        favoriteMovies: [
          {
            id: 1,
            name: 'Titanic',
            genre: 'Comedy',
            released: 666,
          },
        ],
      },
    });
  });

  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <Router history={history}>
          <ConnectedMainPage />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/666/i)).toBeInTheDocument();
  });
});
