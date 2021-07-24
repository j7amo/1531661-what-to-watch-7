import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import ConnectedAddReview from './add-review';
import { AuthorizationStatus, RequestStatus } from '../../const';
import userEvent from '@testing-library/user-event';

let history = null;
let mockStore = null;

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    id: 1,
  }),
}));

describe('Components : ConnectedAddReview', () => {
  beforeEach(() => {
    history = createMemoryHistory();
    mockStore = configureStore({});
  });

  it('should render correctly', () => {
    const store = mockStore({
      authorizationStatus: {
        status: AuthorizationStatus.AUTH,
      },
      currentMovie: {
        commentPostRequestStatus: RequestStatus.IDLE,
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
      },
    });

    const fakeReview = 'This is a very good movie! I like it very much! And I like you very much! Do you like me like I do?';

    render(
      <Provider store={store}>
        <Router history={history}>
          <ConnectedAddReview />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Add review/i)).toBeInTheDocument();
    expect(screen.getByRole('button').textContent).toBe('Post');
    expect(screen.getByRole('button').hasAttribute('disabled')).toBe(true);

    userEvent.click(screen.getByTestId('star-5'));
    userEvent.type(screen.getByTestId('review-text'), fakeReview);

    expect(screen.getByDisplayValue(fakeReview)).toBeInTheDocument();
    expect(screen.getByRole('button').hasAttribute('disabled')).toBe(false);
  });
});
