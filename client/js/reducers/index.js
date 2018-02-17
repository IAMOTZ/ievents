import { combineReducers } from 'redux';

import user from './authReducer';
import centers from './centerReducer';
import events from './eventReducer';
import transactions from './transactionReducer';

export default combineReducers({
  user,
  centers,
  events,
  transactions,
});
