import React from 'react';
import PropTypes from 'prop-types';

function MovieCard({movie}) {
  const {name, moviePage, previewImage} = movie;

  return (
    <article className="small-film-card catalog__films-card">
      <div className="small-film-card__image">
        <img src={previewImage} alt={name} width="280" height="175"/>
      </div>
      <h3 className="small-film-card__title">
        <a className="small-film-card__link" href={moviePage}>{name}</a>
      </h3>
    </article>
  );
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    name: PropTypes.string.isRequired,
    moviePage: PropTypes.string.isRequired,
    previewImage: PropTypes.string.isRequired,
  }).isRequired,
};

export default MovieCard;
