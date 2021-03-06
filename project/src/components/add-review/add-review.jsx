import React, { useEffect, useRef, useState } from 'react';
import SvgInjector from '../svg-injector/svg-injector.jsx';
import SiteLogo from '../site-logo/site-logo.jsx';
import UserBlock from '../user-block/user-block.jsx';
import { Link, useParams } from 'react-router-dom';
import PropTypes, { string } from 'prop-types';
import movieProp from '../film/film.prop.js';
import RatingStars from '../rating-stars/rating-stars.jsx';
import { RequestStatus } from '../../const.js';
import ToastMessage from '../toast-message/toast-message.jsx';
import { postComment } from '../../store/api-actions.js';
import { connect } from 'react-redux';
import {clearCommentPostError} from '../../store/action.js';
import {getCommentPostRequestStatus, getCurrentMovieCommentPostError, getMovies} from '../../store/selectors';

const MIN_COMMENT_LENGTH = 50;
const MAX_COMMENT_LENGTH = 400;

function AddReview({isLoading, onPageLeave, movies, error, onFormSubmitClick}) {

  const { id } = useParams();
  const [ratingStars, setRatingStars] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { name, backgroundImage, posterImage } = movies.find((movie) => movie.id === Number(id));
  const isInitialMount = useRef(true);
  const isDisabled = isLoading === RequestStatus.LOADING || ratingStars === 0 || reviewText.length < MIN_COMMENT_LENGTH || reviewText.length > MAX_COMMENT_LENGTH;

  function handleRatingStarsChange(evt) {
    evt.preventDefault();
    setRatingStars(Number(evt.target.value));
  }

  function handleReviewTextChange(evt) {
    evt.preventDefault();
    setReviewText(evt.target.value);
  }

  function handleCommentSubmit(evt) {
    evt.preventDefault();
    setIsSubmitting(true);
  }

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else if (isSubmitting) {
      onFormSubmitClick({id, rating: ratingStars, comment: reviewText});
    }

    return () => {
      setIsSubmitting(false);
    };
  });

  useEffect(() => {
    onPageLeave();
  }, []);

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
              <RatingStars ratingStars={ratingStars} handleRatingStarsChange={handleRatingStarsChange} isDisabled={isLoading === RequestStatus.LOADING}/>
            </div>

            <div className="add-review__text">
              <textarea
                className="add-review__textarea"
                name="review-text"
                id="review-text"
                placeholder="Review text"
                onChange={handleReviewTextChange}
                value={reviewText}
                minLength={MIN_COMMENT_LENGTH}
                maxLength={MAX_COMMENT_LENGTH}
                required
                disabled={isLoading === RequestStatus.LOADING}
                data-testid="review-text"
              />
              <div className="add-review__submit">
                <button className="add-review__btn" type="submit" disabled={isDisabled}>Post</button>
              </div>
            </div>
          </form>
          {error && <ToastMessage message={error.message}/>}
        </div>

      </section>
    </React.Fragment>
  );
}

AddReview.propTypes = {
  isLoading: PropTypes.string,
  movies: PropTypes.arrayOf(
    PropTypes.oneOfType(
      [movieProp],
    )),
  error: PropTypes.oneOfType([string]),
  onFormSubmitClick: PropTypes.func,
  onPageLeave: PropTypes.func,
};

const mapStateToProps = (state) => ({
  isLoading: getCommentPostRequestStatus(state),
  movies: getMovies(state),
  error: getCurrentMovieCommentPostError(state),
});

const mapDispatchToProps = (dispatch) => ({
  onFormSubmitClick(commentData) {
    dispatch(postComment(commentData));
  },
  onPageLeave() {
    dispatch(clearCommentPostError());
  },
});

const ConnectedAddReview = connect(mapStateToProps, mapDispatchToProps)(AddReview);

export default ConnectedAddReview;
