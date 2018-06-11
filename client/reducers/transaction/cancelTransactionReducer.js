import * as actionTypes from '../../actions/actionTypes';

const initialState = {
  cancelingTransactionStarted: false,
  cancelingTransactionResolved: false,
  cancelingTransactionError: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CANCELING_TRANSACTION_STARTED: {
      return {
        cancelingTransactionStarted: true,
        cancelingTransactionResolved: false,
        cancelingTransactionError: null,
      };
    }
    case actionTypes.CANCELING_TRANSACTION_RESOLVED: {
      return {
        cancelingTransactionStarted: false,
        cancelingTransactionResolved: true,
        cancelingTransactionError: null,
      };
    }
    case actionTypes.CANCELING_TRANSACTION_REJECTED: {
      const { message } = action.payload; // Error message.
      return {
        cancelingTransactionStarted: false,
        cancelingTransactionResolved: false,
        cancelingTransactionError: message,
      };
    }
    case actionTypes.STOP_ASYNC_CANCELING_TRANSACTION: {
      return {
        cancelingTransactionStarted: false,
        cancelingTransactionResolved: false,
        cancelingTransactionError: null,
      };
    }
    default: {
      return state;
    }
  }
};
