import React from 'react';
import { render, screen } from '@testing-library/react';
import Review from "./review";

describe('Components: Review', () => {
  it('should render correctly', () => {
    const fakeReview = {
      comment: 'Hello world',
      rating: 10,
      user : {
        name: 'Ivan',
      },
      date: 'June 3, 2021',
    };

    render(
      <Review review={fakeReview}/>
    );

    expect(screen.getByText(/Hello world/i)).toBeInTheDocument();
    expect(screen.getByText(/10/i)).toBeInTheDocument();
    expect(screen.getByText(/Ivan/i)).toBeInTheDocument();
    expect(screen.getByText(/June 4, 2021/i)).toBeInTheDocument();
  });
});
