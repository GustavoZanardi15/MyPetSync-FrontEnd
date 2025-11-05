import api from "../utils/Api";

export const fetchDashboardStats = async (providerId) => {
  if (!providerId) {
    throw new Error("Provider ID is required to fetch dashboard stats.");
  }

  const [appointmentsRes, clientsRes, reviewsRes] = await Promise.all([
    api.get(`/appointments/stats/today/${providerId}`),
    api.get(`/appointments/stats/clients/${providerId}`),
    api.get(`/reviews/stats/average/${providerId}`),
  ]);

  return {
    appointments: appointmentsRes.data,
    clients: clientsRes.data, 
    reviews: reviewsRes.data, 
  };
};

export const fetchRecentActivities = async (providerId) => {
  if (!providerId) {
    throw new Error("Provider ID is required to fetch recent activities.");
  }
  
  const activitiesRes = await api.get(`/reviews/recent/${providerId}`);
  
  return activitiesRes.data.map(activity => ({
      id: activity._id,
      type: "Avaliação Recebida",
      detail: `Nota ${activity.rating} por ${activity.author?.name || 'Cliente'}`,
      rating: activity.rating 
  }));
};