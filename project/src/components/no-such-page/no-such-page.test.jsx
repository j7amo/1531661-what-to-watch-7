import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import ConnectedNoSuchPage from './no-such-page';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

const mockStore = configureStore({});

describe('Components: ConnectedNoSuchPage', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={mockStore({})}>
        <Router history={history}>
          <ConnectedNoSuchPage />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/404. Page Not Found/i)).toBeInTheDocument();
    expect(screen.getByText(/Go to main page!/i)).toBeInTheDocument();
  });
});
