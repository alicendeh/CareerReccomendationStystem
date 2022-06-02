import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';

const URL = process.env.REACT_APP_END_POINT_URL;

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export const _registerUser = async (userData) => {
  try {
    const res = await axios.post(`/users/CreateAccount`, userData, config);
    return {
      status: 200,
      data: res.data,
    };
  } catch (error) {
    const msg = error.code;

    if (msg === 'ERR_NETWORK') {
      return {
        status: 400,
        data: error.message + ' please try again',
      };
    } else if (msg === 'ERR_BAD_REQUEST') {
      return {
        status: 400,
        data: error.response.data.message + ' please try again',
      };
    } else {
      return {
        status: 400,
        data: 'Bad Request please try again!!',
      };
    }
  }
};

export const _LoginUser = async (userData) => {
  try {
    const res = await axios.post(`/users/login`, userData, config);
    return {
      status: 200,
      data: res.data,
    };
  } catch (error) {
    const msg = error.code;

    if (msg === 'ERR_NETWORK') {
      return {
        status: 400,
        data: error.message + ' please try again',
      };
    } else if (msg === 'ERR_BAD_REQUEST') {
      return {
        status: 400,
        data: error.response.data.message + ' please try again',
      };
    } else {
      return {
        status: 400,
        data: 'Bad Request please try again!!',
      };
    }
  }
};

export const _loadUser = async () => {
  try {
    if (localStorage.getItem('token')) {
      setAuthToken(localStorage.getItem('token'));
    }

    const res = await axios.get(`/users/LoadUser`);
    return {
      status: 200,
      data: res.data,
    };
  } catch (error) {
    console.log(error);
    const msg = error.code;

    if (msg === 'ERR_NETWORK') {
      return {
        status: 400,
        data: error.message + ' please try again',
      };
    } else if (msg === 'ERR_BAD_REQUEST') {
      return {
        status: 400,
        data: error.response.data.message + ' please try again',
      };
    } else {
      return {
        status: 400,
        data: 'Bad Request please try again!!',
      };
    }
  }
};

export const _getAllUsers = async () => {
  try {
    const res = await axios.get(`/users/allUsers`);
    return {
      status: 200,
      data: res.data,
    };
  } catch (error) {
    console.log(error);
    const msg = error.code;

    if (msg === 'ERR_NETWORK') {
      return {
        status: 400,
        data: error.message + ' please try again',
      };
    } else if (msg === 'ERR_BAD_REQUEST') {
      return {
        status: 400,
        data: error.response.data.message + ' please try again',
      };
    } else {
      return {
        status: 400,
        data: 'Bad Request please try again!!',
      };
    }
  }
};

export const _deleteUser = async (id) => {
  try {
    let res = await axios.delete(`/users/deleteAccount/${id}`);
    return {
      status: 200,
      data: res.data,
    };
  } catch (error) {
    console.log(error);
    const msg = error.code;

    if (msg === 'ERR_NETWORK') {
      return {
        status: 400,
        data: error.message + ' please try again',
      };
    } else if (msg === 'ERR_BAD_REQUEST') {
      return {
        status: 400,
        data: error.response.data.message + ' please try again',
      };
    } else {
      return {
        status: 400,
        data: 'Bad Request please try again!!',
      };
    }
  }
};

export const _editUser = async (userData) => {
  try {
    const res = await axios.put(`/users/UpdateProfile`, userData, config);
    return {
      status: 200,
      data: res.data,
    };
  } catch (error) {
    const msg = error.code;

    if (msg === 'ERR_NETWORK') {
      return {
        status: 400,
        data: error.message + ' please try again',
      };
    } else if (msg === 'ERR_BAD_REQUEST') {
      return {
        status: 400,
        data: error.response.data.message + ' please try again',
      };
    } else {
      return {
        status: 400,
        data: 'Bad Request please try again!!',
      };
    }
  }
};
