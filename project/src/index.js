import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { Router } from 'react-router-dom';
import browserHistory from './browser-history';
import {checkAuthorization, fetchFavoriteMoviesData, fetchMoviesData, fetchPromoMovieData} from './store/api-actions';

store.dispatch(checkAuthorization());
store.dispatch(fetchMoviesData());
store.dispatch(fetchPromoMovieData());
store.dispatch(fetchFavoriteMoviesData());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router history={browserHistory}>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
