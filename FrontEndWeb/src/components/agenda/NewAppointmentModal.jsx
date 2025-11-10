import React, { useState, useEffect, useCallback } from "react";
import { VscClose, VscTag, VscInfo, VscPerson, VscMail } from "react-icons/vsc";
import { MdOutlinePets, MdOutlineWatchLater } from "react-icons/md";
import { FiPhoneCall } from "react-icons/fi";
import {
  createAppointment,
  updateAppointment,
} from "../../services/agendaService";
import { searchPets } from "../../services/petService";

const STATUS_MAP = { Agendado: "scheduled", Confirmado: "confirmed" };
const DURATION_MAP = { "30 min": 30, "60 min": 60, "90 min": 90 };
const STATUS_MAP_REVERSE = {
  scheduled: "Agendado",
  confirmed: "Confirmado",
  completed: "Concluído",
  canceled: "Cancelado",
};

const Section = ({ title, icon: Icon, color, children, className = "" }) => (
  <div className={`p-4 rounded-lg ${className}`}>
    <h3 className={`font-semibold mb-4 flex items-center ${color}`}>
      <Icon className="w-5 h-5 mr-2" /> {title}
    </h3>
    {children}
  </div>
);

const Input = ({
  label,
  icon: Icon,
  placeholder,
  type = "text",
  name,
  value,
  onChange,
  ...rest
}) => (
  <div className="flex flex-col">
    <label className="text-sm font-medium text-[#F0F0F0] mb-1">{label}</label>

    <div className="relative">
      {Icon && (
        <Icon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      )}

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full p-2.5 rounded-lg border border-gray-300 focus:ring-teal-500 focus:border-teal-500 text-gray-800 ${
          Icon ? "pl-10" : "pl-3"
        }`}
        {...rest}
      />
    </div>
  </div>
);

const TextArea = ({ placeholder, name, value, onChange }) => (
  <div className="flex flex-col mt-4">
    <textarea
      placeholder={placeholder}
      rows="3"
      name={name}
      value={value}
      onChange={onChange}
      className="w-full p-3 rounded-lg border border-gray-300 focus:ring-teal-500 focus:border-teal-500 text-gray-800 bg-white"
    ></textarea>
  </div>
);

const Select = ({
  label,
  options,
  defaultMessage = "Selecione o serviço...",
  name,
  value,
  onChange,
}) => (
  <div className="flex flex-col">
    <label className="text-sm font-medium text-[#F0F0F0] mb-1">{label}</label>

    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full p-2.5 rounded-lg border border-gray-300 focus:ring-teal-500 focus:border-teal-500 text-gray-800 appearance-none bg-white"
    >
      <option value="" disabled>
        {defaultMessage}
      </option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

const StatusRadios = ({ value, onChange }) => (
  <div className="mb-4">
    <label className="text-sm font-medium text-gray-700 block mb-2">
      Status do Agendamento
    </label>
    <div className="flex gap-6">
      {["Agendado", "Confirmado"].map((status) => (
        <label key={status} className="flex items-center space-x-2 text-gray-800">
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

const getInitialFormData = (appt, initialTime) => {
  if (appt && appt._id) {
    const date = new Date(appt.dateTime);
    const durationInMin = appt.duration;
    const clientName = appt.pet.tutorId?.name || "";
    const clientPhone = appt.pet.tutorId?.phone || "";
    const clientEmail = appt.pet.tutorId?.email || "";

    return {
      petName: appt.pet.nome || "",
      clientName,
      phone: clientPhone,
      email: clientEmail,
      date: date.toISOString().split("T")[0],
      time: date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", hour12: false }),
      serviceType: appt.reason || "",
      notes: appt.notes || "",
      duration:
        Object.keys(DURATION_MAP).find((key) => DURATION_MAP[key] === durationInMin) ||
        "60 min",
      status: STATUS_MAP_REVERSE[appt.status] || "Agendado",
    };
  }

  return {
    petName: "",
    clientName: "",
    phone: "",
    email: "",
    serviceType: "",
    date: new Date().toISOString().split("T")[0],
    time: initialTime || "09:00",
    duration: "60 min",
    status: "Agendado",
    notes: "",
  };
};

const NewAppointmentModal = ({
  isOpen,
  onClose,
  initialTime,
  onAppointmentSaved,
  appointmentToEdit,
  providerId,
  isLoadingProvider,
}) => {
  const [selectedPetId, setSelectedPetId] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState(getInitialFormData(appointmentToEdit, initialTime));

  useEffect(() => {
    setFormData(getInitialFormData(appointmentToEdit, initialTime));
    setSelectedPetId(appointmentToEdit ? appointmentToEdit.pet._id : "");
    setError(null);
  }, [appointmentToEdit, initialTime, isOpen]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "petName") setSelectedPetId("");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);

    const isEditing = !!appointmentToEdit?._id;
    if (!selectedPetId) {
      setError("Por favor, selecione um Pet válido da lista de sugestões.");
      setIsSaving(false);
      return;
    }

    const providerIdValid = providerId && providerId !== "null" && providerId !== "";
    if (!isEditing && !providerIdValid) {
      setError("Erro: O ID do prestador não foi carregado.");
      setIsSaving(false);
      return;
    }

    const payload = {
      pet: selectedPetId,
      dateTime: new Date(`${formData.date}T${formData.time}:00`).toISOString(),
      duration: DURATION_MAP[formData.duration],
      reason: formData.serviceType,
      notes: formData.notes,
      status: STATUS_MAP[formData.status] || "scheduled",
    };

    try {
      if (isEditing) {
        await updateAppointment(appointmentToEdit._id, payload);
      } else {
        const createPayload = { ...payload, provider: providerId };
        await createAppointment(createPayload, providerId);
      }
      onAppointmentSaved?.();
      onClose?.();
    } catch (err) {
      console.error("Erro ao salvar agendamento:", err);
      setError("Falha ao salvar o agendamento.");
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4" onClick={onClose}>
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-[#A8E6CF] z-10">
          <h2 className="text-xl font-semibold text-gray-800">Novo Agendamento</h2>
          <button type="button" onClick={onClose} aria-label="Fechar" className="text-gray-600 hover:text-gray-900">
            <VscClose className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-8">
          <Section title="Observações" icon={VscInfo} color="text-[#F0F0F0]" className="bg-[#058789]">
            <TextArea
              placeholder="Observações"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
            />
          </Section>
        </div>

        <div className="p-6 border-t flex justify-end gap-3 sticky bottom-0 bg-white z-10">
          <button type="button" onClick={onClose} className="px-6 py-2 rounded-lg text-gray-600 border border-gray-300 hover:bg-gray-50 transition-colors">
            Cancelar
          </button>
          <button type="submit" className="px-6 py-2 rounded-lg text-white font-semibold bg-teal-600 hover:bg-teal-700 transition-colors shadow-md">
            {isSaving ? "Salvando..." : "Salvar"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewAppointmentModal;
