import {
  LOGIN_SUCCESS,
  //LOGIN_FAIL,
  LOGOUT,
  REGISTER_SUCCESS,
} from "../actions/types";

const initialState = {
  isAuthenticated: false,
  loading: false,
  user: null,
};

function authReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case LOGOUT:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
      };
    default:
      return state;
  }
}

export default authReducer;
