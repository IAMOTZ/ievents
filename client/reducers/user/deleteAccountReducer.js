import * as actionTypes from '../../actions/actionTypes';

const initialState = {
  deletingAccountStarted: false,
  deletingAccountResolved: false,
  deletingAccountError: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.DELETING_ACCOUNT_STARTED: {
      return {
        deletingAccountStarted: true,
        deletingAccountResolved: false,
        deletingAccountError: null,
      };
    }
    case actionTypes.DELETING_ACCOUNT_RESOLVED: {
      return {
        deletingAccountStarted: false,
        deletingAccountResolved: true,
        deletingAccountError: null,
      };
    }
    case actionTypes.DELETING_ACCOUNT_REJECTED: {
      const { message } = action.payload; // Error message.
      return {
        deletingAccountStarted: false,
        deletingAccountResolved: false,
        deletingAccountError: message,
      };
    }
    case actionTypes.STOP_ASYNC_DELETING_ACCOUNT: {
      return {
        deletingAccountStarted: false,
        deletingAccountResolved: false,
        deletingAccountError: null,
      };
    }
    default: {
      return state;
    }
  }
};
