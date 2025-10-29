import api from "../utils/Api";

export const signup = async (userData) => {
  try {
    const response = await api.post("/auth/signup", userData);
    const { token, user } = response.data;
    if (token) {
      localStorage.setItem("myPetSyncToken", token);
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    return user;
  } catch (error) {
    const errorMessage = error.response?.data?.message;
    if (errorMessage) {
      if (Array.isArray(errorMessage)) {
        throw new Error(errorMessage.join("\n"));
      }
      throw new Error(errorMessage);
    }
    throw new Error("Falha na comunicação com o servidor. Tente novamente.");
  }
};

export const login = async (email, senha) => {
  try {
    const response = await api.post("/auth/login", { email, senha });
    const { token, user } = response.data;
    if (token) {
      localStorage.setItem("myPetSyncToken", token);
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    return user;
  } catch (error) {
    const errorMessage = error.response?.data?.message;

    if (errorMessage) {
      if (Array.isArray(errorMessage)) {
        throw new Error(errorMessage.join("\n"));
      }
      throw new Error(errorMessage);
    }
    throw new Error("Falha na comunicação com o servidor. Tente novamente.");
  }
};

export const requestPasswordReset = async (email) => {
  try {
    const response = await api.post("/auth/forgot-password", { email });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(
      "Falha na comunicação com o servidor ao solicitar recuperação de senha."
    );
  }
};

export const verifyResetCode = async (code, email) => {
  try {
    const response = await api.post("/auth/verify-code", { code, email });
    return response.data;
  } catch (error) {}
};

export const isAuthenticated = () => {
  const token = localStorage.getItem("myPetSyncToken");
  return !!token;
};

export const logout = () => {
  localStorage.removeItem("myPetSyncToken");
  delete api.defaults.headers.common["Authorization"];
};
