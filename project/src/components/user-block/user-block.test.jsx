import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { AuthorizationStatus } from '../../const';
import ConnectedUserBlock from './user-block';

let history = null;
let mockStore = null;

describe('Components: UserBlock', () => {
  beforeEach(() => {
    history = createMemoryHistory();
    mockStore = configureStore({});
  });

  it('should render correctly with user authorized', () => {
    const store = mockStore({
      authorizationStatus: {
        status: AuthorizationStatus.AUTH,
      },
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <ConnectedUserBlock />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Sign out/i)).toBeInTheDocument();
  });

  it('should render correctly with user unauthorized', () => {
    const store = mockStore({
      authorizationStatus: {
        status: AuthorizationStatus.NO_AUTH,
      },
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <ConnectedUserBlock />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
  });
});
