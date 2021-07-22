import React from 'react';
import { render, screen } from '@testing-library/react';
import RatingStars from './rating-stars';

describe('Components: RatingStars', () => {
  it('should render correctly', () => {

    render(
      <RatingStars />,
    );

    expect(screen.getAllByLabelText(/Rating/i)).toHaveLength(10);
  });
});
