import api from "../utils/Api";

export const fetchProviderProfile = async () => {
  try {
    const response = await api.get("/providers/me");
    return response.data;
  } catch (error) {
    console.error("Falha ao buscar o perfil do prestador:", error);
    throw new Error("Não foi possível carregar os dados do perfil.");
  }
};

export const updateProviderProfile = async (profileData) => {
  try {
    const response = await api.patch("/providers/me", profileData);
    return response.data;
  } catch (error) {
    console.error("Falha ao atualizar o perfil:", error);
    throw new Error("Não foi possível salvar as alterações.");
  }
};
