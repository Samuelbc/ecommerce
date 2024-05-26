import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Checkout from './pages/Checkout';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} /> // Wrap the Login component in a JSX expression
      <Route path="/register" element={<Register />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
};

export default App;
