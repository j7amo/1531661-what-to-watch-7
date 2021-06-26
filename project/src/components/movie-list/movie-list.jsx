import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import MovieCard from '../movie-card/movie-card';
import movieProp from '../film/film.prop.js';
import {connect} from 'react-redux';
import {addRenderedMoviesLimit} from '../../store/action.js';

const PREVIEW_DELAY = 1000;

const mapStateToProps = (state) => ({
  renderedMoviesLimit: state.renderedMoviesLimit,
});

const mapDispatchToProps = (dispatch) => ({
  onMovieRenderCountLimitChange() {
    dispatch(addRenderedMoviesLimit());
  },
});

const ConnectedMovieList = connect(mapStateToProps, mapDispatchToProps)(MovieList);

function MovieList({movies, renderedMoviesLimit, onMovieRenderCountLimitChange}) {
  const [activeMovie, setActiveMovie] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  function handleMouseOver(movie) {
    setActiveMovie(movie);
  }

  function handleMouseLeave() {
    setActiveMovie(null);
  }

  function handleShowMoreClick() {
    onMovieRenderCountLimitChange();
  }

  useEffect(() => {
    const timerID = setTimeout(() => setIsPlaying(true), PREVIEW_DELAY);
    return () => {
      setIsPlaying(false);
      clearTimeout(timerID);
    };
  }, [activeMovie]);

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
  renderedMoviesLimit: PropTypes.number.isRequired,
  onMovieRenderCountLimitChange: PropTypes.func.isRequired,
};

export default ConnectedMovieList;
