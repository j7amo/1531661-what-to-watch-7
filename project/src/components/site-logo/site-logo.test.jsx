import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import SiteLogo from './site-logo';

describe('Components : SiteLogo', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <Router history={history}>
        <SiteLogo />
      </Router>,
    );

    expect(screen.getByTestId('site-logo-link')).toBeInTheDocument();
  });
});
