import React from 'react';
import { VscAdd } from 'react-icons/vsc';

const AgendaPage = () => {
    return (
          <div className="p-8">
           <div className="flex justify-between items-center mb-6">
            <div className="flex flex-col">
             <h1 className="text-3xl font-bold text-[#003637]">Agenda</h1>
             <p className="text-base font-medium text-[#003637]">Gerencie seus agendamentos</p>
            </div>
            <button 
             className="flex items-center p-3 rounded-lg text-white font-semibold bg-teal-600 hover:bg-teal-700 transition-colors shadow-md"
            >
          <VscAdd className="w-5 h-5 mr-2" />
          Novo Agendamento
        </button>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <div className="border-b pb-4 mb-4">
          <h2 className="text-xl font-semibold text-[#003637] mb-3">Calendário Mensal</h2>
          <div className="h-40 bg-[#D9D9D9] flex items-center justify-center rounded-lg text-gray-500">
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-[#003637] mb-3">Horários do Dia Selecionado</h2>
          <div className="h-60 bg-[#D9D9D9] flex items-center justify-center rounded-lg text-gray-500 border border-dashed">
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgendaPage;