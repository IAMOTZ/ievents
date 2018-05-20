import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Routes from './components/Routes';
/* eslint-disable no-unused-vars */
import styles from './styles/styles.scss';

const app = document.getElementById('app');

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Routes />
    </Router>
  </Provider>,
  app,
);
