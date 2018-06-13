import { combineReducers } from 'redux';
import {
  authReducer, addAdminReducer,
  changePasswordReducer, deleteAccountReducer,
} from './user';
import {
  fetchEventsReducer, addEventReducer,
  updateEventReducer, deleteEventReducer,
} from './event';
import {
  fetchCentersReducer, addCenterReducer,
  updateCenterReducer,
} from './center';
import {
  fetchTransactionsReducer, cancelTransactionReducer,
} from './transaction';

export default combineReducers({
  authReducer,
  addAdminReducer,
  changePasswordReducer,
  deleteAccountReducer,
  fetchEventsReducer,
  addEventReducer,
  updateEventReducer,
  deleteEventReducer,
  fetchCentersReducer,
  addCenterReducer,
  updateCenterReducer,
  fetchTransactionsReducer,
  cancelTransactionReducer,
});
