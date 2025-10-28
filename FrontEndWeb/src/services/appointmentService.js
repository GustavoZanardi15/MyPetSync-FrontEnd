import api from "../utils/Api";

export const fetchNextAppointments = async () => {
  try {
    const response = await api.get("/appointments", {
      params: {
        limit: 5,
        sort: "dateTime",
        dateFrom: new Date().toISOString(),
        status: "scheduled,confirmed",
      },
    });
    const appointments = response.data.docs || response.data;

    return appointments.map((app) => ({
      id: app._id,
      petName: app.pet?.name || "Pet Desconhecido",
      tutorName: app.tutor?.name || "Tutor Desconhecido",
      date: new Date(app.dateTime).toLocaleDateString("pt-BR"),
      time: new Date(app.dateTime).toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      phone: app.provider?.whatsapp || "(Não informado)",
      status: mapStatusToPortuguese(app.status),
    }));
  } catch (error) {
    console.error("Falha ao buscar agendamentos:", error);
    throw new Error("Não foi possível carregar os agendamentos.");
  }
};

const mapStatusToPortuguese = (status) => {
  switch (status) {
    case "confirmed":
      return "Confirmado";
    case "scheduled":
      return "Agendado";
    case "pending":
      return "Pendente";
    case "completed":
      return "Concluído";
    case "canceled":
      return "Cancelado";
    default:
      return "Desconhecido";
  }
};
