import React, { useEffect, useRef, useState } from 'react';
import {useParams} from 'react-router-dom';
import SvgInjector from '../svg-injector/svg-injector';
import PropTypes from 'prop-types';
import movieProp from '../film/film.prop.js';
import { connect } from 'react-redux';
import { SECONDS_IN_HOUR, SECONDS_IN_MINUTE } from '../../const';
import LoadingScreen from '../loading-screen/loading-screen';

const MAX_PROGRESS_BAR_VALUE = 100;
const TIME_LOWER_LIMIT = 0;
const TIME_UPPER_LIMIT = 10;
const VIDEO_READY_STATE = 3;

const toggleFullScreen = (element) => {
  if (!element.fullscreenElement) {
    if (element.requestFullscreen) {
      element.requestFullscreen();
      element.fullscreenElement = true;
    } else if (element.webkitRequestFullScreen) {
      element.webkitRequestFullScreen();
      element.fullscreenElement = true;
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
      element.fullscreenElement = false;
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
      element.fullscreenElement = false;
    }
  }
};

const getFormattedTime = (time) => {

  const fullHours = Math.floor(- time / SECONDS_IN_HOUR);
  const fullMinutes = Math.floor((- time - fullHours * SECONDS_IN_HOUR) / SECONDS_IN_MINUTE);
  const fullSeconds = Math.floor(- time - fullHours * SECONDS_IN_HOUR - fullMinutes * SECONDS_IN_MINUTE);

  let fullHoursFormatted;
  let fullMinutesFormatted;
  let fullSecondsFormatted;

  if (fullHours > TIME_LOWER_LIMIT && fullHours < TIME_UPPER_LIMIT) {
    fullHoursFormatted = `0${fullHours}`;
  } else if (fullHours >= TIME_UPPER_LIMIT) {
    fullHoursFormatted = `${fullHours}`;
  } else {
    fullHoursFormatted = '';
  }

  if (fullMinutes >= TIME_LOWER_LIMIT && fullMinutes < TIME_UPPER_LIMIT) {
    fullMinutesFormatted = `0${fullMinutes}`;
  } else {
    fullMinutesFormatted = `${fullMinutes}`;
  }

  if (fullSeconds >= TIME_LOWER_LIMIT && fullSeconds < TIME_UPPER_LIMIT) {
    fullSecondsFormatted = `0${fullSeconds}`;
  } else {
    fullSecondsFormatted = `${fullSeconds}`;
  }

  return `- ${fullHours === TIME_LOWER_LIMIT ? '' : `${fullHoursFormatted}:`}${fullMinutesFormatted}:${fullSecondsFormatted}`;
};


function Player({movies, onExitClick}) {

  const { id } = useParams();
  const {
    name,
    videoLink,
    previewImage,
  } = movies.find((movie) => movie.id === Number(id));

  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);

  const videoRef = useRef(null);
  const containerRef = useRef(null);

  const handlePlayTimeUpdate = (evt) => {
    setCurrentProgress(MAX_PROGRESS_BAR_VALUE * evt.target.currentTime / evt.target.duration);
    setTimeRemaining(Math.round(evt.target.currentTime - evt.target.duration));
    if (currentProgress === MAX_PROGRESS_BAR_VALUE) {
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    videoRef.current.onloadeddata = () => {
      if(videoRef.current.readyState >= VIDEO_READY_STATE) {
        setIsLoading(false);
      }
    };
    videoRef.current.onplay = setIsPlaying(true);
    videoRef.current.onpause = setIsPlaying(false);

    return () => {
      if (videoRef.current) {
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
    onExitClick();
  }

  return (
    <React.Fragment>
      <SvgInjector />
      <div className="player" ref={containerRef}>
        <video ref={videoRef} src={videoLink} className="player__video" poster={previewImage} onTimeUpdate={handlePlayTimeUpdate} autoPlay/>

        <button type="button" className="player__exit" onClick={onExitButtonClick}>Exit</button>
        {isLoading && <LoadingScreen/>}
        <div className="player__controls">
          <div className="player__controls-row">
            <div className="player__time">
              <progress className="player__progress" value={currentProgress} max={MAX_PROGRESS_BAR_VALUE}/>
              <div className="player__toggler" style={{left: `${currentProgress}%`}}>Toggler</div>
            </div>
            <div className="player__time-value">{getFormattedTime(timeRemaining)}</div>
          </div>

          <div className="player__controls-row">
            <button type="button" className="player__play" disabled={isLoading} onClick={() => {setIsPlaying(!isPlaying);}}>
              {isPlaying
                ?
                <>
                  <svg viewBox="0 0 14 21" width="14" height="21">
                    <use xlinkHref="#pause"/>
                  </svg>
                  <span>Pause</span>
                </>
                :
                <>
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"/>
                  </svg>
                  <span>Play</span>
                </>}
            </button>
            <div className="player__name">{name}</div>

            <button type="button" className="player__full-screen" onClick={() => toggleFullScreen(containerRef.current)}>
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
    )),
  onExitClick: PropTypes.func,
};

const mapStateToProps = (state) => ({
  movies: state.movies.movies,
});

const ConnectedPlayer = connect(mapStateToProps)(Player);

export default ConnectedPlayer;
