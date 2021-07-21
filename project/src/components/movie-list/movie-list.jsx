import React, {useCallback, useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import MovieCard from '../movie-card/movie-card';
import movieProp from '../film/film.prop.js';
import { connect } from 'react-redux';
import { getCurrentGenre } from '../../store/selectors';

const PREVIEW_DELAY = 1000;
const MOVIE_RENDER_INITIAL_LIMIT = 8;
const MOVIE_RENDER_STEP = 8;

function MovieList({movies, currentGenre}) {
  const [activeMovieID, setActiveMovieID] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [renderedMoviesLimit, setRenderedMoviesLimit] = useState(MOVIE_RENDER_INITIAL_LIMIT);
  const isInitialMount = useRef(true);

  const handleMouseOver = useCallback((movie) => {
    setActiveMovieID(movie.id);
  },[]);

  const handleMouseLeave = useCallback(() => {
    setActiveMovieID(null);
  },[]);

  function handleShowMoreClick() {
    setRenderedMoviesLimit(renderedMoviesLimit + MOVIE_RENDER_STEP);
  }

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else if (activeMovieID) {
      const timerID = setTimeout(() => setIsPlaying(true), PREVIEW_DELAY);
      return () => {
        setIsPlaying(false);
        clearTimeout(timerID);
      };
    }
  }, [activeMovieID]);

  useEffect(() => {
    setRenderedMoviesLimit(MOVIE_RENDER_INITIAL_LIMIT);
  },[currentGenre]);

  return (
    <>
      <div className="catalog__films-list" data-testid="movie-list-catalog">
        {movies.slice(0, renderedMoviesLimit).map((movie) => (
          <MovieCard
            key={movie.id}
            movieID={movie.id}
            isPlaying={isPlaying && activeMovieID === movie.id}
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
    )),
  currentGenre: PropTypes.string,
};

const mapStateToProps = (state) => ({
  currentGenre: getCurrentGenre(state),
});

const ConnectedMovieList = connect(mapStateToProps)(MovieList);

export default ConnectedMovieList;
