let initialState = {
  events: [],
  status: {
    fetching: false,
    fetched: false,
    fetchingError: false,
    adding: false, 
    added: false,
    addingError: false,
    deleting: false,
    daleted: false,
    deletingError: false,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'FETCHING_EVENTS': {
      return {
        ...state,
        status: {
          ...state.status,
          fetching: true,
          fetched: false,
          error: false
        }
      }
    }
    case 'FETCHING_EVENTS_RESOLVED': {
      const { events } = action.payload;
      return {
        ...state,
        events: events,
        status: {
          ...state.status,
          fetching: false,
          fetched: true,
        },
      }
    }
    case 'FETCHING_EVENTS_REJECTED': {
      return {
        ...state,
        status: {
          ...state.status,
          fetching: false,
          error: action.payload,
        },
      };
    }
    case 'ADDDING_EVENT': {
      return {
        ...state,
        status: {
          ...state.status,
          adding: true,
          added: false,
          addingError: false
        },
      };
    }
    case 'ADDING_EVENT_RESOLVED': {
      const { title, description, date, center } = action.payload.event;
      const newEvent = { title, description, date, center };
      return {
        ...state,
        events: [...state.events, newEvent],
        status: {
          ...state.status,
          adding: false,
          added: true,
          addingError: false,
        },
      };
    }
    case 'ADDING_EVENT_REJECTED': {
      return {
        ...state,
        status: {
          ...state.status,
          adding: false,
          added: false,
          addingError: action.payload,
        },
      };
    }
    case 'DELETING_EVENT': {
      return {
        ...state,
        status: {
          ...state.status,
          deleting: true,
          deleted: false,
          deletingError: false,
        },
      };
    }
    case 'DELETING_EVENT_RESOLVED': {
      return {
        ...state,
        status: {
          ...state.status,
          deleting: false,
          deleted: true,
          deletingError: false,
        } 
      }
    }
    case 'DELETING_EVENT_REJECTED': {
      return {
        ...state,
        status: {
          ...state.status,
          deleting: false,
          deleted: false,
          deletingError: action.payload,
        }
      }
    }
    case 'CLEAR_STATUS': {
      return {
        ...state,
        status: initialState.status,
      }
    }
    default: {
      return state;
    }
  }
}