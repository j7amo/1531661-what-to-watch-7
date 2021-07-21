import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import ConnectedSignIn from './sign-in';

let history = null;
let mockStore = null;

describe('Components : ConnectedSignIn', () => {
  beforeEach(() => {
    history = createMemoryHistory();
    mockStore = configureStore({});
  });

  it('should render correctly', () => {
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
  });
});
