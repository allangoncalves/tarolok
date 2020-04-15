// import pages
import * as Sentry from '@sentry/browser';
import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';

import store from '../js/store/index';
import { getBucket } from './actions';

import './bootstrap-includes';
import '../sass/style.scss';

import App from './App';

window.store = store;
window.getBucket = getBucket;

Sentry.init({
  dsn: window.SENTRY_DSN,
  release: window.COMMIT_SHA,
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('react-app')
);
