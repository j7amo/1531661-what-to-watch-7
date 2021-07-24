import React from 'react';
import { render, screen } from '@testing-library/react';
import MovieReviews from './movie-reviews';

describe('Components : MovieReviews', () => {
  it('should render correctly', () => {
    const fakeReviews = [
        {
          comment: 'Hello world',
          rating: 10,
          user : {
            name: 'Ivan',
          },
          date: 'June 3, 2021',
        },
    ];

    render(
      <MovieReviews reviews={fakeReviews}/>
    );

    expect(screen.getByTestId(/reviews-tab-content/i)).toBeInTheDocument();
    expect(screen.getByText(/Hello world/i)).toBeInTheDocument();
  });
});
