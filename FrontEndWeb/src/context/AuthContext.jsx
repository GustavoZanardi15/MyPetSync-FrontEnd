import React, { createContext, useState, useContext, useEffect } from "react";
import { isAuthenticated, logout as apiLogout } from "../services/authService";
import { fetchCurrentUser } from "../services/userService";
import api from "../utils/Api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const loadUser = async () => {
    try {
      const user = await fetchCurrentUser();
      const rawJsonString = JSON.stringify(user);
      const cleanedUser = JSON.parse(rawJsonString);
      const primaryId = String(
        cleanedUser.id || cleanedUser.userId || cleanedUser._id || ""
      );
      if (!primaryId) {
        throw new Error("ID primário do usuário não encontrado na resposta.");
      }

      cleanedUser.id = primaryId;
      cleanedUser.userId = primaryId;
      setCurrentUser(cleanedUser);
    } catch (error) {
      console.error("Erro ao carregar dados do usuário:", error);
      setCurrentUser(null);
      throw error;
    }
  };

  const forceProfileReload = () => {
    setRefreshKey((prev) => prev + 1);
  };

  useEffect(() => {
    const checkAuth = async () => {
      const authStatus = isAuthenticated();
      if (authStatus) {
        try {
          await loadUser();
        } catch (e) {
          apiLogout();
          setIsLoggedIn(false);
        }
      } else {
        delete api.defaults.headers.common["Authorization"];
      }

      setIsLoggedIn(authStatus);
      setIsLoading(false);
    };
    checkAuth();
  }, [refreshKey]);

  const loginContext = async () => {
    setIsLoading(true);
    setIsLoggedIn(true);
    try {
      await loadUser();
    } catch (e) {
      console.error("Login falhou ao carregar perfil:", e);
      apiLogout();
      setIsLoggedIn(false);
    }
    setIsLoading(false);
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
    forceProfileReload,
    refreshKey,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
