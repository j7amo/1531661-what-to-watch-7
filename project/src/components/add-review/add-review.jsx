import React, {useState} from 'react';
import SvgInjector from '../svg-injector/svg-injector';
import SiteLogo from '../site-logo/site-logo';
import UserBlock from '../user-block/user-block';
import {Link, useParams} from 'react-router-dom';
import PropTypes from 'prop-types';
import movieProp from '../film/film.prop.js';
import RatingStars from '../rating-stars/rating-stars';

function AddReview({movies}) {

  const [ratingStars, setRatingStars] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const { id } = useParams();
  const { name, backgroundImage, posterImage } = movies.find((movie) => movie.id === Number(id));

  function handleRatingStarsChange(e) {
    setRatingStars(Number(e.target.value));
  }

  function handleReviewTextChange(e) {
    e.preventDefault();
    setReviewText(e.target.value);
  }

  return (
    <React.Fragment>
      <SvgInjector />
      <section className="film-card film-card--full">
        <div className="film-card__header">
          <div className="film-card__bg">
            <img src={backgroundImage} alt={name}/>
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header">
            <SiteLogo />

            <nav className="breadcrumbs">
              <ul className="breadcrumbs__list">
                <li className="breadcrumbs__item">
                  <Link to={`/films/${id}`} className="breadcrumbs__link">{name}</Link>
                </li>
                <li className="breadcrumbs__item">
                  <a href='#' className="breadcrumbs__link">Add review</a>
                </li>
              </ul>
            </nav>

            <UserBlock />
          </header>

          <div className="film-card__poster film-card__poster--small">
            <img src={posterImage} alt={name} width="218" height="327"/>
          </div>
        </div>

        <div className="add-review">
          <form action="#" className="add-review__form">
            <div className="rating">
              <RatingStars ratingStars={ratingStars} handleRatingStarsChange={handleRatingStarsChange}/>
            </div>

            <div className="add-review__text">
              <textarea className="add-review__textarea" name="review-text" id="review-text" placeholder="Review text" onChange={handleReviewTextChange} value={reviewText}/>
              <div className="add-review__submit">
                <button className="add-review__btn" type="submit">Post</button>
              </div>
            </div>
          </form>
        </div>

      </section>
    </React.Fragment>
  );
}

AddReview.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.oneOfType(
      [movieProp],
    )).isRequired,
};

export default AddReview;
