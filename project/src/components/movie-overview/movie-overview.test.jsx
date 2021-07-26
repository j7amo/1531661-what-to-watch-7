import React from 'react';
import { render, screen } from '@testing-library/react';
import MovieOverview from './movie-overview';

describe('Components : MovieOverview', () => {
  it('should render correctly', () => {
    const fakeMovie = {
      genre: 'Mockumentary',
      director: 'Arnold Schwarz-Magomaev',
      starring: [
        'Danila Kozlovsky',
      ],
    };

    render(
      <MovieOverview movie={fakeMovie}/>,
    );

    expect(screen.getByText(/Arnold Schwarz-Magomaev/i)).toBeInTheDocument();
    expect(screen.getByText(/Danila Kozlovsky/i)).toBeInTheDocument();
  });
});
