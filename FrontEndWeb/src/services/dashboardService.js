import api from "../utils/Api";

export const fetchDashboardStats = async () => {
  const [appointmentsRes, clientsRes, reviewsRes] = await Promise.all([
    api.get(`/appointments/stats/today`),
    api.get(`/appointments/stats/clients`),
    api.get(`/reviews/stats/average`),
  ]);

  return {
    appointments: appointmentsRes.data,
    clients: clientsRes.data.totalClients,
    reviews: reviewsRes.data,
  };
};

export const fetchRecentActivities = async () => {
  const activitiesRes = await api.get(`/reviews/recent`);

  if (!Array.isArray(activitiesRes.data)) {
    return [];
  }

  return activitiesRes.data.map((activity) => ({
    id: activity._id,
    type: "Avaliação Recebida",
    detail: `Nota ${activity.rating} por ${activity.author?.name || "Cliente"}`,
    rating: activity.rating,
    iconName: "VscStarFull",
    color: "bg-yellow-500",
  }));
};
