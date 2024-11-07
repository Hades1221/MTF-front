// src/App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Users from "./pages/Users";
import Login from "./pages/Login";
import Otp from './pages/Otp';
import NotFound from './components/NotFound';
import { Provider } from "react-redux";
import store from './redux/store';
import Map from './pages/MapPage';
import Sites from './pages/Sites';
import AboutUs from './pages/AboutUs';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/aboutus" element={<AboutUs/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/map" element={<Map/>} />
          
          {/* Unprotected /login/otp route */}
          <Route path="/login/otp" element={<Otp />} />

          {/* Unprotected /users route */}
          <Route path="/users" element={<Users />} />
          <Route path="/sites" element={<Sites/>} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;