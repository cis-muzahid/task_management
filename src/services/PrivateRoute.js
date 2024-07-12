// src/PrivateRoute.js
import React, { useContext, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import AuthContext from './AuthContext';
// import { getAccessTokenSession } from '../utils/utility';

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const token = sessionStorage.getItem("usr_1a2b3c");
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
};

export default PrivateRoute;
