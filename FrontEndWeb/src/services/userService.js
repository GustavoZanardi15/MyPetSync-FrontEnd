import api from "../utils/Api";

// --- FUNÇÕES DE USUÁRIO (USER) ---
export const fetchCurrentUser = async () => {
  try {
    const response = await api.get("/users/me");
    return response.data;
  } catch (error) {
    console.error("Falha ao buscar usuário logado:", error);
    throw new Error("Não foi possível carregar o perfil do usuário.");
  }
};

export const updateCurrentUser = async (userData) => {
  try {
    const response = await api.patch("/users/me", userData);
    return response.data;
  } catch (error) {
    console.error("Falha ao atualizar o usuário:", error);
    throw error;
  }
};

export const fetchProviderProfile = async () => {
  try {
    const response = await api.get("/providers/me");
    const data = response.data;
    const providerId = data?._id || data?.id?.buffer;

    if (!data || !providerId || Object.keys(data).length <= 3) {
      console.warn(
        "Usuário logado, mas perfil de prestador ausente ou vazio na resposta (200 OK)."
      );
      return null;
    }

    if (!data._id) {
      data._id = providerId;
    }

    return data;
  } catch (error) {
    if (error.response?.status === 404) {
      console.warn(
        "Usuário logado, mas perfil de prestador não encontrado (404)."
      );
      return null;
    }

    console.error(
      "Falha ao buscar perfil do Prestador (API Error):",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const updateProviderProfile = async (updateData) => {
  try {
    const response = await api.patch("/providers/me", updateData);
    return response.data;
  } catch (error) {
    console.error(
      "Falha ao atualizar perfil do Prestador:",
      error.response?.data || error.message
    );
    throw error;
  }
};
