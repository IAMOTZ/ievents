import * as actions from '../../actions/eventActions';

describe('Event Actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('should dispatch SET_EVENT_TO_UPDATE', () => {
    const eventId = 10;
    expect(actions.setEventToUpdate(eventId)).toEqual({
      type: 'SET_EVENT_TO_UPDATE', payload: { eventId }
    });
  });

  it('should dispatch SET_CENTER_TO_BOOK', () => {
    const centerId = 5;
    expect(actions.setCenterToBook(centerId)).toEqual({
      type: 'SET_CENTER_TO_BOOK', payload: { centerId }
    });
  });

  describe('Get All Events', () => {
    it('should dispatch FETCHING_EVENTS_STARTED and FETCHING_EVENTS_RESOLVED', async (done) => {
      const samplePayload = { message: 'Events fetched' };
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({ response: samplePayload });
      });
      const expectedActions = ['FETCHING_EVENTS_STARTED', 'FETCHING_EVENTS_RESOLVED'];
      const expectedPayloads = [undefined, samplePayload];
      const store = mockStore({});
      await store.dispatch(actions.getAllEvents()).then(() => {
        const dispatchedActions = store.getActions();
        const actionTypes = dispatchedActions.map(action => action.type);
        const payloads = dispatchedActions.map(action => action.payload);
        expect(actionTypes).toEqual(expectedActions);
        expect(payloads).toEqual(expectedPayloads);
      });
      done();
    });

    it('should dispatch FETCHING_EVENTS_STARTED and FETCHING_EVENTS_REJECTED', async (done) => {
      const samplePayload = { message: 'there was an error' };
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.reject({ response: { data: samplePayload } });
      });
      const expectedActions = ['FETCHING_EVENTS_STARTED', 'FETCHING_EVENTS_REJECTED'];
      const expectedPayloads = [undefined, samplePayload];
      const store = mockStore({});
      await store.dispatch(actions.getAllEvents()).then(() => {
        const dispatchedActions = store.getActions();
        const actionTypes = dispatchedActions.map(action => action.type);
        const payloads = dispatchedActions.map(action => action.payload);
        expect(actionTypes).toEqual(expectedActions);
        expect(payloads).toEqual(expectedPayloads);
      });
      done();
    });
  });

  describe('Add Event', () => {
    it('should dispatch ADDING_EVENT_STARTED and ADDING_EVENT_RESOLVED', async (done) => {
      const samplePayload = { message: 'Event added' };
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({ response: samplePayload });
      });
      const expectedActions = ['ADDING_EVENT_STARTED', 'ADDING_EVENT_RESOLVED'];
      const expectedPayloads = [undefined, samplePayload];
      const store = mockStore({});
      await store.dispatch(actions.addEvent()).then(() => {
        const dispatchedActions = store.getActions();
        const actionTypes = dispatchedActions.map(action => action.type);
        const payloads = dispatchedActions.map(action => action.payload);
        expect(actionTypes).toEqual(expectedActions);
        expect(payloads).toEqual(expectedPayloads);
      });
      done();
    });

    it('should dispatch ADDING_EVENT_STARTED and ADDING_EVENT_REJECTED', async (done) => {
      const samplePayload = { message: 'there was an error' };
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.reject({ response: { data: samplePayload } });
      });
      const expectedActions = ['ADDING_EVENT_STARTED', 'ADDING_EVENT_REJECTED'];
      const expectedPayloads = [undefined, samplePayload];
      const store = mockStore({});
      await store.dispatch(actions.addEvent()).then(() => {
        const dispatchedActions = store.getActions();
        const actionTypes = dispatchedActions.map(action => action.type);
        const payloads = dispatchedActions.map(action => action.payload);
        expect(actionTypes).toEqual(expectedActions);
        expect(payloads).toEqual(expectedPayloads);
      });
      done();
    });
  });

  describe('Update Event', () => {
    it('should dispatch UPDATING_EVENT_STARTED and UPDATING_EVENT_RESOLVED', async (done) => {
      const samplePayload = { message: 'Event added' };
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({ response: samplePayload });
      });
      const expectedActions = ['UPDATING_EVENT_STARTED', 'UPDATING_EVENT_RESOLVED'];
      const expectedPayloads = [undefined, samplePayload];
      const store = mockStore({});
      await store.dispatch(actions.updateEvent()).then(() => {
        const dispatchedActions = store.getActions();
        const actionTypes = dispatchedActions.map(action => action.type);
        const payloads = dispatchedActions.map(action => action.payload);
        expect(actionTypes).toEqual(expectedActions);
        expect(payloads).toEqual(expectedPayloads);
      });
      done();
    });

    it('should dispatch UPDATING_EVENT_STARTED and UPDATING_EVENT_REJECTED', async (done) => {
      const samplePayload = { message: 'there was an error' };
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.reject({ response: { data: samplePayload } });
      });
      const expectedActions = ['UPDATING_EVENT_STARTED', 'UPDATING_EVENT_REJECTED'];
      const expectedPayloads = [undefined, samplePayload];
      const store = mockStore({});
      await store.dispatch(actions.updateEvent()).then(() => {
        const dispatchedActions = store.getActions();
        const actionTypes = dispatchedActions.map(action => action.type);
        const payloads = dispatchedActions.map(action => action.payload);
        expect(actionTypes).toEqual(expectedActions);
        expect(payloads).toEqual(expectedPayloads);
      });
      done();
    });
  });

  describe('Delete Event', () => {
    it('should dispatch DELETING_EVENT_STARTED and DELETING_EVENT_RESOLVED', async (done) => {
      const samplePayload = { message: 'Event added' };
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({ response: samplePayload });
      });
      const expectedActions = ['DELETING_EVENT_STARTED', 'DELETING_EVENT_RESOLVED'];
      const expectedPayloads = [undefined, samplePayload];
      const store = mockStore({});
      await store.dispatch(actions.deleteEvent()).then(() => {
        const dispatchedActions = store.getActions();
        const actionTypes = dispatchedActions.map(action => action.type);
        const payloads = dispatchedActions.map(action => action.payload);
        expect(actionTypes).toEqual(expectedActions);
        expect(payloads).toEqual(expectedPayloads);
      });
      done();
    });

    it('should dispatch DELETING_EVENT_STARTED and DELETING_EVENT_REJECTED', async (done) => {
      const samplePayload = { message: 'there was an error' };
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.reject({ response: { data: samplePayload } });
      });
      const expectedActions = ['DELETING_EVENT_STARTED', 'DELETING_EVENT_REJECTED'];
      const expectedPayloads = [undefined, samplePayload];
      const store = mockStore({});
      await store.dispatch(actions.deleteEvent()).then(() => {
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
