import {
  CREATECAREER,
  ALLCAREERS,
  CAREERERROR,
  CAREERLOADING,
  CURRENTLYACTIVECAREER,
  EDITCAREER,
  RESET,
  QUIZ,
} from '../ActionTypes';

const initialState = {
  allCareers: [],
  error: null,
  loading: false,
  currentCarrent: [],
  editableCareer: {},
  quizResults: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    default:
      return state;

    case ALLCAREERS:
      return {
        ...state,
        allCareers: payload,
        error: null,
        loading: false,
        editableCareer: {},
      };

    case CAREERERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        editableCareer: {},
      };

    case CAREERLOADING:
      return {
        ...state,
        loading: payload,
      };
    case RESET:
      return {
        ...state,
        editableCareer: {},
      };
    case CURRENTLYACTIVECAREER:
      return {
        ...state,
        error: null,
        loading: false,
        currentCarrent: payload,
        editableCareer: {},
      };
    case EDITCAREER:
      return {
        ...state,
        error: null,
        loading: false,
        editableCareer: payload,
      };
    case QUIZ:
      return {
        ...state,
        quizResults: payload,
      };
  }
}
