import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import {Provider} from 'react-redux';
import {store} from './store/store';
import {checkAuthorization, fetchMoviesData} from './store/api-actions';

store.dispatch(checkAuthorization());
store.dispatch(fetchMoviesData());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
