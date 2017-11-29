import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

const app = document.getElementById('app');

ReactDOM.render(<Provider> <h1>Hello World!!</h1> </Provider>, app);
