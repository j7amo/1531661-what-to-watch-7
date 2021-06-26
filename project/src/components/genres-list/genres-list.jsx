import React from 'react';
import {connect} from 'react-redux';
import {resetRenderedMoviesLimit, setCurrentGenre} from '../../store/action.js';
import PropTypes from 'prop-types';
import movieProp from '../film/film.prop';
import {ALL_GENRES} from '../../const';

const mapStateToProps = (state) => ({
  currentGenre: state.currentGenre,
  movies: state.movies,
});

const mapDispatchToProps = (dispatch) => ({
  onFilterClick(evt) {
    evt.preventDefault();
    if (evt.target.matches('a')) {
      dispatch(setCurrentGenre(evt.target.textContent));
      dispatch(resetRenderedMoviesLimit());
    }
  },
});

const ConnectedGenresList = connect(mapStateToProps, mapDispatchToProps)(GenresList);

const getUniqueGenres = (movies) => {
  const uniqueGenres = new Set(movies.map((movie) => movie.genre));
  return [ALL_GENRES, ...Array.from(uniqueGenres)];
};

function GenresList(props) {
  const {currentGenre, movies, onFilterClick} = props;

  return (
    <ul className="catalog__genres-list" onClick={onFilterClick}>
      {getUniqueGenres(movies).map((genre) => (
        <li key={genre} className={`catalog__genres-item ${currentGenre === genre ? 'catalog__genres-item--active' : ''}`}>
          <a href="#" className="catalog__genres-link">{genre}</a>
        </li>
      ))}
    </ul>
  );
}

GenresList.propTypes = {
  currentGenre: PropTypes.string.isRequired,
  movies: PropTypes.arrayOf(
    PropTypes.oneOfType(
      [movieProp],
    )).isRequired,
  onFilterClick: PropTypes.func.isRequired,
};

export default ConnectedGenresList;
