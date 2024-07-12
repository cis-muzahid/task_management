// src/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
// import authService from './authService';
import { getAccessTokenSession } from '../utils/utitlity';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const gettoken = sessionStorage.getItem("usr_1a2b3c");
      setToken(gettoken);
  }, []);


  return (
    <AuthContext.Provider value={{ token }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
