import jwtDecode from 'jwt-decode';
import * as actionTypes from '../actions/actionTypes';

const TOKEN_NAME = 'IEVENTS_USER_TOKEN';
let previousUser;
let previousToken;
try {
  previousToken = localStorage.getItem(TOKEN_NAME);
  previousUser = jwtDecode(previousToken);
  previousUser = Object.assign({}, previousUser, { token: previousToken });
} catch (e) {}

const initialState = {
  user: previousUser || {
    name: null,
    email: null,
    role: null,
    id: null,
    token: null,
  },
  status: {
    fetching: false,
    fetched: Boolean(previousUser),
    error: false,
    addingAdmin: false,
    adminAdded: false,
    addingAdminError: false,
    changingPassword: false,
    changingPasswordResolved: false,
    changingPasswordRejected: false,
    deletingUser: false,
    deletingUserResolved: false,
    deletingUserRejected: false,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADDING_USER: {
      // Adding a user or logging in a user does thesame thing(getting the needed user information).
      // That is why they are modifying thesame status variables.
      return {
        ...state,
        status: {
          ...state.status,
          fetching: true,
          fetched: false,
          error: false,
        },
      };
    }
    case actionTypes.ADDING_USER_RESOLVED: {
      const {
        name, email, role, id,
      } = action.payload.user;
      const { token } = action.payload;
      const newUser = {
        name, email, role, id, token,
      };
      localStorage.setItem(TOKEN_NAME, newUser.token);
      return {
        ...state,
        user: newUser,
        status: {
          ...state.status,
          fetching: false,
          fetched: true,
          error: false,
        },
      };
    }
    case actionTypes.ADDING_USER_REJECTED: {
      return {
        ...state,
        status: {
          ...state.status,
          fetching: false,
          fetched: false,
          error: action.payload,
        },
      };
    }
    case actionTypes.LOGGING_USER: {
      // Adding a user or logging in a user does thesame thing(getting the needed user information).
      // That is why they are modifying thesame status variables.
      return {
        ...state,
        status: {
          ...state.status,
          fetching: true,
          fetched: false,
          error: false,
        },
      };
    }
    case actionTypes.LOGGING_USER_RESOLVED: {
      const {
        name, email, role, id,
      } = action.payload.user;
      const { token } = action.payload;
      const newUser = {
        name, email, role, id, token,
      };
      localStorage.setItem(TOKEN_NAME, newUser.token);
      return {
        ...state,
        user: newUser,
        status: {
          ...state.status,
          fetching: false,
          fetched: true,
          error: false,
        },
      };
    }
    case actionTypes.LOGGING_USER_REJECTED: {
      return {
        ...state,
        status: {
          ...state.status,
          fetching: false,
          fetched: false,
          error: action.payload,
        },
      };
    }
    case actionTypes.ADDING_ADMIN: {
      return {
        ...state,
        status: {
          ...state.status,
          addingAdmin: true,
          adminAdded: false,
          addingAdminError: false,
        },
      };
    }
    case actionTypes.ADDING_ADMIN_RESOLVED: {
      return {
        ...state,
        status: {
          ...state.status,
          addingAdmin: false,
          adminAdded: true,
          addingAdminError: false,
        },
      };
    }
    case actionTypes.ADDING_ADMIN_REJECTED: {
      return {
        ...state,
        status: {
          ...state.status,
          addingAdmin: false,
          adminAdded: false,
          addingAdminError: action.payload,
        },
      };
    }
    case actionTypes.CHANGING_PASSWORD: {
      return {
        ...state,
        status: {
          ...state.status,
          changingPassword: true,
          changingPasswordResolved: false,
          changingPasswordRejected: false,
        },
      };
    }
    case actionTypes.CHANGING_PASSWORD_RESOLVED: {
      return {
        ...state,
        status: {
          ...state.status,
          changingPassword: false,
          changingPasswordResolved: true,
          changingPasswordRejected: false,
        },
      };
    }
    case actionTypes.CHANGING_PASSWORD_REJECTRED: {
      return {
        ...state,
        status: {
          ...state.status,
          changingPassword: false,
          changingPasswordResolved: false,
          changingPasswordRejected: action.payload,
        },
      };
    }
    case actionTypes.DELETING_USER: {
      return {
        ...state,
        status: {
          ...state.status,
          deletingUser: true,
          deletingUserResolved: false,
          deletingUserRejected: false,
        },
      };
    }
    case actionTypes.DELETING_USER_RESOLVED: {
      return {
        ...state,
        status: {
          ...state.status,
          deletingUser: false,
          deletingUserResolved: true,
          deletingUserRejected: false,
        },
      };
    }
    case actionTypes.DELETING_USER_REJECTED: {
      return {
        ...state,
        status: {
          ...state.status,
          deletingUser: false,
          deletingUserResolved: false,
          deletingUserRejected: action.payload,
        },
      };
    }
    case actionTypes.CLEAR_USER_STATUS: {
      switch (action.payload) {
        case ('ERROR'): {
          return {
            ...state,
            status: {
              ...state.status,
              error: false,
              deletingUserRejected: false,
              changingPasswordRejected: false,
              addingAdminError: false,
            },
          };
        }
        case ('ADD_ADMIN'): {
          return {
            ...state,
            status: {
              ...state.status,
              addingAdmin: false,
              adminAdded: false,
              addingAdminError: false,
            },
          };
        }
        case ('CHANGING_PASSWORD'): {
          return {
            ...state,
            status: {
              ...state.status,
              changingPassword: false,
              changingPasswordResolved: false,
              changingPasswordRejected: false,
            },
          };
        }
        case ('DELETING_USER'): {
          return {
            ...state,
            status: {
              ...state.status,
              deletingUser: false,
              deletingUserResolved: false,
              deletingUserRejected: false,
            },
          };
        }
        default: {
          return {
            ...state,
            status: {
              ...state.status,
            },
          };
        }
      }
    }
    case actionTypes.CLEAR_USER: {
      localStorage.removeItem(TOKEN_NAME);
      return {
        user: {
          name: null,
          email: null,
          role: null,
          id: null,
          token: null,
        },
        status: {
          ...initialState.status,
          fetched: false,
        },
      };
    }
    default: {
      return state;
    }
  }
};
