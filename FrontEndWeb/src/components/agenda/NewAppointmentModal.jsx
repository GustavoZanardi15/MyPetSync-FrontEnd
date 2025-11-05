import React, { useState } from "react";
import { createAppointment } from "@/services/appointmentService";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

const STATUS_MAP = {
  1: "Agendado",
  2: "Em andamento",
  3: "Concluído",
  4: "Cancelado",
};

const DURATION_MAP = {
  15: "15 minutos",
  30: "30 minutos",
  45: "45 minutos",
  60: "60 minutos",
};

const Select = ({ name, value, onChange, options }) => (
  <select
    name={name}
    value={value}
    onChange={onChange}
    className="w-full p-2 border rounded-md"
  >
    <option value="">Selecione</option>
    {options.map(([key, label]) => (
      <option key={key} value={key}>
        {label}
      </option>
    ))}
  </select>
);

const TextArea = ({ name, value, onChange, placeholder }) => (
  <textarea
    name={name}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className="w-full p-2 border rounded-md"
  />
);

const StatusRadios = ({ value, onChange }) => (
  <div className="flex gap-2">
    {Object.entries(STATUS_MAP).map(([key, label]) => (
      <label key={key} className="flex items-center gap-1">
        <input
          type="radio"
          name="status"
          value={key}
          checked={value === key}
          onChange={onChange}
        />
        {label}
      </label>
    ))}
  </div>
);

const NewAppointmentModal = ({ onClose }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    duration: "",
    status: "1",
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("Usuário não autenticado.");
      return;
    }

    try {
      await createAppointment({
        ...formData,
        userId: user.id,
      });
      toast.success("Agendamento criado com sucesso!");
      onClose();
    } catch (error) {
      toast.error("Erro ao criar agendamento.");
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
      <div className="bg-white p-6 rounded-md w-96 shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-center">
          Novo Agendamento
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />

          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />

          <Select
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            options={Object.entries(DURATION_MAP)}
          />

          <StatusRadios value={formData.status} onChange={handleChange} />

          <TextArea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Observações..."
          />

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#058789] text-white rounded-md hover:bg-[#046f6d]"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewAppointmentModal;
