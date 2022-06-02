import React from 'react';
import {
  LandingPage,
  Login,
  Register,
  Careers,
  CareerDetail,
  Quiz,
  Profile,
  Admin,
  User,
  CreateCareer,
  AllUsers,
} from './screens';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/careerdetail" element={<CareerDetail />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/user" element={<User />} />
          <Route path="/createCareer" element={<CreateCareer />} />
          <Route path="/allUsers" element={<AllUsers />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
