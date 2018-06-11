import { fetchTransactionsReducer as reducer } from '../../../reducers/transaction';
import * as actionTypes from '../../../actions/actionTypes';

const initialState = {
  transactions: [],
  pagination: {
    limit: 12,
    offset: 0,
    currentCount: 0,
    totalcount: 0,
  },
  fetchingTransactionsStarted: false,
  fetchingTransactionsResolved: false,
  fetchingTransacitonsError: null,
};

const sampleTransactions = [
  // The real transaction object contains more attributes
  { id: 1, event: 'event1' },
  { id: 2, event: 'event2' },
  { id: 3, event: 'event3' },
  { id: 4, event: 'event4' },
];

const samplePaginationInfo = {
  limit: 12,
  offset: 20,
  currentCount: 12,
  totalCount: 32,
};

const alterInitialState = newState => ({ ...initialState, ...newState });

describe('Fetch Transaction Reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should update the state when fetching transactions starts', () => {
    expect(reducer(undefined, {
      type: actionTypes.FETCHING_TRANSACTIONS_STARTED,
    })).toEqual(alterInitialState({ fetchingTransactionsStarted: true }));
  });

  it('should update the state when fetching transactions finishes', () => {
    expect(reducer(undefined, {
      type: actionTypes.FETCHING_TRANSACTIONS_RESOLVED,
      payload: { events: sampleTransactions, paginationInfo: samplePaginationInfo },
    })).toEqual(alterInitialState({
      transactions: sampleTransactions,
      pagination: samplePaginationInfo,
      fetchingTransactionsResolved: true
    }));
  });

  it('should update the state when fetching transactions returns error', () => {
    const errorMessage = 'there was an error';
    expect(reducer(undefined, {
      type: actionTypes.FETCHING_TRANSACTIONS_REJECTED,
      payload: { message: errorMessage },
    })).toEqual(alterInitialState({ fetchingTransacitonsError: errorMessage }));
  });

  it('should reset the asynchronous process', () => {
    expect(reducer(alterInitialState({ fetchingTransactionsStarted: true }), {
      type: actionTypes.STOP_ASYNC_FETCHING_TRANSACITONS,
    })).toEqual(initialState);
  });
});

