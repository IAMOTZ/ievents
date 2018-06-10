import * as actionTypes from '../../actions/actionTypes';

const initialState = {
  transactions: [],
  fetchingTransactionsStarted: false,
  fetchingTransactionsResolved: false,
  fetchingTransacitonsError: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCHING_TRANSACTIONS_STARTED: {
      return {
        ...state,
        fetchingTransactionsStarted: true,
        fetchingTransactionsResolved: false,
        fetchingTransacitonsError: null,
      };
    }
    case actionTypes.FETCHING_TRANSACTIONS_RESOLVED: {
      const { events } = action.payload;
      return {
        ...state,
        transactions: events,
        fetchingTransactionsStarted: false,
        fetchingTransactionsResolved: true,
        fetchingTransacitonsError: null,
      };
    }
    case actionTypes.FETCHING_TRANSACTIONS_REJECTED: {
      const { message } = action.payload; // Error message;
      return {
        ...state,
        fetchingTransactionsStarted: false,
        fetchingTransactionsResolved: false,
        fetchingTransacitonsError: message,
      };
    }
    case actionTypes.STOP_ASYNC_FETCHING_TRANSACITONS: {
      return {
        ...state,
        fetchingTransactionsStarted: false,
        fetchingTransactionsResolved: false,
        fetchingTransacitonsError: null,
      };
    }
    default: {
      return state;
    }
  }
};
