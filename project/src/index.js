import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import { movies } from './mocks/films.js';
import { reviews } from './mocks/reviews.js';

ReactDOM.render(
  <React.StrictMode>
    <App movies={movies} reviews={reviews}/>
  </React.StrictMode>,
  document.getElementById('root'));
