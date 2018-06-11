import * as actions from '../../actions/centerActions';

describe('Auth Actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('should dispatch SET_CENTER_TO_UPDATE', () => {
    const centerId = 10;
    expect(actions.setCenterToUpdate(centerId)).toEqual({
      type: 'SET_CENTER_TO_UPDATE', payload: { centerId }
    });
  });

  it('should dispatch SET_CENTER_TO_TRANSACT', () => {
    const centerId = 5;
    expect(actions.setCenterToTransact(centerId)).toEqual({
      type: 'SET_CENTER_TO_TRANSACT', payload: { centerId }
    });
  });

  describe('Get All Centers', () => {
    it('should dispatch FETCHING_CENTERS_STARTED and FETCHING_CENTERS_RESOLVED', async (done) => {
      const samplePayload = { message: 'centers fetched' };
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({ response: samplePayload });
      });
      const expectedActions = ['FETCHING_CENTERS_STARTED', 'FETCHING_CENTERS_RESOLVED'];
      const expectedPayloads = [undefined, samplePayload];
      const store = mockStore({});
      await store.dispatch(actions.getAllCenters()).then(() => {
        const dispatchedActions = store.getActions();
        const actionTypes = dispatchedActions.map(action => action.type);
        const payloads = dispatchedActions.map(action => action.payload);
        expect(actionTypes).toEqual(expectedActions);
        expect(payloads).toEqual(expectedPayloads);
      });
      done();
    });

    it('should dispatch FETCHING_CENTERS_STARTED and FETCHING_CENTERS_REJECTED', async (done) => {
      const samplePayload = { message: 'there was an error' };
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.reject({ response: { data: samplePayload } });
      });
      const expectedActions = ['FETCHING_CENTERS_STARTED', 'FETCHING_CENTERS_REJECTED'];
      const expectedPayloads = [undefined, samplePayload];
      const store = mockStore({});
      await store.dispatch(actions.getAllCenters()).then(() => {
        const dispatchedActions = store.getActions();
        const actionTypes = dispatchedActions.map(action => action.type);
        const payloads = dispatchedActions.map(action => action.payload);
        expect(actionTypes).toEqual(expectedActions);
        expect(payloads).toEqual(expectedPayloads);
      });
      done();
    });
  });

  describe('Add Center', () => {
    it('should dispatch ADDING_CENTER_STARTED and ADDING_CENTER_RESOLVED', async (done) => {
      const samplePayload = { message: 'center added' };
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({ response: samplePayload });
      });
      const expectedActions = ['ADDING_CENTER_STARTED', 'ADDING_CENTER_RESOLVED'];
      const expectedPayloads = [undefined, samplePayload];
      const store = mockStore({});
      await store.dispatch(actions.addCenter()).then(() => {
        const dispatchedActions = store.getActions();
        const actionTypes = dispatchedActions.map(action => action.type);
        const payloads = dispatchedActions.map(action => action.payload);
        expect(actionTypes).toEqual(expectedActions);
        expect(payloads).toEqual(expectedPayloads);
      });
      done();
    });

    it('should dispatch ADDING_CENTER_STARTED and ADDING_CENTER_REJECTED', async (done) => {
      const samplePayload = { message: 'there was an error' };
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.reject({ response: { data: samplePayload } });
      });
      const expectedActions = ['ADDING_CENTER_STARTED', 'ADDING_CENTER_REJECTED'];
      const expectedPayloads = [undefined, samplePayload];
      const store = mockStore({});
      await store.dispatch(actions.addCenter()).then(() => {
        const dispatchedActions = store.getActions();
        const actionTypes = dispatchedActions.map(action => action.type);
        const payloads = dispatchedActions.map(action => action.payload);
        expect(actionTypes).toEqual(expectedActions);
        expect(payloads).toEqual(expectedPayloads);
      });
      done();
    });
  });

  describe('Update Center', () => {
    it('should dispatch UPDATING_CENTER_STARTED and UPDATING_CENTER_RESOLVED', async (done) => {
      const samplePayload = { message: 'center updated' };
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({ response: samplePayload });
      });
      const expectedActions = ['UPDATING_CENTER_STARTED', 'UPDATING_CENTER_RESOLVED'];
      const expectedPayloads = [undefined, samplePayload];
      const store = mockStore({});
      await store.dispatch(actions.updateCenter()).then(() => {
        const dispatchedActions = store.getActions();
        const actionTypes = dispatchedActions.map(action => action.type);
        const payloads = dispatchedActions.map(action => action.payload);
        expect(actionTypes).toEqual(expectedActions);
        expect(payloads).toEqual(expectedPayloads);
      });
      done();
    });

    it('should dispatch UPDATING_CENTER_STARTED and UPDATING_CENTER_REJECTED', async (done) => {
      const samplePayload = { message: 'there was an error' };
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.reject({ response: { data: samplePayload } });
      });
      const expectedActions = ['UPDATING_CENTER_STARTED', 'UPDATING_CENTER_REJECTED'];
      const expectedPayloads = [undefined, samplePayload];
      const store = mockStore({});
      await store.dispatch(actions.updateCenter()).then(() => {
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
