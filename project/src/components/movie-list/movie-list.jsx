import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MovieCard from '../movie-card/movie-card';

function MovieList({movies}) {
  const [activeMovie, setActiveMovie] = useState(null);

  function handleMouseOver(movie) {
    setActiveMovie(movie);
    return activeMovie; // временно делаю return, чтобы линтер не ругался на неиспользуемые переменные
  }

  return (
    <div className="catalog__films-list">
      {movies.map((movie) => <MovieCard key={movie.name + movie.id} movie={movie} handleMouseOver={handleMouseOver}/>)}
    </div>
  );
}

MovieList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      posterImage: PropTypes.string.isRequired,
      previewImage: PropTypes.string.isRequired,
      backgroundImage: PropTypes.string.isRequired,
      backgroundColor: PropTypes.string.isRequired,
      videoLink: PropTypes.string.isRequired,
      previewVideoLink: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
      scoresCount: PropTypes.number.isRequired,
      director: PropTypes.string.isRequired,
      starring: PropTypes.arrayOf(PropTypes.string).isRequired,
      runTime: PropTypes.number.isRequired,
      genre: PropTypes.string.isRequired,
      released: PropTypes.number.isRequired,
      isFavorite: PropTypes.bool.isRequired,
    })).isRequired,
};

export default MovieList;
