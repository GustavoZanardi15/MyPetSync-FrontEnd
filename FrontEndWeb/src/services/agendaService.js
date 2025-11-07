import api from "../utils/Api.jsx";

export const getAppointments = async (startDate, endDate) => {
  const response = await api.get("/appointments", {
    params: {
    from: startDate,
    to: endDate,
    },
  });

  return response.data.items || [];
};

export const createAppointment = async (appointmentData, providerData) => {
  let providerId;

  if (typeof providerData === 'object' && providerData !== null) {
      providerId = providerData._id || providerData.id || providerData.userId;
  } else {
      providerId = providerData;
  }
  
  const providerIdString = String(providerId || '').trim();

  if (!providerIdString || providerIdString.length !== 24) {
      throw { 
          response: { 
              data: { 
                  message: "Erro de contexto: ID do Prestador inválido. Certifique-se de que o perfil do prestador está carregado e que o ID é válido." 
              } 
          } 
      };
  }
  
  const response = await api.post(
   `/providers/${providerIdString}/appointments`,
   appointmentData
 );
  return response.data;
};

export const updateAppointment = async ( id, appointmentData ) => {
  if (!id) {
    throw new Error("ID do agendamento obrigatório para atualização.");
  };

  try {
    const response = api.patch(`/appointments/${id}`, appointmentData)
    return response.data
  } catch (error) {
    const errorMsg = error.response?.data?.message || error.message || "Erro desconhecido ao atualizar.";
    throw new Error(errorMsg);
  };
};