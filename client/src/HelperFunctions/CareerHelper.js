import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import { createCareer } from '../redux/actions/careerAction';

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

export const _getAllCareers = async () => {
  try {
    const res = await axios.get(`/career/allCareers`);
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

export const _getCommentPerCareer = async (id) => {
  try {
    let res = await axios.get(`/comment/allComments/${id}`);
    return {
      status: 200,
      data: res.data,
    };
  } catch (error) {
    const msg = error.code;

    if (msg === 'ERR_NETWORK') {
      return {
        status: 400,
        data: error.message + ' unable to fetch comments please try again',
      };
    } else if (msg === 'ERR_BAD_REQUEST') {
      return {
        status: 400,
        data:
          error.response.data.message +
          ' unable to fetch comments  please try again',
      };
    } else {
      return {
        status: 400,
        data: 'Bad Request please try again!!',
      };
    }
  }
};

export const _newComment = async (careerID, body) => {
  try {
    let res = await axios.post(`/comment/createComment/${careerID}`, {
      body: body,
    });

    return {
      status: 200,
      data: res.data,
    };
  } catch (error) {
    const msg = error.code;

    if (msg === 'ERR_NETWORK') {
      return {
        status: 400,
        data: error.message + ' unable to fetch comments please try again',
      };
    } else if (msg === 'ERR_BAD_REQUEST') {
      return {
        status: 400,
        data:
          error.response.data.message +
          ' unable to fetch comments  please try again',
      };
    } else {
      return {
        status: 400,
        data: 'Bad Request please try again!!',
      };
    }
  }
};

export const _likeItem = async (careerID) => {
  try {
    let res = await axios.put(`/career/UpdateCareer/${careerID}`, {
      likes: 1,
    });
    return {
      status: 200,
      data: res.data,
    };
  } catch (error) {
    const msg = error.code;

    if (msg === 'ERR_NETWORK') {
      return {
        status: 400,
        data: error.message + ' unable to like comments please try again',
      };
    } else if (msg === 'ERR_BAD_REQUEST') {
      return {
        status: 400,
        data:
          error.response.data.message +
          ' unable to like comments  please try again',
      };
    } else {
      return {
        status: 400,
        data: 'Bad Request please try again!!',
      };
    }
  }
};

export const _bookmarkItem = async (careerID) => {
  try {
    let res = await axios.put(`/users/UpdateProfile`, {
      bookmarks: [careerID],
    });
    return {
      status: 200,
      data: res.data,
    };
  } catch (error) {
    const msg = error.code;

    if (msg === 'ERR_NETWORK') {
      return {
        status: 400,
        data: error.message + ' unable to like comments please try again',
      };
    } else if (msg === 'ERR_BAD_REQUEST') {
      return {
        status: 400,
        data:
          error.response.data.message +
          ' unable to like comments  please try again',
      };
    } else {
      return {
        status: 400,
        data: 'Bad Request please try again!!',
      };
    }
  }
};

export const _getCommentPerUser = async (id) => {
  try {
    let res = await axios.get(`/comment/allComments/myComment/${id}`);
    return {
      status: 200,
      data: res.data,
    };
  } catch (error) {
    const msg = error.code;

    if (msg === 'ERR_NETWORK') {
      return {
        status: 400,
        data: error.message + ' unable to fetch comments please try again',
      };
    } else if (msg === 'ERR_BAD_REQUEST') {
      return {
        status: 400,
        data:
          error.response.data.message +
          ' unable to fetch comments  please try again',
      };
    } else {
      return {
        status: 400,
        data: 'Bad Request please try again!!',
      };
    }
  }
};

export const _deleteItem = async (id) => {
  try {
    let res = await axios.delete(`/career/deleteCareer/${id}`);
    return {
      status: 200,
      data: res.data,
    };
  } catch (error) {
    const msg = error.code;

    if (msg === 'ERR_NETWORK') {
      return {
        status: 400,
        data: error.message + ' unable to fetch comments please try again',
      };
    } else if (msg === 'ERR_BAD_REQUEST') {
      return {
        status: 400,
        data:
          error.response.data.message +
          ' unable to fetch comments  please try again',
      };
    } else {
      return {
        status: 400,
        data: 'Bad Request please try again!!',
      };
    }
  }
};

export const _createCareer = async (careerData) => {
  try {
    const res = await axios.post(`/career/createCareer`, careerData, config);
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

export const _editCareer = async (data, careerID) => {
  try {
    console.log(data);
    const res = await axios.put(
      `/career/UpdateCareer/${careerID}`,
      data,
      config
    );

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

export const _deleteComment = async (id) => {
  try {
    let res = await axios.delete(`/comment/deleteComments/${id}`);
    return {
      status: 200,
      data: res.data,
    };
  } catch (error) {
    const msg = error.code;

    if (msg === 'ERR_NETWORK') {
      return {
        status: 400,
        data: error.message + ' unable to fetch comments please try again',
      };
    } else if (msg === 'ERR_BAD_REQUEST') {
      return {
        status: 400,
        data:
          error.response.data.message +
          ' unable to fetch comments  please try again',
      };
    } else {
      return {
        status: 400,
        data: 'Bad Request please try again!!',
      };
    }
  }
};

export const _takeQuiz = async (careerData) => {
  console.log(careerData.data, 'ddddd');
  try {
    const res = await axios.post(
      `/queryData`,
      {
        data: [...careerData.data],
      },
      config
    );
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

export const _UnbookmarkItem = async () => {
  try {
    let res = await axios.put(`/users/UpdateProfile`, {
      bookmarks: [],
    });
    return {
      status: 200,
      data: res.data,
    };
  } catch (error) {
    const msg = error.code;

    if (msg === 'ERR_NETWORK') {
      return {
        status: 400,
        data: error.message + ' unable to like comments please try again',
      };
    } else if (msg === 'ERR_BAD_REQUEST') {
      return {
        status: 400,
        data:
          error.response.data.message +
          ' unable to like comments  please try again',
      };
    } else {
      return {
        status: 400,
        data: 'Bad Request please try again!!',
      };
    }
  }
};
