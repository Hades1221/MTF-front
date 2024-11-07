// src/utilities/ProtectedRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token = localStorage.getItem('token');
  console.log('Token check:', token); // Add this to see if the token is being read correctly

  if (!token) {
    // Redirect to login page if token is not found
    return <Navigate to="/login" replace />;
  }

  // Render the children components if authenticated
  return children;
};

export default ProtectedRoute;