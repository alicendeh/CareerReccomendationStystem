import {
  ALLCAREERS,
  CREATECAREER,
  CAREERERROR,
  CURRENTLYACTIVECAREER,
  CAREERLOADING,
  EDITCAREER,
  RESET,
  QUIZ,
} from '../ActionTypes';

export const createCareer = (careerData) => {
  return {
    type: CREATECAREER,
    payload: careerData,
  };
};

export const getCareers = (careerData) => {
  return {
    type: ALLCAREERS,
    payload: careerData.finalResult,
  };
};

export const careerError = (errorMessage) => {
  return {
    type: CAREERERROR,
    payload: errorMessage,
  };
};

export const loading = (val) => {
  return {
    type: CAREERLOADING,
    payload: val,
  };
};

export const currentlyActiveCarrer = (data) => {
  return {
    type: CURRENTLYACTIVECAREER,
    payload: data,
  };
};

export const editCareer = (data) => {
  return {
    type: EDITCAREER,
    payload: data,
  };
};

export const resetEditCareer = () => {
  return {
    type: RESET,
  };
};

export const quizResponse = (data) => {
  return {
    type: QUIZ,
    payload: data,
  };
};
