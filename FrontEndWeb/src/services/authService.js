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

export const login = async (email, password) => {};
