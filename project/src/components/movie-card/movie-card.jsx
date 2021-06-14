import React from 'react';
import PropTypes from 'prop-types';
import movieProp from '../film/film.prop.js';

function MovieCard({movie, handleMouseOver}) {
  const {id, name, previewImage} = movie;

  return (
    <article className="small-film-card catalog__films-card" onMouseOver={() => handleMouseOver(movie)}>
      <div className="small-film-card__image">
        <img src={previewImage} alt={name} width="280" height="175"/>
      </div>
      <h3 className="small-film-card__title">
        <a className="small-film-card__link" href={`/films/${id}`}>{name}</a>
      </h3>
    </article>
  );
}

MovieCard.propTypes = {
  movie: PropTypes.oneOfType(
    [movieProp],
  ).isRequired,
  handleMouseOver: PropTypes.func.isRequired,
};

export default MovieCard;
