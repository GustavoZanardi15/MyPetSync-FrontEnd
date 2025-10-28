import React, { useState, useEffect } from "react";
import AppointmentItem from "./AppointmentItem";
import { fetchNextAppointments } from "../../services/appointmentService";

const NextAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadAppointments = async () => {
      try {
        setIsLoading(true);
        const data = await fetchNextAppointments();
        setAppointments(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setAppointments([]);
      } finally {
        setIsLoading(false);
      }
    };
    loadAppointments();
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-end mb-4 border-b pb-3 border-gray-100">
        <h2 className="text-xl font-bold text-gray-800">
          Próximos Agendamentos
        </h2>
        <a
          href="/agenda"
          className="text-teal-600 hover:text-teal-700 text-sm font-medium"
        >
          Ver todos
        </a>
      </div>
      <div className="flex flex-col space-y-3">
        {isLoading && (
          <p className="text-center text-gray-500">
            Carregando agendamentos...
          </p>
        )}
        {error && (
          <p className="text-center text-red-600 font-semibold">
            🚨 Erro: {error}
          </p>
        )}
        {!isLoading && appointments.length === 0 && !error && (
          <p className="text-center text-gray-500">
            Nenhum agendamento futuro encontrado.
          </p>
        )}
        {appointments.map((appointment) => (
          <AppointmentItem
            key={appointment.id}
            petName={appointment.petName}
            tutorName={appointment.tutorName}
            date={appointment.date}
            time={appointment.time}
            phone={appointment.phone}
            status={appointment.status}
          />
        ))}
      </div>
    </div>
  );
};

export default NextAppointments;
