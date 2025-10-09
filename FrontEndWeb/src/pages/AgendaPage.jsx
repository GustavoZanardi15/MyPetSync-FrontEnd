import React, { useState, useEffect } from "react";
import { VscAdd } from "react-icons/vsc";
import AgendaCalendar from "../components/agenda/AgendaCalendar";
import DailySchedule from "../components/agenda/DailySchedule";
import DailySummary from "../components/agenda/DailySummary";
import NewAppointmentModal from "../components/agenda/NewAppointmentModal";
import { useSearchParams } from "react-router-dom";

const AgendaPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const shouldOpenModal = searchParams.get("new") === "true";
  const [isModalOpen, setIsModalOpen] = useState(shouldOpenModal);
  useEffect(() => {
    setIsModalOpen(shouldOpenModal);
  }, [shouldOpenModal]);

  const openModal = () => {
    setSearchParams({ new: true });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSearchParams({});
    setIsModalOpen(false);
  };

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
          onClick={openModal}
          className="flex items-center p-3 rounded-lg text-white font-semibold bg-teal-600 hover:bg-teal-700 transition-colors shadow-md"
        >
          <VscAdd className="w-5 h-5 mr-2" />
          Novo Agendamento
        </button>
      </div>
      <div className="flex gap-8 mt-6">
        <div className="flex-grow">
          <AgendaCalendar />
          <DailySchedule />
        </div>
        <DailySummary />
      </div>
      <NewAppointmentModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default AgendaPage;
