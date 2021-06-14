import React from 'react';
import SvgInjector from '../svg-injector/svg-injector';
import SiteLogo from '../site-logo/site-logo';
import UserBlock from '../user-block/user-block';
import {Link, useParams} from 'react-router-dom';
import PropTypes from 'prop-types';
import movieProp from '../film/film.prop.js';

function AddReview({movies}) {

  const { id } = useParams();
  const { name, backgroundImage, posterImage } = movies.find((movie) => movie.id === Number(id));

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
                  <Link to={`/films/${id}/review`} className="breadcrumbs__link">Add review</Link>
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
              <div className="rating__stars">
                <input className="rating__input" id="star-10" type="radio" name="rating" value="10"/>
                <label className="rating__label" htmlFor="star-10">Rating 10</label>

                <input className="rating__input" id="star-9" type="radio" name="rating" value="9"/>
                <label className="rating__label" htmlFor="star-9">Rating 9</label>

                <input className="rating__input" id="star-8" type="radio" name="rating" value="8" checked/>
                <label className="rating__label" htmlFor="star-8">Rating 8</label>

                <input className="rating__input" id="star-7" type="radio" name="rating" value="7"/>
                <label className="rating__label" htmlFor="star-7">Rating 7</label>

                <input className="rating__input" id="star-6" type="radio" name="rating" value="6"/>
                <label className="rating__label" htmlFor="star-6">Rating 6</label>

                <input className="rating__input" id="star-5" type="radio" name="rating" value="5"/>
                <label className="rating__label" htmlFor="star-5">Rating 5</label>

                <input className="rating__input" id="star-4" type="radio" name="rating" value="4"/>
                <label className="rating__label" htmlFor="star-4">Rating 4</label>

                <input className="rating__input" id="star-3" type="radio" name="rating" value="3"/>
                <label className="rating__label" htmlFor="star-3">Rating 3</label>

                <input className="rating__input" id="star-2" type="radio" name="rating" value="2"/>
                <label className="rating__label" htmlFor="star-2">Rating 2</label>

                <input className="rating__input" id="star-1" type="radio" name="rating" value="1"/>
                <label className="rating__label" htmlFor="star-1">Rating 1</label>
              </div>
            </div>

            <div className="add-review__text">
              <textarea className="add-review__textarea" name="review-text" id="review-text" placeholder="Review text"/>
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
