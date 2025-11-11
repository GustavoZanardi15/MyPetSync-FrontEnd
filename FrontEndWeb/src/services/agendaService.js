import api from "../utils/Api";

const mapStatusToPortuguese = (status) => {
  switch (status) {
    case "scheduled":
      return "Agendado";
    case "confirmed":
      return "Confirmado";
    case "canceled":
      return "Cancelado";
    case "completed":
      return "Concluído";
    default:
      return status;
  }
};

export const fetchNextAppointments = async () => {
  try {
    const response = await api.get("/appointments", {
      params: {
        limit: 5,
        sort: "dateTime",
        from: new Date().toISOString(),
        status: "scheduled,confirmed",
        asc: "true",
      },
    });
    const appointments = response.data.items;
    if (!Array.isArray(appointments)) {
      throw new Error(
        "Resposta inesperada do servidor ao carregar agendamentos."
      );
    }

    return appointments.map((app) => {
      const dateObject = app.dateTime ? new Date(app.dateTime) : null;
      const tutorName = app.pet?.tutorId?.name || "Tutor Desconhecido";
      const tutorPhone = app.pet?.tutorId?.phone || "(Não informado)";

      return {
        id: app._id,
        petName: app.pet?.nome || "Pet Desconhecido",
        tutorName: tutorName,
        date:
          dateObject && !isNaN(dateObject)
            ? dateObject.toLocaleDateString("pt-BR")
            : "Data Inválida",
        time:
          dateObject && !isNaN(dateObject)
            ? dateObject.toLocaleTimeString("pt-BR", {
                hour: "2-digit",
                minute: "2-digit",
              })
            : "Hora Inválida",
        phone: tutorPhone,
        status: mapStatusToPortuguese(app.status),
      };
    });
  } catch (error) {
    console.error("Falha ao buscar agendamentos:", error);
    throw new Error("Não foi possível carregar os agendamentos.");
  }
};

export const getAppointments = async (startDate, endDate, providerId) => {
  if (!providerId) {
    return [];
  }
  const response = await api.get(`/providers/${providerId}/appointments`, {
    params: {
      from: startDate,
      to: endDate,
    },
  });

  return response.data.items || [];
};

export const createAppointment = async (appointmentData, providerData) => {
  let providerId;

  if (typeof providerData === "object" && providerData !== null) {
    providerId = providerData._id || providerData.id || providerData.userId;
  } else {
    providerId = providerData;
  }

  const providerIdString = String(providerId || "").trim();

  if (!providerIdString || providerIdString.length !== 24) {
    throw {
      response: {
        data: {
          message:
            "Erro de contexto: ID do Prestador inválido. Certifique-se de que o perfil do prestador está carregado e que o ID é válido.",
        },
      },
    };
  }

  const response = await api.post(
    `/providers/${providerIdString}/appointments`,
    appointmentData
  );
  return response.data;
};

export const updateAppointment = async (id, appointmentData) => {
  if (!id) {
    throw new Error("ID do agendamento obrigatório para atualização.");
  }

  try {
    const response = await api.patch(`/appointments/${id}`, appointmentData);
    return response.data;
  } catch (error) {
    const errorMsg =
      error.response?.data?.message ||
      error.message ||
      "Erro desconhecido ao atualizar.";
    throw new Error(errorMsg);
  }
};

export const deleteAppointment = async (id) => {
  if (!id) {
    throw new Error("ID do agendamento obrigatório para exclusão.");
  }
  try {
    await api.delete(`/appointments/${id}`);
    return true;
  } catch (error) {
    const errorMsg =
      error.response?.data?.message ||
      error.message ||
      "Erro desconhecido ao excluir.";
    throw new Error(errorMsg);
  }
};