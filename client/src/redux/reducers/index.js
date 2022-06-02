import { combineReducers } from 'redux';

import userReducer from './userReducer';
import CareerReducer from './careerReducer';

const reducer = combineReducers({
  user: userReducer,
  career: CareerReducer,
});

export default reducer;
