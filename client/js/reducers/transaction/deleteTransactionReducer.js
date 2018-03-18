import * as actionTypes from '../../actions/actionTypes';

const initialState = {
  deletingTransactionStarted: false,
  deletingTransactionResolved: false,
  deletingTransactionError: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.DELETING_TRANSACTION_STARTED: {
      return {
        deletingTransactionStarted: true,
        deletingTransactionResolved: false,
        deletingTransactionError: null,
      };
    }
    case actionTypes.DELETING_TRANSACTION_RESOLVED: {
      return {
        deletingTransactionStarted: false,
        deletingTransactionResolved: true,
        deletingTransactionError: null,
      };
    }
    case actionTypes.DELETING_TRANSACTION_REJECTED: {
      const { message } = action.payload; // Error message.
      return {
        deletingTransactionStarted: false,
        deletingTransactionResolved: false,
        deletingTransactionError: message,
      };
    }
    case actionTypes.STOP_ASYNC_DELETING_TRANSACTION: {
      return {
        deletingTransactionStarted: false,
        deletingTransactionResolved: false,
        deletingTransactionError: null,
      };
    }
    default: {
      return state;
    }
  }
};
