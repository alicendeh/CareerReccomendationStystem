import {
  REGISTER,
  LOGIN,
  LOGOUT,
  ERROR,
  LOADING,
  LOADUSER,
} from '../ActionTypes';

export const registerUser = (userData) => {
  return {
    type: REGISTER,
    payload: userData.token,
  };
};

export const errorOccured = (data) => {
  return {
    type: ERROR,
    payload: data,
  };
};

export const loading = (val) => {
  return {
    type: LOADING,
    payload: val,
  };
};

export const loginUser = (userData) => {
  return {
    type: LOGIN,
    payload: userData.token,
  };
};

export const loadUser = (userData) => {
  return {
    type: LOADUSER,
    payload: userData,
  };
};

export const logout = () => {
  return {
    type: LOGOUT,
  };
};
