import React from "react";

const StatusRadios = ({ value, onChange }) => (
  <div className="mb-4">
    <label className="text-sm font-medium text-gray-700 block mb-2">
      Status do Agendamento
    </label>
    <div className="flex gap-6">
      {["Agendado", "Confirmado", "Concluído"].map((status) => (
        <label
          key={status}
          className="flex items-center space-x-2 text-gray-800"
        >
          <input
            type="radio"
            name="status"
            value={status}
            checked={value === status}
            onChange={() => onChange(status)}
            className="text-teal-600 focus:ring-teal-500"
          />
          <span>{status}</span>
        </label>
      ))}
    </div>
  </div>
);

export default StatusRadios;
