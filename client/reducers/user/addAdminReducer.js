import * as actionTypes from '../../actions/actionTypes';

const initialState = {
  addingAdminStarted: false,
  addingAdminResolved: false,
  addingAdminError: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADDING_ADMIN_STARTED: {
      return {
        addingAdminStarted: true,
        addingAdminResolved: false,
        addingAdminError: null,
      };
    }
    case actionTypes.ADDING_ADMIN_RESOLVED: {
      return {
        addingAdminStarted: false,
        addingAdminResolved: true,
        addingAdminError: null,
      };
    }
    case actionTypes.ADDING_ADMIN_REJECTED: {
      const { message } = action.payload; // Error message.
      return {
        addingAdminStarted: false,
        addingAdminResolved: false,
        addingAdminError: message,
      };
    }
    case actionTypes.STOP_ASYNC_ADDING_ADMIN: {
      return {
        addingAdminStarted: false,
        addingAdminResolved: false,
        addingAdminError: null,
      };
    }
    default: {
      return state;
    }
  }
};
