import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import ConnectedPlayer from './player';

let history = null;
let mockStore = null;

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    id: 1,
  }),
}));

describe('Component : ConnectedPlayer', () => {
  beforeAll(() => {
    history = createMemoryHistory();
    mockStore = configureStore({});
  });

  it('should render correctly', () => {
    const store = mockStore({
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
      },
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <ConnectedPlayer />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Exit/i)).toBeInTheDocument();
    expect(document.querySelector('use').getAttributeNS('http://www.w3.org/1999/xlink', 'href')).toEqual('#play-s');
  });
});
