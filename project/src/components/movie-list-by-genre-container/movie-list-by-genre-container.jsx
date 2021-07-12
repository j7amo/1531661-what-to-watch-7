import React from 'react';
import PropTypes from 'prop-types';
import movieProp from '../film/film.prop.js';
import { connect } from 'react-redux';
import { getMoviesByGenre } from "../../store/selectors";
import ConnectedMovieList from '../movie-list/movie-list.jsx';

function MovieListByGenreContainer({moviesByGenre}) {

  return (
    <ConnectedMovieList movies={moviesByGenre}/>
  );
}

MovieListByGenreContainer.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.oneOfType(
      [movieProp],
    )).isRequired,
};

const mapStateToProps = (state) => ({
  moviesByGenre: getMoviesByGenre(state),
});

const ConnectedMovieListByGenreContainer = connect(mapStateToProps)(MovieListByGenreContainer);

export default ConnectedMovieListByGenreContainer;
