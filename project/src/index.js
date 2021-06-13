import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import { movies } from './mocks/films';

ReactDOM.render(
  <React.StrictMode>
    <App promoMovie={movies[19]} movies={movies}/>
  </React.StrictMode>,
  document.getElementById('root'));
