import React, { createContext, useState, useContext, useEffect } from "react";
import { isAuthenticated, logout as apiLogout } from "../services/authService";
import api from "../utils/Api"; // 🎯 GARANTA QUE ESTE IMPORT ESTEJA AQUI

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("myPetSyncToken");
      const authStatus = !!token;

      if (authStatus) {
        // 🎯 ESSENCIAL: Garante que o token seja configurado no Axios na inicialização.
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      } else {
        delete api.defaults.headers.common["Authorization"];
      }

      setIsLoggedIn(authStatus);
      setIsLoading(false); // SÓ define como false após o token ser checado/configurado
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
