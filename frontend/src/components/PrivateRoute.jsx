// Route protection from unauthorized access. 
// Redirects unauthenticated user to login page.
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('accessToken');
  return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
