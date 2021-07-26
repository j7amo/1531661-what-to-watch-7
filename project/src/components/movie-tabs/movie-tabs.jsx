import React, {useState} from 'react';
import MovieOverview from '../movie-overview/movie-overview';
import MovieDetails from '../movie-details/movie-details';
import MovieReviews from '../movie-reviews/movie-reviews';
import PropTypes from 'prop-types';
import movieProp from '../film/film.prop';
import reviewProp from '../film/review.prop';
import { getCurrentComments, getCurrentMovie } from '../../store/selectors';
import { connect } from 'react-redux';

const MovieTab = {
  OVERVIEW: 'Overview',
  DETAILS: 'Details',
  REVIEWS: 'Reviews',
};

function getComponentByCurrentTab(tab, movie, reviews) {
  switch(tab) {
    case MovieTab.OVERVIEW:
      return <MovieOverview movie={movie}/>;
    case MovieTab.DETAILS:
      return <MovieDetails movie={movie}/>;
    case MovieTab.REVIEWS:
      return <MovieReviews reviews={reviews}/>;
    default:
      break;
  }
}


function MovieTabs({currentMovie, currentComments}) {
  const [currentTab, setCurrentTab] = useState(MovieTab.OVERVIEW);

  function handleTabClick(evt) {
    evt.preventDefault();
    if (evt.target.matches('a')) {
      switch(evt.target.textContent) {
        case MovieTab.OVERVIEW:
          setCurrentTab(MovieTab.OVERVIEW);
          break;
        case MovieTab.DETAILS:
          setCurrentTab(MovieTab.DETAILS);
          break;
        case MovieTab.REVIEWS:
          setCurrentTab(MovieTab.REVIEWS);
          break;
        default:
          break;
      }
    }
  }

  return (
    <div className='film-card__desc'>
      <nav className='film-nav film-card__nav'>
        <ul className='film-nav__list' onClick={handleTabClick}>
          <li className={`film-nav__item ${currentTab === MovieTab.OVERVIEW ? 'film-nav__item--active' : ''}`}>
            <a href='#' className='film-nav__link'>Overview</a>
          </li>
          <li className={`film-nav__item ${currentTab === MovieTab.DETAILS ? 'film-nav__item--active' : ''}`}>
            <a href='#' className='film-nav__link'>Details</a>
          </li>
          <li className={`film-nav__item ${currentTab === MovieTab.REVIEWS ? 'film-nav__item--active' : ''}`}>
            <a href='#' className='film-nav__link'>Reviews</a>
          </li>
        </ul>
      </nav>
      {getComponentByCurrentTab(currentTab, currentMovie, currentComments)}
    </div>
  );
}

MovieTabs.propTypes = {
  currentMovie: PropTypes.oneOfType([movieProp]).isRequired,
  currentComments: PropTypes.arrayOf(
    PropTypes.oneOfType(
      [reviewProp],
    )),
};

const mapStateToProps = (state) => ({
  currentMovie: getCurrentMovie(state),
  currentComments: getCurrentComments(state),
});

const ConnectedMovieTabs = connect(mapStateToProps)(MovieTabs);

export default ConnectedMovieTabs;
