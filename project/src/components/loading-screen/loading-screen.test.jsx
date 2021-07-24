import React from 'react';
import { render, screen } from '@testing-library/react';
import LoadingScreen from './loading-screen';

describe('', () => {
  it('should render correctly', () => {
    render(
      <LoadingScreen />,
    );

    expect(screen.getByTestId(/loading-spinner/i)).toBeInTheDocument();
  });
});
