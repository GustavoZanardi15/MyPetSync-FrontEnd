import api from "../utils/Api.jsx";

export const searchPets = async (query) => {
  if (!query || query.length < 3) return [];
  try {
    const response = await api.get("/pets/search", {
      params: { q: query },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar pets:", error);
    return [];
  }
};

export const getPetById = async (petId) => {
  if (!petId) {
    throw new Error("ID do Pet é obrigatório para a busca.");
  }
  try {
    const response = await api.get(`/pets/provider/${petId}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar pet com ID ${petId}:`, error);
    throw error;
  }
};
