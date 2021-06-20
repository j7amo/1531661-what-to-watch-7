import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import MovieCard from '../movie-card/movie-card';
import movieProp from '../film/film.prop.js';

function MovieList({movies}) {
  const [activeMovie, setActiveMovie] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  function handleMouseOver(movie) {
    setActiveMovie(movie);
  }

  function handleMouseLeave() {
    setActiveMovie(null);
  }

  useEffect(() => {
    const timerID = setTimeout(() => setIsPlaying(true),1000);
    return () => {
      setIsPlaying(false);
      clearTimeout(timerID);
    };
  },[activeMovie]);

  return (
    <div className="catalog__films-list">
      {movies.map((movie) => (
        <MovieCard
          key={movie.name + movie.id}
          movie={movie}
          activeMovie={activeMovie}
          isPlaying={isPlaying}
          handleMouseOver={handleMouseOver}
          handleMouseLeave={handleMouseLeave}
        />
      ))}
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
