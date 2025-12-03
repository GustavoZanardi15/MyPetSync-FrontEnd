import React, { createContext, useState, useContext, useEffect } from "react";
import { isAuthenticated, logout as apiLogout } from "../services/authService";
import { fetchCurrentUser } from "../services/userService";
import api from "../utils/Api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const loadUser = async () => {
    try {
      const userData = await fetchCurrentUser();
      const rawJsonString = JSON.stringify(userData);
      const cleanedUser = JSON.parse(rawJsonString);

      let primaryId = String(
        cleanedUser.id || cleanedUser.userId || cleanedUser._id || ""
      );

      if (!primaryId || primaryId.length < 12) {
        console.error(
          "Dados de usuário recebidos, mas ID inválido:",
          cleanedUser
        );
        throw new Error("ID primário do usuário não encontrado na resposta.");
      }

      cleanedUser.id = primaryId;
      cleanedUser.userId = primaryId;
      cleanedUser.name = cleanedUser.nome || cleanedUser.name;
      cleanedUser.email = cleanedUser.email;

      setUser(cleanedUser);
      return cleanedUser;
    } catch (error) {
      console.error("Erro ao carregar dados do usuário:", error);
      setUser(null);
      throw error;
    }
  };

  const forceProfileReload = () => {
    setRefreshKey((prev) => prev + 1);
  };

  useEffect(() => {
    const checkAuth = async () => {
      const authStatus = isAuthenticated();
      if (!authStatus) {
        delete api.defaults.headers.common["Authorization"];
        setIsLoggedIn(false);
        setUser(null);
        setIsLoading(false);
        return;
      }

      try {
        await loadUser();
        setIsLoggedIn(true);
      } catch (e) {
        apiLogout();
        setIsLoggedIn(false);
      }

      setIsLoading(false);
    };
    checkAuth();
  }, [refreshKey]);

  const loginContext = async () => {
    setIsLoading(true);
    try {
      await loadUser();
      setIsLoggedIn(true);
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
    setUser(null);
  };

  const value = {
    isLoggedIn,
    isLoading,
    user,
    loginContext,
    logoutContext,
    forceProfileReload,
    refreshKey,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
