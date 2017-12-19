import React from 'react';
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from 'react-router-dom';
import store from "./store";
import Routes from './Routes.jsx';

import styles from '../sass/styles.scss'; 

const app = document.getElementById('app');

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Routes />
    </Router>
  </Provider>, app
);

