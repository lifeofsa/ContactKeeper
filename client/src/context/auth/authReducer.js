import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  AUTH_ERROR,
  CLEAR_ERRORS,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case REGISTER_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case REGISTER_FAIL:
      localStorage.removeItem('token');
      return {
        user: null,
        isAuthenticated: false,
        loading: false,
        token: null,
        error: action.payload,
      };
    case AUTH_ERROR:
      localStorage.removeItem('token');
      return {
        isAuthenticated: false,
        loading: false,
        user: null,
        token: null,
        error: action.payload,
      };
    case LOGIN_FAIL:
      localStorage.removeItem('token');
      return {
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: action.payload,
      };
    case LOGOUT:
      localStorage.removeItem('token');
      return {
        user: null,
        isAuthenticated: false,
        loading: false,
        error: action.payload,
        token: null,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
