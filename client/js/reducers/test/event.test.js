import reducer from '../eventReducer';
import * as actionTypes from '../../actions/actionTypes';

const sampleEvents = [
  { id: 1, title: 'event1' },
  { id: 2, title: 'event2' },
  { id: 3, title: 'event3' },
  { id: 4, title: 'event4' },
];

const errorMessage = 'there was an error';

const initialState = {
  events: [],
  toEdit: null,
  status: {
    fetching: false,
    fetched: false,
    fetchingError: false,
    adding: false,
    added: false,
    addingError: false,
    updating: false,
    updated: false,
    updatingError: false,
    deleting: false,
    deleted: false,
    deletingError: false,
  },
};
const alterInitialState = (newEvents, newStatus, toEdit) => ({
  events: [...initialState.events, ...newEvents],
  status: { ...initialState.status, ...newStatus },
  toEdit: toEdit || null,
});

describe('Event Reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  describe('Fetching Events', () => {
    it('should update the fetching status to true', () => {
      expect(reducer(undefined, {
        type: actionTypes.FETCHING_EVENTS,
      })).toEqual(alterInitialState([], { fetching: true }));
    });
    it('should update the events array and the fetched status', () => {
      expect(reducer(undefined, {
        type: actionTypes.FETCHING_EVENTS_RESOLVED,
        payload: { events: sampleEvents },
      })).toEqual(alterInitialState(sampleEvents, { fetched: true }));
    });
    it('should update the fetchingError status with some error message', () => {
      expect(reducer(undefined, {
        type: actionTypes.FETCHING_EVENTS_REJECTED,
        payload: errorMessage,
      })).toEqual(alterInitialState([], { fetchingError: errorMessage }));
    });
  });

  describe('Adding Event', () => {
    it('should update the adding status to true', () => {
      expect(reducer(undefined, {
        type: actionTypes.ADDING_EVENT,
      })).toEqual(alterInitialState([], { adding: true }));
    });
    it('should update the added status to true', () => {
      expect(reducer(undefined, {
        type: actionTypes.ADDING_EVENT_RESOLVED,
      })).toEqual(alterInitialState([], { added: true }));
    });
    it('should update the addingError status with some error message', () => {
      expect(reducer(undefined, {
        type: actionTypes.ADDING_EVENT_REJECTED,
        payload: errorMessage,
      })).toEqual(alterInitialState([], { addingError: errorMessage }));
    });
  });

  describe('Updating Event', () => {
    it('should update the updating status to true', () => {
      expect(reducer(undefined, {
        type: actionTypes.UPDATING_EVENT,
      })).toEqual(alterInitialState([], { updating: true }));
    });
    it('should update the updated status to true', () => {
      expect(reducer(undefined, {
        type: actionTypes.UPDATING_EVENT_RESOLVED,
      })).toEqual(alterInitialState([], { updated: true }));
    });
    it('should update the updatingError status with some error message', () => {
      expect(reducer(undefined, {
        type: actionTypes.UPDATING_EVENT_REJECTED,
        payload: errorMessage,
      })).toEqual(alterInitialState([], { updatingError: errorMessage }));
    });
  });

  describe('Editing an Event', () => {
    it('should update the state with an event to edit', () => {
      const event = sampleEvents[0];
      expect(reducer(alterInitialState(sampleEvents, { fetched: true }), {
        type: actionTypes.INITIALIZE_EDIT,
        payload: event.id,
      })).toEqual(alterInitialState(sampleEvents, { fetched: true }, event));
    });
  });

  describe('Deleting Event', () => {
    it('should update the deleting status to true', () => {
      expect(reducer(undefined, {
        type: actionTypes.DELETING_EVENT,
      })).toEqual(alterInitialState([], { deleting: true }));
    });
    it('should update the deleted status to true', () => {
      expect(reducer(undefined, {
        type: actionTypes.DELETING_EVENT_RESOLVED,
      })).toEqual(alterInitialState([], { deleted: true }));
    });
    it('should update the deletingError status with some error message', () => {
      expect(reducer(undefined, {
        type: actionTypes.DELETING_EVENT_REJECTED,
        payload: errorMessage,
      })).toEqual(alterInitialState([], { deletingError: errorMessage }));
    });
  });

  describe('Clearing part or all of the state', () => {
    it('should clear all event status', () => {
      expect(reducer(alterInitialState(sampleEvents, { fetched: true, adding: true }), {
        type: actionTypes.CLEAR_EVENT_STATUS,
        payload: 'ALL',
      })).toEqual(alterInitialState(sampleEvents));
    });
    it('should clear any of the deleting event status', () => {
      expect(reducer(alterInitialState(sampleEvents, { fetched: true, deleted: true }), {
        type: actionTypes.CLEAR_EVENT_STATUS,
        payload: 'DELETE',
      })).toEqual(alterInitialState(sampleEvents, { fetched: true }));
    });
    it('should reinitialize the event state', () => {
      expect(reducer(alterInitialState(sampleEvents), {
        type: actionTypes.CLEAR_USER,
      })).toEqual(initialState);
    });
  });
});
