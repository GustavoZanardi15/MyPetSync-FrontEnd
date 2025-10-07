import { VscAdd } from "react-icons/vsc";
import AgendaCalendar from "../components/agenda/AgendaCalendar";
import DailySchedule from "../components/agenda/DailySchedule";
import DailySummary from "../components/agenda/DailySummary";

const AgendaPage = () => {
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold text-[#003637]">Agenda</h1>
          <p className="text-base font-semibold text-[#003637]">
            Gerencie seus agendamentos
          </p>
        </div>
        <button className="flex items-center p-3 rounded-lg text-white font-semibold bg-[#058789] hover:bg-teal-700 transition-colors shadow-md">
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
    </div>
  );
};

export default AgendaPage;
