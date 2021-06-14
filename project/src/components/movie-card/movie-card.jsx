import React from 'react';
import PropTypes from 'prop-types';
import movieProp from '../film/film.prop.js';
import {Link} from 'react-router-dom';

function MovieCard({movie, handleMouseOver}) {
  const {id, name, previewImage} = movie;

  return (
    <article className="small-film-card catalog__films-card" onMouseOver={() => handleMouseOver(movie)}>
      <Link to={`/films/${id}`}>
        <div className="small-film-card__image">
          <img src={previewImage} alt={name} width="280" height="175"/>
        </div>
      </Link>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={`/films/${id}`}>{name}</Link>
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
