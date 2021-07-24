import React from 'react';
import { render, screen } from '@testing-library/react';
import SvgInjector from './svg-injector';

describe('Components: SvgInjector', () => {
  it('should render correctly', () => {

    render(
      <SvgInjector />,
    );

    expect(screen.getByTestId('symbols')).toBeInTheDocument();
  });
});
