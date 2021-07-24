import React from 'react';
import { render, screen } from '@testing-library/react';
import MovieDetails from './movie-details';

describe('Components : MovieDetails', () => {
  it('should render correctly', () => {
    const fakeMovie = {
      genre: 'Mockumentary',
      director: 'Arnold Schwarz-Magomaev',
      starring: [
        'Danila Kozlovsky',
      ],
    };

    render(
      <MovieDetails movie={fakeMovie}/>
    );

    expect(screen.getByText(/Run Time/i)).toBeInTheDocument();
    expect(screen.getByText(/Genre/i)).toBeInTheDocument();
    expect(screen.getByText(/Released/i)).toBeInTheDocument();
  });
});
