import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MovieCard from '../movie-card/movie-card';
import movieProp from '../film/film.prop.js';

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
    PropTypes.oneOfType(
      [movieProp],
    )).isRequired,
};

export default MovieList;
