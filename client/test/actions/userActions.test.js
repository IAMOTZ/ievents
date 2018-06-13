import * as actions from '../../actions/userActions';

describe('User Actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  describe('Add Admin', () => {
    it('should dispatch ADDING_ADMIN_STARTED and ADDING_ADMIN_RESOLVED', async (done) => {
      const samplePayload = { mesage: 'Add admin' };
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({ response: samplePayload });
      });
      const expectedActions = ['ADDING_ADMIN_STARTED', 'ADDING_ADMIN_RESOLVED'];
      const expectedPayloads = [undefined, samplePayload];
      const store = mockStore({});
      await store.dispatch(actions.addAdmin()).then(() => {
        const dispatchedActions = store.getActions();
        const actionTypes = dispatchedActions.map(action => action.type);
        const payloads = dispatchedActions.map(action => action.payload);
        expect(actionTypes).toEqual(expectedActions);
        expect(payloads).toEqual(expectedPayloads);
      });
      done();
    });

    it('should dispatch ADDING_ADMIN_STARTED and ADDING_ADMIN_REJECTED', async (done) => {
      const samplePayload = { message: 'there was an error' };
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.reject({ response: { data: samplePayload } });
      });
      const expectedActions = ['ADDING_ADMIN_STARTED', 'ADDING_ADMIN_REJECTED'];
      const expectedPayloads = [undefined, samplePayload];
      const store = mockStore({});
      await store.dispatch(actions.addAdmin()).then(() => {
        const dispatchedActions = store.getActions();
        const actionTypes = dispatchedActions.map(action => action.type);
        const payloads = dispatchedActions.map(action => action.payload);
        expect(actionTypes).toEqual(expectedActions);
        expect(payloads).toEqual(expectedPayloads);
      });
      done();
    });
  });

  describe('Change Password', () => {
    it('should dispatch CHANGING_PASSWORD_STARTED and CHANGING_PASSWORD_RESOLVED', async (done) => {
      const samplePayload = { message: 'Change password' };
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({ response: samplePayload });
      });
      const expectedActions = ['CHANGING_PASSWORD_STARTED', 'CHANGING_PASSWORD_RESOLVED'];
      const expectedPayloads = [undefined, samplePayload];
      const store = mockStore({});
      await store.dispatch(actions.changePassword()).then(() => {
        const dispatchedActions = store.getActions();
        const actionTypes = dispatchedActions.map(action => action.type);
        const payloads = dispatchedActions.map(action => action.payload);
        expect(actionTypes).toEqual(expectedActions);
        expect(payloads).toEqual(expectedPayloads);
      });
      done();
    });

    it('should dispatch CHANGING_PASSWORD_STARTED and CHANGING_PASSWORD_REJECTRED', async (done) => {
      const samplePayload = { message: 'there was an error' };
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.reject({ response: { data: samplePayload } });
      });
      const expectedActions = ['CHANGING_PASSWORD_STARTED', 'CHANGING_PASSWORD_REJECTRED'];
      const expectedPayloads = [undefined, samplePayload];
      const store = mockStore({});
      await store.dispatch(actions.changePassword()).then(() => {
        const dispatchedActions = store.getActions();
        const actionTypes = dispatchedActions.map(action => action.type);
        const payloads = dispatchedActions.map(action => action.payload);
        expect(actionTypes).toEqual(expectedActions);
        expect(payloads).toEqual(expectedPayloads);
      });
      done();
    });
  });

  describe('Delete Account', () => {
    it('should dispatch DELETING_ACCOUNT_STARTED and DELETING_ACCOUNT_RESOLVED', async (done) => {
      const samplePayload = { message: 'Delete Account' };
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({ response: samplePayload });
      });
      const expectedActions = ['DELETING_ACCOUNT_STARTED', 'DELETING_ACCOUNT_RESOLVED'];
      const expectedPayloads = [undefined, samplePayload];
      const store = mockStore({});
      await store.dispatch(actions.deleteAccount()).then(() => {
        const dispatchedActions = store.getActions();
        const actionTypes = dispatchedActions.map(action => action.type);
        const payloads = dispatchedActions.map(action => action.payload);
        expect(actionTypes).toEqual(expectedActions);
        expect(payloads).toEqual(expectedPayloads);
      });
      done();
    });

    it('should dispatch DELETING_ACCOUNT_STARTED and DELETING_ACCOUNT_REJECTED', async (done) => {
      const samplePayload = { message: 'there was an error' };
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.reject({ response: { data: samplePayload } });
      });
      const expectedActions = ['DELETING_ACCOUNT_STARTED', 'DELETING_ACCOUNT_REJECTED'];
      const expectedPayloads = [undefined, samplePayload];
      const store = mockStore({});
      await store.dispatch(actions.deleteAccount()).then(() => {
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
