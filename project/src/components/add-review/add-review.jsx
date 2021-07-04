import React, {useEffect, useRef, useState} from 'react';
import SvgInjector from '../svg-injector/svg-injector';
import SiteLogo from '../site-logo/site-logo';
import UserBlock from '../user-block/user-block';
import {Link, useParams} from 'react-router-dom';
import PropTypes from 'prop-types';
import movieProp from '../film/film.prop.js';
import RatingStars from '../rating-stars/rating-stars';
import {createApi} from '../../services/api.js';
import {APIRoute, ToastMessages} from '../../const';
import ToastMessage from '../toast-message/toast-message';

const MIN_COMMENT_LENGTH = 50;
const MAX_COMMENT_LENGTH = 400;

const api = createApi(() => {});

function AddReview({movies, onFormSubmitClick}) {

  const [ratingStars, setRatingStars] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [submitCounter, setSubmitCounter] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);
  const [errorEncountered, setErrorEncountered] = useState('');
  const { id } = useParams();
  const { name, backgroundImage, posterImage } = movies.find((movie) => movie.id === Number(id));
  const isInitialMount = useRef(true);

  function handleRatingStarsChange(evt) {
    setRatingStars(Number(evt.target.value));
  }

  function handleReviewTextChange(evt) {
    evt.preventDefault();
    setReviewText(evt.target.value);
  }

  function handleCommentSubmit(evt) {
    evt.preventDefault();
    setSubmitCounter(submitCounter + 1);
    setIsDisabled(true);
  }

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      api.post(`${APIRoute.COMMENTS}/${id}`, {rating: ratingStars, comment: reviewText})
        .then(() => {
          setIsDisabled(false);
          onFormSubmitClick(id);
        })
        .catch(() => {
          setIsDisabled(false);
          setErrorEncountered(ToastMessages.REVIEW_ADD_ERROR);
        });
    }
  },[submitCounter]);

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
          <form action="#" className="add-review__form" onSubmit={handleCommentSubmit}>
            <div className="rating">
              <RatingStars ratingStars={ratingStars} handleRatingStarsChange={handleRatingStarsChange} isDisabled={isDisabled}/>
            </div>

            <div className="add-review__text">
              <textarea className="add-review__textarea" name="review-text" id="review-text" placeholder="Review text" onChange={handleReviewTextChange} value={reviewText} minLength={MIN_COMMENT_LENGTH} maxLength={MAX_COMMENT_LENGTH} required disabled={isDisabled}/>
              <div className="add-review__submit">
                <button className="add-review__btn" type="submit" disabled={isDisabled || ratingStars === 0 || reviewText.length < MIN_COMMENT_LENGTH || reviewText.length > MAX_COMMENT_LENGTH}>Post</button>
              </div>
            </div>
          </form>
          {errorEncountered.length > 0 && <ToastMessage message={errorEncountered}/>}
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
  onFormSubmitClick: PropTypes.func.isRequired,
};

export default AddReview;
