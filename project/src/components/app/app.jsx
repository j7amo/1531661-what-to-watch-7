import React from 'react';
import MainPage from '../main-page/main-page';
import PropTypes from 'prop-types';

function App({promoMovie, movies}) {
  return (
    <MainPage promoMovie={promoMovie} movies={movies}/>
  );
}

App.propTypes = {
  promoMovie: PropTypes.shape({
    name: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    background: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
  }).isRequired,
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      moviePage: PropTypes.string.isRequired,
      previewImage: PropTypes.string.isRequired,
    })).isRequired,
};

export default App;
