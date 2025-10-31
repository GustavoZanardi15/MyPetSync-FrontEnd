import api from "../utils/Api";

export const fetchCurrentUser = async () => {
  try {
    const response = await api.get("/users/me");
    return response.data;
  } catch (error) {
    console.error("Falha ao buscar usuário logado:", error);
    throw new Error("Não foi possível carregar o perfil do usuário.");
  }
};
