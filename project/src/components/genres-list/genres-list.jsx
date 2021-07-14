import React from 'react';
import { connect } from 'react-redux';
import { setCurrentGenre } from '../../store/action.js';
import PropTypes from 'prop-types';
import { getCurrentGenre, getUniqueGenres } from '../../store/selectors';

function GenresList(props) {

  const {currentGenre, uniqueGenres, onFilterClick} = props;

  return (
    <ul className="catalog__genres-list" onClick={onFilterClick}>
      {uniqueGenres.map((genre) => (
        <li key={genre} className={`catalog__genres-item ${currentGenre === genre ? 'catalog__genres-item--active' : ''}`}>
          <a href="#" className="catalog__genres-link">{genre}</a>
        </li>
      ))}
    </ul>
  );
}

GenresList.propTypes = {
  currentGenre: PropTypes.string,
  uniqueGenres: PropTypes.arrayOf(PropTypes.string),
  onFilterClick: PropTypes.func,
};

const mapStateToProps = (state) => ({
  currentGenre: getCurrentGenre(state),
  uniqueGenres: getUniqueGenres(state),
});

const mapDispatchToProps = (dispatch) => ({
  onFilterClick(evt) {
    evt.preventDefault();
    if (evt.target.matches('a')) {
      dispatch(setCurrentGenre(evt.target.textContent));
    }
  },
});

const ConnectedGenresList = connect(mapStateToProps, mapDispatchToProps)(GenresList);

export default ConnectedGenresList;
