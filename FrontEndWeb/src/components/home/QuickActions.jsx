import { VscAdd, VscCalendar } from "react-icons/vsc";
import { Link } from "react-router-dom";

const QuickActions = () => {
  return (
    <div className="mb-6">
      <h3 className="text-xl font-bold text-gray-800 mb-3">Ações Rápidas</h3>
      <div className="space-y-3">
        <Link
          to="/agenda?new=true"
          className="w-full flex items-center justify-center p-3 rounded-lg text-white font-semibold bg-teal-600 hover:bg-teal-700 transition-colors shadow-md"
        >
          <VscAdd className="w-5 h-5 mr-2" />
          Novo Agendamento
        </Link>
        <Link
          to="/agenda"
          className="w-full flex items-center justify-center p-3 rounded-lg text-teal-600 font-semibold border border-teal-600 bg-white hover:bg-teal-50 transition-colors shadow-md"
        >
          <VscCalendar className="w-5 h-5 mr-2" />
          Ver Agenda Completa
        </Link>
      </div>
    </div>
  );
};

export default QuickActions;
