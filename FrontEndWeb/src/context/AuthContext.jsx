import React, { createContext, useState, useContext, useEffect } from "react";
import { isAuthenticated, logout as apiLogout } from "../services/authService";
import { fetchCurrentUser } from "../services/userService";
import api from "../utils/Api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  const loadUser = async () => {
    try {
      const user = await fetchCurrentUser();
      setCurrentUser(user);
    } catch (error) {
      console.error("Erro ao carregar dados do usuário:", error);
      logoutContext();
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      const authStatus = isAuthenticated();
      if (authStatus) {
        await loadUser();
      } else {
        delete api.defaults.headers.common["Authorization"];
      }

      setIsLoggedIn(authStatus);
      setIsLoading(false);
    };
    checkAuth();
  }, []);

  const loginContext = async () => {
    setIsLoggedIn(true);
    await loadUser();
  };

  const logoutContext = () => {
    apiLogout();
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  const value = {
    isLoggedIn,
    isLoading,
    currentUser,
    loginContext,
    logoutContext,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
