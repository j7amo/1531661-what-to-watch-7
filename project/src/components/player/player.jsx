import React, {useEffect, useRef, useState} from 'react';
import { useParams, useHistory } from 'react-router-dom';
import SvgInjector from '../svg-injector/svg-injector';
import PropTypes from 'prop-types';
import movieProp from '../film/film.prop.js';

function Player({movies}) {

  const { id } = useParams();
  const {
    name,
    runTime,
    videoLink,
    previewImage,
  } = movies.find((movie) => movie.id === Number(id));

  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  const videoRef = useRef(null);
  const history = useHistory();

  useEffect(() => {
    videoRef.current.onloadeddata = setIsLoading(false);
    videoRef.current.onplay = setIsPlaying(true);
    videoRef.current.onpause = setIsPlaying(false);

    return () => {
      if (videoRef.current) {
        videoRef.current.onloadeddata = null;
        videoRef.current.onplay = null;
        videoRef.current.onpause = null;
        videoRef.current = null;
      }
    };
  },[videoLink]);

  useEffect(() => {
    if (isPlaying) {
      videoRef.current.play();
      return;
    }

    videoRef.current.pause();
  },[isPlaying]);

  function onExitButtonClick() {
    setIsPlaying(false);
    history.goBack();
  }

  return (
    <React.Fragment>
      <SvgInjector />
      <div className="player">
        <video ref={videoRef} src={videoLink} className="player__video" poster={previewImage}/>

        <button type="button" className="player__exit" onClick={onExitButtonClick}>Exit</button>

        <div className="player__controls">
          <div className="player__controls-row">
            <div className="player__time">
              <progress className="player__progress" value="30" max="100"/>
              <div className="player__toggler" style={{left: '30%'}}>Toggler</div>
            </div>
            <div className="player__time-value">{runTime}</div>
          </div>

          <div className="player__controls-row">
            <button type="button" className="player__play" disabled={isLoading} onClick={() => {setIsPlaying(!isPlaying);}}>
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
    PropTypes.oneOfType(
      [movieProp],
    )).isRequired,
};

export default Player;
