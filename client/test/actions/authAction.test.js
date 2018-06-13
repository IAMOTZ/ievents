import * as actions from '../../actions/authAction';

describe('Auth Actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  describe('Sign up', () => {
    it('should dispatch ADDING_USER_STARTED and ADDING_USER_RESOLVED', async (done) => {
      const samplePayload = { message: 'signup' };
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({ response: samplePayload });
      });
      const expectedActions = ['ADDING_USER_STARTED', 'ADDING_USER_RESOLVED'];
      const expectedPayloads = [undefined, samplePayload];
      const store = mockStore({});
      await store.dispatch(actions.createUser()).then(() => {
        const dispatchedActions = store.getActions();
        const actionTypes = dispatchedActions.map(action => action.type);
        const payloads = dispatchedActions.map(action => action.payload);
        expect(actionTypes).toEqual(expectedActions);
        expect(payloads).toEqual(expectedPayloads);
      });
      done();
    });

    it('should dispatch ADDING_USER_STARTED and ADDING_USER_REJECTED', async (done) => {
      const samplePayload = { message: 'there was an error' };
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.reject({ response: { data: samplePayload } });
      });
      const expectedActions = ['ADDING_USER_STARTED', 'ADDING_USER_REJECTED'];
      const expectedPayloads = [undefined, samplePayload];
      const store = mockStore({});
      await store.dispatch(actions.createUser()).then(() => {
        const dispatchedActions = store.getActions();
        const actionTypes = dispatchedActions.map(action => action.type);
        const payloads = dispatchedActions.map(action => action.payload);
        expect(actionTypes).toEqual(expectedActions);
        expect(payloads).toEqual(expectedPayloads);
      });
      done();
    });
  });

  describe('Log in', () => {
    it('should dispatch LOGGING_USER_STARTED and LOGGING_USER_RESOLVED', async (done) => {
      const samplePayload = { token: 'log in' };
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({ response: samplePayload });
      });
      const expectedActions = ['LOGGING_USER_STARTED', 'LOGGING_USER_RESOLVED'];
      const expectedPayloads = [undefined, samplePayload];
      const store = mockStore({});
      await store.dispatch(actions.loginUser()).then(() => {
        const dispatchedActions = store.getActions();
        const actionTypes = dispatchedActions.map(action => action.type);
        const payloads = dispatchedActions.map(action => action.payload);
        expect(actionTypes).toEqual(expectedActions);
        expect(payloads).toEqual(expectedPayloads);
      });
      done();
    });

    it('should dispatch LOGGING_USER_STARTED and LOGGING_USER_REJECTED', async (done) => {
      const samplePayload = { message: 'there was an error' };
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.reject({ response: { data: samplePayload } });
      });
      const expectedActions = ['LOGGING_USER_STARTED', 'LOGGING_USER_REJECTED'];
      const expectedPayloads = [undefined, samplePayload];
      const store = mockStore({});
      await store.dispatch(actions.loginUser()).then(() => {
        const dispatchedActions = store.getActions();
        const actionTypes = dispatchedActions.map(action => action.type);
        const payloads = dispatchedActions.map(action => action.payload);
        expect(actionTypes).toEqual(expectedActions);
        expect(payloads).toEqual(expectedPayloads);
      });
      done();
    });
  });

  describe('Log out', () => {
    expect(actions.logOut()).toEqual({
      type: 'LOG_OUT'
    });
  });
});
