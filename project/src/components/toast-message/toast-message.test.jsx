import React from 'react';
import { render, screen } from '@testing-library/react';
import ToastMessage from './toast-message';

describe('Components : ToastMessage', () => {
  it('should render correctly', () => {

    const fakeMessage = 'Hello world';

    render(
      <ToastMessage message={fakeMessage}/>
    );

    expect(screen.getByText(/Hello world/i)).toBeInTheDocument();
  });
});
