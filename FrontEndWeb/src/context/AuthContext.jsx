import React, { createContext, useState, useContext, useEffect } from "react";
import { isAuthenticated, logout as apiLogout } from "../services/authService";
import api from "../utils/Api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const authStatus = isAuthenticated();

      if (!authStatus) {
        delete api.defaults.headers.common["Authorization"];
      }

      setIsLoggedIn(authStatus);
      setIsLoading(false);
    };
    checkAuth();
  }, []);

  const loginContext = () => {
    setIsLoggedIn(true);
  };

  const logoutContext = () => {
    apiLogout();
    setIsLoggedIn(false);
  };

  const value = {
    isLoggedIn,
    isLoading,
    loginContext,
    logoutContext,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
