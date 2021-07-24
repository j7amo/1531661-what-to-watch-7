import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Footer from './footer';

let history = null;

describe('Components : Footer', () => {
  beforeEach(() => {
    history = createMemoryHistory();
  });

  it('should ', () => {
    render(
      <Router history={history}>
        <Footer />
      </Router>,
    );

    expect(screen.getByText(/© 2019 What to watch Ltd./i)).toBeInTheDocument();
    expect(screen.getByTestId(/footer-logo-link/i)).toBeInTheDocument();
  });
});
