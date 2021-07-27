import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { App } from './app';
import thunk from 'redux-thunk';
import {AppRoute, AuthorizationStatus, RequestStatus} from '../../const';
import { createApi } from '../../services/api';
import userEvent from '@testing-library/user-event';

let history = null;
let mockStore = null;
let fakeApp = null;
let api = null;
let store = null;

describe('Application Routing', () => {
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

    fakeApp = (
      <Provider store={store}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>
    );
  });

  it('should render MainPage component when user navigate to "/" ', () => {
    history.push(AppRoute.MAIN);
    render(fakeApp);

    expect(screen.getByText(/666/i)).toBeInTheDocument();
    expect(screen.getByText(/Titanic/i, {selector: 'h2'})).toBeInTheDocument();
    expect(screen.getByText(/Comedy/i, {selector: 'span'})).toBeInTheDocument();
  });

  it('should render MyList component when user navigate to "/myList" ', () => {
    history.push(AppRoute.MY_LIST);
    render(fakeApp);

    expect(screen.getByText(/My list/i)).toBeInTheDocument();
  });

  it('should render Film component when user navigate to "/films/:id" ', () => {
    history.push(`${AppRoute.FILMS}/1`);
    render(fakeApp);

    expect(screen.getByText(/Play/i)).toBeInTheDocument();
    expect(screen.getByText(/My list/i)).toBeInTheDocument();
    expect(screen.getByText(/Add review/i)).toBeInTheDocument();
  });

  it('should render Add Review component when user navigate to "/films/:id/review" ', () => {
    history.push(`${AppRoute.FILMS}/1/review`);
    render(fakeApp);

    expect(screen.getByText(/Add review/i)).toBeInTheDocument();
    expect(screen.getByText(/Post/i)).toBeInTheDocument();
  });

  it('should render Player component when user navigate to "/player/:id" ', () => {
    history.push('/player/1');
    render(fakeApp);

    expect(screen.getByText(/Exit/i)).toBeInTheDocument();
  });

  it('should render No Such Page component when user navigate to nonexistent page', () => {
    history.push('/12wqw32rdf4');
    render(fakeApp);

    expect(screen.getByText(/404. Page Not Found/i)).toBeInTheDocument();
    expect(screen.getByText(/Go to main page!/i)).toBeInTheDocument();
  });

  it('should render SignIn component when user navigate to "/login" ', () => {
    store = mockStore({
      filters: {
        currentGenre: 'Comedy',
      },
      authorizationStatus: {
        status: AuthorizationStatus.NO_AUTH,
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

    fakeApp = (
      <Provider store={store}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>
    );

    history.push(AppRoute.SIGN_IN);
    render(fakeApp);

    expect(screen.getByText(/Email address/i)).toBeInTheDocument();
    expect(screen.getByText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button').textContent).toBe('Sign in');

    userEvent.type(screen.getByTestId(/email-input/i), '123@gmail.com');
    userEvent.type(screen.getByTestId(/password-input/i), '123456');

    expect(screen.getByDisplayValue(/123@gmail.com/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/123456/i)).toBeInTheDocument();
  });

});
