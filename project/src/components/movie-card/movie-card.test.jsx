import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import ConnectedMovieCard from './movie-card';

let history = null;
let mockStore = null;

describe('Components : ConnectedMovieCard', () => {
  beforeEach(() => {
    history = createMemoryHistory();
    mockStore = configureStore({});
  });

  it('should render correctly', () => {
    const fakeID = 123;
    const store = mockStore({
      movies: {
        movies: [
          {
            id: 123,
            name: 'Movie123',
          },
        ],
      },
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <ConnectedMovieCard movieID={fakeID}/>
        </Router>
      </Provider>,
    );

    expect(screen.getByTestId(/film-card-in-movie-list/i)).toBeInTheDocument();
    expect(screen.getByAltText(/Movie123/i)).toBeInTheDocument();
  });
});
