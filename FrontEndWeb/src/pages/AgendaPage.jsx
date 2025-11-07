import React, { useState, useEffect, useCallback } from "react";
import { VscAdd } from "react-icons/vsc";
import AgendaCalendar from "../components/agenda/AgendaCalendar";
import DailySchedule from "../components/agenda/DailySchedule";
import DailySummary from "../components/agenda/DailySummary";
import NewAppointmentModal from "../components/agenda/NewAppointmentModal";
import { useSearchParams } from "react-router-dom";
import { getAppointments } from "../services/agendaService";
import api from "../../src/utils/Api.jsx";

const AgendaPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const shouldOpenModal = searchParams.get("new") === "true";
  const selectedTime = searchParams.get("time");
  const [isModalOpen, setIsModalOpen] = useState(shouldOpenModal);
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [appointmentToEdit, setAppointmentToEdit] = useState(null);

  const fetchAppointments = useCallback(async () => {
    setIsLoading(true);
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
      .toISOString()
      .split("T")[0];
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0)
      .toISOString()
      .split("T")[0];

    try {
      const data = await getAppointments(startOfMonth, endOfMonth);
      setAppointments(data);
    } catch (error) {
      console.error("Falha ao carregar agendamentos", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  useEffect(() => {
    setIsModalOpen(shouldOpenModal);
  }, [shouldOpenModal]);

  const handleNewAppointmentClick = (time = null) => {
    if (time) {
      setSearchParams({ new: true, time: time });
    } else {
      setSearchParams({ new: true });
    }
    setAppointmentToEdit(null);
    setIsModalOpen(true);
  };

  const handleEditAppointment = (appointment) => {
    setAppointmentToEdit(appointment);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSearchParams({});
    setIsModalOpen(false);
    setAppointmentToEdit(null);
  };

  const dailyAppointments = appointments.filter(
    (appt) => new Date(appt.dateTime).toISOString().split("T")[0] === selectedDate
  );

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold text-[#003637]">Agenda</h1>
          <p className="text-base font-semibold text-[#003637]">
            Gerencie seus agendamentos
          </p>
        </div>
        <button
          onClick={() => handleNewAppointmentClick()}
          className="flex items-center p-3 rounded-lg text-white font-semibold bg-teal-600 hover:bg-teal-700 transition-colors shadow-md"
        >
          <VscAdd className="w-5 h-5 mr-2" />
          Novo Agendamento
        </button>
      </div>
      {isLoading ? (
        <div className="text-center py-10 text-xl text-gray-500">
          Carregando Agendamentos...
        </div>
      ) : (
        <div className="flex gap-8 mt-6">
          <div className="flex-grow">
            <AgendaCalendar
              appointments={appointments}
              onDateSelect={setSelectedDate}
              selectedDate={selectedDate}
            />
            <DailySchedule
              appointments={dailyAppointments}
              selectedDate={selectedDate}
              onAddAppointment={handleNewAppointmentClick}
              onAppointmentClick={handleEditAppointment}
            />
          </div>
          <DailySummary appointments={dailyAppointments} />
        </div>
      )}
      <NewAppointmentModal
        isOpen={isModalOpen}
        onClose={closeModal}
        initialTime={selectedTime}
        onAppointmentSaved={fetchAppointments}
        appointmentToEdit={appointmentToEdit}
      />
    </div>
  );
};

export default AgendaPage;
