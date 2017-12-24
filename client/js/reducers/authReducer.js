let initialState = {
  user: {
    name: null,
    email: null,
    password: null,
    role: null,
    id: null,
    token: null,
  },
  status: {
    fetching: false,
    fetched: false,
    error: false,
    addingAdmin: false,
    adminAdded: false,
    addingAdminError: false,
  }
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_USER': {
      return {
        ...state,
        status: {
          ...state.status,
          fetching: true,
          fetched: false,
          error: false
        }
      };
    }
    case 'FETCH_USER_RESOLVED': {
      const { name, email, role, id } = action.payload.user;
      const token = action.payload.token;
      const newUser = { name, email, role, id, token };
      return {
        ...state,
        user: newUser,
        status: {
          ...state.status,
          fetching: false,
          fetched: true,
          error: false,
        }
      };
    }
    case 'FETCH_USER_REJECTED': {
      return {
        ...state,
        status: {
          ...state.status,
          fetching: false,
          fetched: false,
          error: action.payload
        }
      };
    }
    case 'LOGGING_USER': {
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
    case 'LOGGING_USER_RESOLVED': {
      const { name, email, role, id } = action.payload.user;
      const token = action.payload.token;
      const newUser = { name, email, role, id, token };
      return {
        ...state,
        user: newUser,
        status: {
          ...state.status,
          fetching: false,
          fetched: true,
          error: false,
        }
      };
    }
    case 'LOGGING_USER_REJECTED': {
      return {
        ...state,
        status: {
          ...state.status,
          fetching: false,
          fetched: false,
          error: action.payload,
        }
      };
    }
    case 'ADDING_ADMIN': {
      return {
        ...state,
        status: {
          ...state.status,
          addingAdmin: true,
          adminAdded: false,
          addingAdminError: false,
        }
      };
    }
    case 'ADDING_ADMIN_RESOLVED': {
      return {
        ...state,
        status: {
          ...state.status,
          addingAdmin: false,
          adminAdded: true,
          addingAdminError: false,
        }
      };
    }
    case 'ADDING_ADMIN_REJECTED': {
      return {
        ...state,
        status: {
          ...state.status,
          addingAdmin: false,
          adminAdded: false,
          addingAdminError: action.payload,
        }
      };
    }
    case 'CLEAR_ERROR': {
      return {
        ...state,
        status: {
          ...state.status,
          error: false,
        }
      }
    }
    case 'CLEAR_USER_STATUS': {
      switch(action.payload) {
        case('ERROR'): {
          return {
            ...state,
            status: {
              ...state.status,
              error: false,
            }
          }
        }
        case('ADD_ADMIN'): {
          return {
            ...state,
            status: {
              ...state.status,
              addingAdmin: false,
              adminAdded: false,
              addingAdminError: false,
            }
          }
        }
        default: {
          return {
            ...state,
            status: {
              ...state.status,
            }
          };
        }
      }
    }
    case 'CLEAR_USER': {
      return initialState;
    }
    default: {
      return state;
    }
  }
}
