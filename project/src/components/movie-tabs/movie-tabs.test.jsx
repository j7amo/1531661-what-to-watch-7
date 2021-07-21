import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import ConnectedMovieTabs from './movie-tabs';
import userEvent from '@testing-library/user-event';

let history = null;
let mockStore = null;

describe('Components : ConnectedMovieTabs', () => {
  beforeEach(() => {
    history = createMemoryHistory();
    mockStore = configureStore({});
  });

  it('should render correctly all 3 tabs on user clicks', () => {
    const store = mockStore({
      currentMovie: {
        currentMovie: {
          genre: 'Mockumentary',
          director: 'Arnold Schwarz-Magomaev',
          starring: [
            'Danila Kozlovsky',
          ],
        },
        currentComments: [
          {
            comment: 'Hello world',
            rating: 10,
            user : {
              name: 'Ivan',
            },
            date: 'June 3, 2021',
          },
        ],
      }
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <ConnectedMovieTabs />
        </Router>
      </Provider>
    );

    expect(screen.getByText(/Arnold Schwarz-Magomaev/i)).toBeInTheDocument();
    expect(screen.getByText(/Danila Kozlovsky/i)).toBeInTheDocument();
    expect(screen.getByText(/Overview/i)).toBeInTheDocument();
    expect(screen.getByText(/Details/i)).toBeInTheDocument();
    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();

    const detailsLink = screen.getByText(/Details/i);
    userEvent.click(detailsLink);
    expect(screen.getByText(/Mockumentary/i)).toBeInTheDocument();

    const reviewsLink = screen.getByText(/Reviews/i);
    userEvent.click(reviewsLink);
    expect(screen.getByText(/Hello world/i)).toBeInTheDocument();
  });
});
