import {
  REGISTER,
  LOGIN,
  LOGOUT,
  ERROR,
  LOADING,
  LOADUSER,
} from '../ActionTypes';

const initialState = {
  isAuthenticated: null,
  loading: false,
  user: null,
  error: null,
};
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    default:
      return state;
    case LOADING:
      return {
        loading: payload,
      };
    case REGISTER:
    case LOGIN:
      localStorage.setItem('token', payload);
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        error: null,
      };

    case ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case LOADUSER:
      return {
        ...state,
        user: payload,
        error: null,
        loading: false,
      };
    case LOGOUT:
      localStorage.removeItem('token');
      return {
        isAuthenticated: null,
        loading: false,
        user: null,
        error: null,
      };
  }
}
