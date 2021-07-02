import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import { reviews } from './mocks/reviews.js';
import {Provider} from 'react-redux';
import {store} from './store/store';
import {fetchMoviesData} from './store/api-actions';

store.dispatch(fetchMoviesData());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App reviews={reviews}/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
