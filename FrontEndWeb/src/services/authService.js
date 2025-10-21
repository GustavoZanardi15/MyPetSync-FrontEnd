import api from "../utils/Api";

export const signup = async (userData) => {
  try {
    const response = await api.post("/auth/signup", userData);
    const { token, user } = response.data;
    if (token) {
      localStorage.setItem("myPetSyncToken", token);
    }
    return user;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Falha na comunicação com o servidor. Tente novamente.");
  }
};
export const login = async (email, password) => {
  try {
    const response = await api.post("/auth/login", { email, password });
    const { token, user } = response.data;
    if (token) {
      localStorage.setItem("myPetSyncToken", token);
    }
    return user;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
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
