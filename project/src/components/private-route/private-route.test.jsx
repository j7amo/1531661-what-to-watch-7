import React from 'react';
import { render, screen } from '@testing-library/react';
import { Route, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import ConnectedPrivateRoute from './private-route';
import { AuthorizationStatus } from '../../const';

let history = null;
let mockStore = null;

describe('Components : ConnectedPrivateRoute', () => {
  beforeEach(() => {
    history = createMemoryHistory();
    history.push('/private');
    mockStore = configureStore({});
  });

  it('should render component for public route when user not authorized', function () {
    const store = mockStore({
      authorizationStatus: {
        status: AuthorizationStatus.NO_AUTH,
      }
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <Route exact path="/login"><h1>Public Route</h1></Route>
          <ConnectedPrivateRoute
            exact
            path="/private"
            render={() => (<h1>Private Route</h1>)}
          />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Public Route/i)).toBeInTheDocument();
    expect(screen.queryByText(/Private Route/i)).not.toBeInTheDocument();
  });

  it('should render component for private route when user is authorized', function () {
    const store = mockStore({
      authorizationStatus: {
        status: AuthorizationStatus.AUTH,
      }
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <Route exact path="/login"><h1>Public Route</h1></Route>
          <ConnectedPrivateRoute
            exact
            path="/private"
            render={() => (<h1>Private Route</h1>)}
          />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Private Route/i)).toBeInTheDocument();
    expect(screen.queryByText(/Public Route/i)).not.toBeInTheDocument();
  });
});
