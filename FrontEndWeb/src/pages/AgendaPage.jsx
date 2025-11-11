import React, { useState, useEffect, useCallback } from "react";
import { VscAdd } from "react-icons/vsc";
import AgendaCalendar from "../components/agenda/AgendaCalendar";
import DailySchedule from "../components/agenda/DailySchedule";
import DailySummary from "../components/agenda/DailySummary";
import NewAppointmentModal from "../components/agenda/NewAppointmentModal";
import { useSearchParams } from "react-router-dom";
import { getAppointments } from "../services/agendaService";
import { fetchProviderProfile } from "../services/providerService";
import { useAuth } from "../context/AuthContext";

const AgendaPage = () => {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const shouldOpenModal = searchParams.get("new") === "true";
  const selectedTime = searchParams.get("time");
  const [isModalOpen, setIsModalOpen] = useState(shouldOpenModal);
  const [appointments, setAppointments] = useState([]);
  const [isLoadingAppointments, setIsLoadingAppointments] = useState(true);
  const [isLoadingProvider, setIsLoadingProvider] = useState(true);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [appointmentToEdit, setAppointmentToEdit] = useState(null);
  const [providerDocumentId, setProviderDocumentId] = useState(null);

  const fetchProviderId = useCallback(async () => {
    const instantProviderId = user?.profileId || user?.providerId;
    if (instantProviderId) {
      setProviderDocumentId(instantProviderId);
      setIsLoadingProvider(false);
      return instantProviderId;
    }

    if (!user) {
      setIsLoadingProvider(false);
      return null;
    }

    setIsLoadingProvider(true);
    try {
      const profile = await fetchProviderProfile();
      const id = profile?._id || null;
      setProviderDocumentId(id);
      return id;
    } catch (err) {
      console.error("Falha crítica ao carregar perfil do Prestador:", err);
      setProviderDocumentId(null);
      return null;
    } finally {
      setIsLoadingProvider(false);
    }
  }, [user]);

  const fetchAppointments = useCallback(async (providerId) => {
    if (!providerId) {
      setIsLoadingAppointments(false);
      setAppointments([]);
      return;
    }
    setIsLoadingAppointments(true);
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
      .toISOString()
      .split("T")[0];
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 2, 0)
      .toISOString()
      .split("T")[0];

    try {
      const data = await getAppointments(startOfMonth, endOfMonth, providerId);
      setAppointments(data);
    } catch (error) {
      console.error("Falha ao carregar agendamentos", error);
      setAppointments([]);
    } finally {
      setIsLoadingAppointments(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    const initialize = async () => {
      const id = await fetchProviderId();
      if (isMounted) {
        fetchAppointments(id);
      }
    };
    initialize();

    return () => {
      isMounted = false;
    };
  }, [fetchProviderId, fetchAppointments]);

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
    (appt) =>
      new Date(appt.dateTime).toISOString().split("T")[0] === selectedDate
  );

  const isPageLoading =
    isLoadingAppointments && (!appointments || appointments.length === 0);

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
          disabled={isLoadingProvider}
        >
          <VscAdd className="w-5 h-5 mr-2" />
          {isLoadingProvider ? "Carregando ID..." : "Novo Agendamento"}
        </button>
      </div>

      {isPageLoading ? (
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
        onAppointmentSaved={() => fetchAppointments(providerDocumentId)}
        appointmentToEdit={appointmentToEdit}
        providerId={providerDocumentId}
        isLoadingProvider={isLoadingProvider}
        initialDate={selectedDate}
      />
    </div>
  );
};

export default AgendaPage;
