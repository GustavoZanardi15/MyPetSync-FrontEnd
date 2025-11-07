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
      console.error("Resposta do servidor não é um array:", response.data);
      throw new Error(
        "Resposta inesperada do servidor ao carregar agendamentos."
      );
    }

    return appointments.map((app) => {
      const dateObject = app.dateTime ? new Date(app.dateTime) : null;

      return {
        id: app._id,
        petName: app.pet?.nome || "Pet Desconhecido",
        tutorName: app.pet?.tutorId?.name || "Tutor Desconhecido",
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
        phone: app.provider?.whatsapp || "(Não informado)",
        status: mapStatusToPortuguese(app.status),
      };
    });
  } catch (error) {
    console.error("Falha ao buscar agendamentos:", error);
    throw new Error("Não foi possível carregar os agendamentos.");
  }
};
