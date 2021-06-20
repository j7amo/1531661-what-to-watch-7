import React from 'react';
import PropTypes from 'prop-types';
import movieProp from '../film/film.prop.js';
import {Link} from 'react-router-dom';

function MovieCard({movie, activeMovie, isPlaying, handleMouseOver, handleMouseLeave}) {
  const {id, name, previewImage} = movie;
  let previewVideoLink;

  if (activeMovie !== null && movie === activeMovie && isPlaying) {
    previewVideoLink = activeMovie.previewVideoLink;
  }

  return (
    <article className="small-film-card catalog__films-card" onMouseOver={() => handleMouseOver(movie)} onMouseLeave={() => handleMouseLeave()}>
      {previewVideoLink
        ? <Link to={`/films/${id}`}><video src={previewVideoLink} width="280" height="175" muted autoPlay/></Link>
        :
        <React.Fragment>
          <Link to={`/films/${id}`}>
            <div className="small-film-card__image">
              <img src={previewImage} alt={name} width="280" height="175"/>
            </div>
          </Link>
          <h3 className="small-film-card__title">
            <Link className="small-film-card__link" to={`/films/${id}`}>{name}</Link>
          </h3>
        </React.Fragment>}
    </article>
  );
}

MovieCard.propTypes = {
  movie: PropTypes.oneOfType([movieProp]).isRequired,
  activeMovie: PropTypes.oneOfType([movieProp]),
  isPlaying: PropTypes.bool.isRequired,
  handleMouseOver: PropTypes.func.isRequired,
  handleMouseLeave: PropTypes.func.isRequired,
};

export default MovieCard;
