import reducer from '../centerReducer';
import * as actionTypes from '../../actions/actionTypes';

// The center object contains more details that this but
// I am just using the id and name as they are enough for the testing.
const sampleCenters = [
  { id: 1, name: 'center1' },
  { id: 2, name: 'center2' },
  { id: 3, name: 'center2' },
  { id: 4, name: 'center4' },
];

const errorMessage = 'there was an error';

const initialState = {
  centers: [],
  modalContent: null,
  toEdit: null,
  toBook: null,
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
  },
};
const alterInitialState = (newCenters, newStatus, modalContent, toEdit, toBook) => ({
  centers: [...initialState.centers, ...newCenters],
  status: { ...initialState.status, ...newStatus },
  modalContent: modalContent || null,
  toBook: toBook || null,
  toEdit: toEdit || null,
});

describe('Center Reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  describe('Fetching centers', () => {
    it('should update the fetching status to true', () => {
      expect(reducer(undefined, {
        type: actionTypes.FETCHING_CENTERS,
      })).toEqual(alterInitialState([], { fetching: true }));
    });
    it('should update the centers array', () => {
      expect(reducer(undefined, {
        type: actionTypes.FETCHING_CENTERS_RESOLVED,
        payload: { centers: sampleCenters },
      })).toEqual(alterInitialState(sampleCenters, { fetched: true }));
    });
    it('should update the fetchingError status with some error message', () => {
      expect(reducer(undefined, {
        type: actionTypes.FETCHING_CENTERS_REJECTED,
        payload: errorMessage,
      })).toEqual(alterInitialState([], { fetchingError: errorMessage }));
    });
  });

  describe('Adding a center', () => {
    it('should update the adding status to true', () => {
      expect(reducer(undefined, {
        type: actionTypes.ADDING_CENTER,
      })).toEqual(alterInitialState([], { adding: true }));
    });
    it('should update the added status to true', () => {
      expect(reducer(undefined, {
        type: actionTypes.ADDING_CENTER_RESOLVED,
      })).toEqual(alterInitialState([], { added: true }));
    });
    it('should update the addingError status with some error message', () => {
      expect(reducer(undefined, {
        type: actionTypes.ADDING_CENTER_REJECTED,
        payload: errorMessage,
      })).toEqual(alterInitialState([], { addingError: errorMessage }));
    });
  });

  describe('Updating a center', () => {
    it('should update the updating status to true', () => {
      expect(reducer(undefined, {
        type: actionTypes.UPDATING_CENTER,
      })).toEqual(alterInitialState([], { updating: true }));
    });
    it('should update the updated status to true', () => {
      expect(reducer(undefined, {
        type: actionTypes.UPDATING_CENTER_RESOLVED,
      })).toEqual(alterInitialState([], { updated: true }));
    });
    it('should update the updatingError status with some error message', () => {
      expect(reducer(undefined, {
        type: actionTypes.UPDATING_CENTER_REJECTED,
        payload: errorMessage,
      })).toEqual(alterInitialState([], { updatingError: errorMessage }));
    });
  });

  describe('Editing a center', () => {
    it('should update the state with a center to edit', () => {
      const center = sampleCenters[0];
      expect(reducer(alterInitialState(sampleCenters, { fetched: true }), {
        type: actionTypes.INITIALIZE_EDIT,
        payload: center.id,
      })).toEqual(alterInitialState(sampleCenters, { fetched: true }, null, center));
    });
  });

  it('should update the state with a center to book', () => {
    const centerId = 1;
    expect(reducer(undefined, {
      type: actionTypes.BOOK,
      payload: centerId,
    })).toEqual(alterInitialState([], {}, null, null, 1));
  });
  it('should update the state with the details of a center modal', () => {
    const modalContent = sampleCenters[0];
    const centerId = sampleCenters[0].id;
    expect(reducer(alterInitialState(sampleCenters, { fetched: true }), {
      type: actionTypes.SHOW_CENTER_MODAL,
      payload: centerId,
    })).toEqual(alterInitialState(sampleCenters, { fetched: true }, modalContent));
  });
  it('should clear all center status', () => {
    expect(reducer(alterInitialState(sampleCenters, { fetched: true, adding: true }), {
      type: actionTypes.CLEAR_CENTER_STATUS,
      payload: 'ALL',
    })).toEqual(alterInitialState(sampleCenters));
  });
});
