import api from "../utils/Api";

export const fetchProviderProfile = async () => {
  try {
    const response = await api.get("/providers/me");
    return response.data;
  } catch (error) {
    console.error("Falha ao buscar perfil do prestador:", error);
    throw new Error("Não foi possível carregar as informações da empresa.");
  }
};
