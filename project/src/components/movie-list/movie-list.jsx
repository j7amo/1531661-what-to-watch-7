import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import MovieCard from '../movie-card/movie-card';
import movieProp from '../film/film.prop.js';
import {connect} from 'react-redux';

const PREVIEW_DELAY = 1000;
const MOVIE_RENDER_INITIAL_LIMIT = 8;
const MOVIE_RENDER_STEP = 8;

const mapStateToProps = (state) => ({
  currentGenre: state.currentGenre,
});

const ConnectedMovieList = connect(mapStateToProps)(MovieList);

function MovieList({movies, currentGenre}) {
  const [activeMovie, setActiveMovie] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [renderedMoviesLimit, setRenderedMoviesLimit] = useState(MOVIE_RENDER_INITIAL_LIMIT);

  function handleMouseOver(movie) {
    setActiveMovie(movie);
  }

  function handleMouseLeave() {
    setActiveMovie(null);
  }

  function handleShowMoreClick() {
    setRenderedMoviesLimit(renderedMoviesLimit + MOVIE_RENDER_STEP);
  }

  useEffect(() => {
    const timerID = setTimeout(() => setIsPlaying(true), PREVIEW_DELAY);
    return () => {
      setIsPlaying(false);
      clearTimeout(timerID);
    };
  }, [activeMovie]);

  useEffect(() => {
    setRenderedMoviesLimit(MOVIE_RENDER_INITIAL_LIMIT);
  },[currentGenre]);

  return (
    <>
      <div className="catalog__films-list">
        {movies.slice(0, renderedMoviesLimit).map((movie) => (
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
      {renderedMoviesLimit < movies.length &&
      <div className="catalog__more">
        <button className="catalog__button" type="button" onClick={handleShowMoreClick}>Show more</button>
      </div>}
    </>
  );
}

MovieList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.oneOfType(
      [movieProp],
    )).isRequired,
  currentGenre: PropTypes.string.isRequired,
};

export default ConnectedMovieList;
