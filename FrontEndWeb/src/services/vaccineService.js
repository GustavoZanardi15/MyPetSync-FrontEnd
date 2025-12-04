import api from "../utils/Api";

const BASE_URL = "/vaccines";

export const createVaccine = async (vaccineData) => {
  try {
    const response = await api.post(BASE_URL, vaccineData);
    return response.data;
  } catch (error) {
    console.error("Erro ao registrar vacina:", error);
    throw error;
  }
};

export const getPetVaccines = async (petId) => {
  try {
    const response = await api.get(`${BASE_URL}/pet/${petId}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar vacinas do pet:", error);
    return [];
  }
};

export const getProviderVaccineHistory = async (providerId) => {
  try {
    const response = await api.get(BASE_URL, {
      params: {
        provider: providerId,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Erro ao buscar histórico de vacinas do profissional:",
      error
    );
    throw error;
  }
};
