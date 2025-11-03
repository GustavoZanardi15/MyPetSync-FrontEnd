import React, { useMemo } from "react";
import { VscCheck, VscCalendar, VscHistory } from "react-icons/vsc";

const DailySummary = ({ appointments }) => {
  const summaryData = useMemo(() => {
    const total = appointments.length;
    const confirmed = appointments.filter(
      (appt) => appt.status === "confirmed"
    ).length;
    const scheduled = appointments.filter(
      (appt) => appt.status === "scheduled"
    ).length;
    return {
      total: total,
      confirmed: confirmed,
      pending: scheduled,
    };
  }, [appointments]);

  return (
    <div className="w-80 bg-white p-6 rounded-xl shadow-lg h-96 flex flex-col">
      <h2 className="text-xl font-semibold text-gray-800 mb-6 border-b pb-4">
        Resumo do Dia
      </h2>

      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
          <VscCalendar className="w-6 h-6 text-teal-600 flex-shrink-0" />
          <div>
            <p className="text-sm text-gray-500">Total de agendamentos</p>
            <p className="text-2xl font-bold text-gray-800">
              {summaryData.total}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4 p-3 bg-green-50 rounded-lg border border-green-200">
          <VscCheck className="w-6 h-6 text-green-700 flex-shrink-0" />
          <div>
            <p className="text-sm text-gray-500">Confirmados</p>
            <p className="text-2xl font-bold text-green-700">
              {summaryData.confirmed}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
          <VscHistory className="w-6 h-6 text-yellow-700 flex-shrink-0" />
          <div>
            <p className="text-sm text-gray-500">Agendados/Pendentes</p>
            <p className="text-2xl font-bold text-yellow-700">
              {summaryData.pending}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailySummary;
