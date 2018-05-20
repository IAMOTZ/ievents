import reducer from '../transactionReducer';
import * as actionTypes from '../../actions/actionTypes';

const sampleTransactions = [
  { id: 1, name: 'center1', transactions: [] },
  { id: 2, name: 'center2', transactions: [] },
  { id: 3, name: 'center3', transactions: [] },
  { id: 4, name: 'center4', transactions: [] },
];

const errorMessage = 'there was an error';

const initialState = {
  centers: [],
  status: {
    fetching: false,
    fetched: false,
    fetchingError: false,
    deleting: false,
    deleted: false,
    deletingError: false,
  },
};
const alterInitialState = (newCenters, newStatus) => ({
  centers: [...initialState.centers, ...newCenters],
  status: { ...initialState.status, ...newStatus },
});

describe('Transaction Reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  describe('Fetching Transactions', () => {
    it('should update the fetching status to true', () => {
      expect(reducer(undefined, {
        type: actionTypes.FETCHING_TRANSACTIONS,
      })).toEqual(alterInitialState([], { fetching: true }));
    });
    it('should update the centers array and the fetched status', () => {
      expect(reducer(undefined, {
        type: actionTypes.FETCHING_TRANSACTIONS_RESOLVED,
        payload: sampleTransactions,
      })).toEqual(alterInitialState(sampleTransactions, { fetched: true }));
    });
    it('should update the fetchingError status with some error message', () => {
      expect(reducer(undefined, {
        type: actionTypes.FETCHING_TRANSACTIONS_REJECTED,
        payload: errorMessage,
      })).toEqual(alterInitialState([], { fetchingError: errorMessage }));
    });
  });

  describe('Deleting Transactions', () => {
    it('should update the deleting status to true', () => {
      expect(reducer(undefined, {
        type: actionTypes.DELETING_TRANSACTION,
      })).toEqual(alterInitialState([], { deleting: true }));
    });
    it('should update the deleted status to true', () => {
      expect(reducer(undefined, {
        type: actionTypes.DELETING_TRANSACTION_RESOLVED,
      })).toEqual(alterInitialState([], { deleted: true }));
    });
    it('should update the deletingError status with some error message', () => {
      expect(reducer(undefined, {
        type: actionTypes.DELETING_TRANSACTION_REJECTED,
        payload: errorMessage,
      })).toEqual(alterInitialState([], { deletingError: errorMessage }));
    });
  });

  describe('Clearing part or all of the state', () => {
    it('should clear all transaction status', () => {
      expect(reducer(alterInitialState([], { fetched: true, deleted: true }), {
        type: actionTypes.CLEAR_TRANSACTION_STATUS,
        payload: 'ALL',
      })).toEqual(alterInitialState([]));
    });
    it('should not clear any status', () => {
      expect(reducer(alterInitialState(sampleTransactions, { fetched: true }), {
        type: actionTypes.CLEAR_TRANSACTION_STATUS,
        payload: '',
      })).toEqual(alterInitialState(sampleTransactions, { fetched: true }));
    });
  });
});
