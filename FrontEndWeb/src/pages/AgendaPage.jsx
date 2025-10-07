import React from 'react';
import { VscAdd } from 'react-icons/vsc';

const AgendaPage = () => {
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Agenda</h1>
        <button 
          className="flex items-center p-3 rounded-lg text-white font-semibold bg-teal-600 hover:bg-teal-700 transition-colors shadow-md"
        >
          <VscAdd className="w-5 h-5 mr-2" />
          Novo Agendamento
        </button>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <div className="border-b pb-4 mb-4">
          <h2 className="text-xl font-semibold text-gray-700 mb-3">Calendário Mensal</h2>
          <div className="h-40 bg-gray-100 flex items-center justify-center rounded-lg text-gray-500">
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-700 mb-3">Horários do Dia Selecionado</h2>
          <div className="h-60 bg-gray-50 flex items-center justify-center rounded-lg text-gray-500 border border-dashed">
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgendaPage;