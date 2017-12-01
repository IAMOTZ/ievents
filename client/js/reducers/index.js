import { combineReducers } from 'redux';

import user from './authReducer';
import centers from './centerReducers';
import events from './eventReducer';

export default combineReducers({
  user,
  centers,
  events,
});
