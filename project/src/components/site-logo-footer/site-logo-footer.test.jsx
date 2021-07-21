import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import SiteLogoFooter from './site-logo-footer';

describe('Components : SiteLogoFooter', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <Router history={history}>
        <SiteLogoFooter />
      </Router>,
    );

    expect(screen.getByTestId('footer-logo-link')).toBeInTheDocument();
  });
});
