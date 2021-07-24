import React from 'react';
import { render, screen } from '@testing-library/react';
import RatingStar from './rating-star';

describe('Components: RatingStar', () => {
  it('should render correctly', () => {

    const fakeProps = {
      isChecked: true,
      isDisabled: true,
    };

    render(
      <RatingStar {...fakeProps}/>,
    );

    expect(screen.getByLabelText(/Rating/i)).toBeInTheDocument();
    const starRadioButton = screen.getByTestId(/star/i);
    expect(starRadioButton.checked).toEqual(true);
    expect(starRadioButton.disabled).toEqual(true);
  });
});
