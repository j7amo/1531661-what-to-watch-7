import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import ConnectedSignIn from './sign-in';
import userEvent from '@testing-library/user-event';

let history = null;
let mockStore = null;

describe('Components : ConnectedSignIn', () => {
  beforeEach(() => {
    history = createMemoryHistory();
    mockStore = configureStore({});
  });

  it('should render correctly and let user type in some data', () => {
    const store = mockStore({});

    render(
      <Provider store={store}>
        <Router history={history}>
          <ConnectedSignIn />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Email address/i)).toBeInTheDocument();
    expect(screen.getByText(/Password/i)).toBeInTheDocument();

    userEvent.type(screen.getByTestId(/email-input/i), '123@gmail.com');
    userEvent.type(screen.getByTestId(/password-input/i), '123456');

    expect(screen.getByDisplayValue(/123@gmail.com/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/123456/i)).toBeInTheDocument();
  });
});
