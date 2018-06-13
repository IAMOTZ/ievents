import * as actions from '../../actions/transactionActions';

describe('Transaction Actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  describe('Get Transactions', () => {
    it('should dispatch FETCHING_TRANSACTIONS_STARTED and FETCHING_TRANSACTIONS_RESOLVED', async (done) => {
      const samplePayload = { message: 'Transactions fetched' };
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({ response: samplePayload });
      });
      const expectedActions = ['FETCHING_TRANSACTIONS_STARTED', 'FETCHING_TRANSACTIONS_RESOLVED'];
      const expectedPayloads = [undefined, samplePayload];
      const store = mockStore({});
      await store.dispatch(actions.getAllTransactions()).then(() => {
        const dispatchedActions = store.getActions();
        const actionTypes = dispatchedActions.map(action => action.type);
        const payloads = dispatchedActions.map(action => action.payload);
        expect(actionTypes).toEqual(expectedActions);
        expect(payloads).toEqual(expectedPayloads);
      });
      done();
    });

    it('should dispatch FETCHING_TRANSACTIONS_STARTED and FETCHING_TRANSACTIONS_REJECTED', async (done) => {
      const samplePayload = { message: 'there was an error' };
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.reject({ response: { data: samplePayload } });
      });
      const expectedActions = ['FETCHING_TRANSACTIONS_STARTED', 'FETCHING_TRANSACTIONS_REJECTED'];
      const expectedPayloads = [undefined, samplePayload];
      const store = mockStore({});
      await store.dispatch(actions.getAllTransactions()).then(() => {
        const dispatchedActions = store.getActions();
        const actionTypes = dispatchedActions.map(action => action.type);
        const payloads = dispatchedActions.map(action => action.payload);
        expect(actionTypes).toEqual(expectedActions);
        expect(payloads).toEqual(expectedPayloads);
      });
      done();
    });
  });

  describe('Cancel Transaction', () => {
    it('should dispatch CANCELING_TRANSACTION_STARTED and CANCELING_TRANSACTION_RESOLVED', async (done) => {
      const samplePayload = { message: 'Transaction Canceled' };
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({ response: samplePayload });
      });
      const expectedActions = ['CANCELING_TRANSACTION_STARTED', 'CANCELING_TRANSACTION_RESOLVED'];
      const expectedPayloads = [undefined, samplePayload];
      const store = mockStore({});
      await store.dispatch(actions.cancelTransaction()).then(() => {
        const dispatchedActions = store.getActions();
        const actionTypes = dispatchedActions.map(action => action.type);
        const payloads = dispatchedActions.map(action => action.payload);
        expect(actionTypes).toEqual(expectedActions);
        expect(payloads).toEqual(expectedPayloads);
      });
      done();
    });

    it('should dispatch CANCELING_TRANSACTION_STARTED and CANCELING_TRANSACTION_REJECTED', async (done) => {
      const samplePayload = { message: 'there was an error' };
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.reject({ response: { data: samplePayload } });
      });
      const expectedActions = ['CANCELING_TRANSACTION_STARTED', 'CANCELING_TRANSACTION_REJECTED'];
      const expectedPayloads = [undefined, samplePayload];
      const store = mockStore({});
      await store.dispatch(actions.cancelTransaction()).then(() => {
        const dispatchedActions = store.getActions();
        const actionTypes = dispatchedActions.map(action => action.type);
        const payloads = dispatchedActions.map(action => action.payload);
        expect(actionTypes).toEqual(expectedActions);
        expect(payloads).toEqual(expectedPayloads);
      });
      done();
    });
  });
});
