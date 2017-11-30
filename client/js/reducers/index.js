import { combineReducers } from 'redux';

import user from './authReducer';

export default combineReducers({
  user,
});
