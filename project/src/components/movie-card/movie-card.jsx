import React from 'react';
import PropTypes from 'prop-types';
import movieProp from '../film/film.prop.js';
import { Link } from 'react-router-dom';
import { getMovieByID } from '../../store/selectors';
import { connect } from 'react-redux';

function MovieCard(props) {

  const { movieID, movieByID, isPlaying, handleMouseOver, handleMouseLeave} = props;
  const { name, previewImage, previewVideoLink } = movieByID;

  return (
    <article className="small-film-card catalog__films-card" onMouseOver={() => handleMouseOver(movieByID)} onMouseLeave={() => handleMouseLeave()}>
      {isPlaying
        ? <Link to={`/films/${movieID}`}><video src={previewVideoLink} width="280" height="175" muted autoPlay/></Link>
        :
        <>
          <Link to={`/films/${movieID}`}>
            <div className="small-film-card__image">
              <img src={previewImage} alt={name} width="280" height="175"/>
            </div>
          </Link>
          <h3 className="small-film-card__title">
            <Link className="small-film-card__link" to={`/films/${movieID}`}>{name}</Link>
          </h3>
        </>}
    </article>
  );
}

MovieCard.propTypes = {
  movieID: PropTypes.number,
  movieByID: PropTypes.oneOfType([movieProp]),
  isPlaying: PropTypes.bool,
  handleMouseOver: PropTypes.func,
  handleMouseLeave: PropTypes.func,
};

const mapStateToProps = (state, ownProps) => {
  const { movieID } = ownProps;
  return {
    movieByID: getMovieByID(state, movieID),
  };
};

const ConnectedMovieCard = connect(mapStateToProps)(MovieCard);

export default ConnectedMovieCard;
