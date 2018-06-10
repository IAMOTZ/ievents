import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import reducer from './reducers';

let middlewares = [thunk];

if (process.env.NODE_ENV === 'production') {
  middlewares = [...middlewares];
} else {
  middlewares = [...middlewares, logger];
}

const middleware = applyMiddleware(...middlewares);

const store = createStore(reducer, middleware);

export default store;
