import React from 'react';
import { useParams } from 'react-router-dom';
import SvgInjector from '../svg-injector/svg-injector';
import PropTypes from 'prop-types';

function Player({movies}) {

  const { id } = useParams();
  const { name, runTime, videoLink } = movies.find((movie) => movie.id === Number(id));

  return (
    <React.Fragment>
      <SvgInjector />
      <div className="player">
        <video src={videoLink} className="player__video" poster="img/player-poster.jpg"/>

        <button type="button" className="player__exit">Exit</button>

        <div className="player__controls">
          <div className="player__controls-row">
            <div className="player__time">
              <progress className="player__progress" value="30" max="100"/>
              <div className="player__toggler" style={{left: '30%'}}>Toggler</div>
            </div>
            <div className="player__time-value">{runTime}</div>
          </div>

          <div className="player__controls-row">
            <button type="button" className="player__play">
              <svg viewBox="0 0 19 19" width="19" height="19">
                <use xlinkHref="#play-s"/>
              </svg>
              <span>Play</span>
            </button>
            <div className="player__name">{name}</div>

            <button type="button" className="player__full-screen">
              <svg viewBox="0 0 27 27" width="27" height="27">
                <use xlinkHref="#full-screen"/>
              </svg>
              <span>Full screen</span>
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

Player.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      posterImage: PropTypes.string.isRequired,
      previewImage: PropTypes.string.isRequired,
      backgroundImage: PropTypes.string.isRequired,
      backgroundColor: PropTypes.string.isRequired,
      videoLink: PropTypes.string.isRequired,
      previewVideoLink: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
      scoresCount: PropTypes.number.isRequired,
      director: PropTypes.string.isRequired,
      starring: PropTypes.arrayOf(PropTypes.string).isRequired,
      runTime: PropTypes.number.isRequired,
      genre: PropTypes.string.isRequired,
      released: PropTypes.number.isRequired,
      isFavorite: PropTypes.bool.isRequired,
    })).isRequired,
};

export default Player;
