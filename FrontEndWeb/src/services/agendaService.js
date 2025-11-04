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

export const createAppointment = async (appointmentData, providerId) => {
const providerIdString = String(providerId); 

const response = await api.post(
  `/providers/${providerIdString}/appointments`, 
  appointmentData
 );
return response.data;
};