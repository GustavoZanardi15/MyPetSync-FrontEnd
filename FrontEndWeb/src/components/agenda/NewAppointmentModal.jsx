import React, { useState, useEffect, useCallback } from "react";
import {
  VscClose,
  VscCalendar,
  VscTag,
  VscInfo,
  VscPerson,
  VscMail,
} from "react-icons/vsc";
import { MdOutlinePets, MdOutlineWatchLater } from "react-icons/md";
import { FiPhoneCall } from "react-icons/fi";
import { createAppointment } from "../../services/agendaService";
import { searchPets } from "../../services/petService";
import { useAuth } from "../../context/AuthContext";

<<<<<<< HEAD
const STATUS_MAP = { Agendado: "scheduled", Confirmado: "confirmed" };
const DURATION_MAP = { "30 min": 30, "60 min": 90, "90 min": 90 };
=======
const NewAppointmentModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-[#A8E6CF] z-10">
          <div>
            <h2 className="text-2xl font-bold text-[#003637] flex items-center">
              <VscCalendar className="w-6 h-6 mr-2 text-[#003637]" />
              Novo Agendamento
            </h2>
            <p className="text-sm text-[#003637] mt-1">
              Preencha os dados do agendamento
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 p-2 rounded-full transition-colors"
          >
            <VscClose className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6 space-y-8">
          <Section
            title="Informações do Cliente"
            icon={VscPerson}
            color="text-[#F0F0F0]"
            className="bg-[#058789]"
          >
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Nome do Pet"
                icon={MdOutlinePets}
                placeholder="Nome do Pet"
              />
              <Input
                label="Nome do Tutor"
                icon={VscPerson}
                placeholder="Nome do Tutor"
              />
              <Input
                label="Telefone"
                icon={FiPhoneCall}
                placeholder="Telefone"
                type="tel"
              />
              <Input
                label="Email"
                icon={VscMail}
                placeholder="Email"
                type="email"
              />
            </div>
          </Section>
          <Section
            title="Informações do Serviço"
            icon={VscTag}
            color="text-[#F0F0F0]"
            className="bg-[#058789]"
          >
            <Select
              label="Tipo de Serviço"
              options={["Consulta", "Tosa", "Banho", "Vacinação"]}
              defaultMessage="Selecione o serviço..."
            />
          </Section>
          <Section
            title="Data e Horário"
            icon={MdOutlineWatchLater}
            color="text-[#F0F0F0]"
            className="bg-[#058789]"
          >
            <div className="grid grid-cols-3 gap-4">
              <Input label="Data" placeholder="DD/MM/AAAA" type="date" />
              <Select
                label="Horário"
                options={["09:00", "10:00", "11:00"]}
                defaultMessage="Selecione o horário..."
              />
>>>>>>> dev/anna

const Section = ({ title, icon: Icon, color, children, className = "" }) => (
  <div className={`p-4 rounded-lg ${className}`}>
    <h3 className={`font-semibold mb-4 flex items-center ${color}`}>
      <Icon className="w-5 h-5 mr-2" />
      {title}
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
const Select = ({
<<<<<<< HEAD
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
const TextArea = ({ placeholder, name, value, onChange }) => (
  <div className="flex flex-col mt-4">
    <textarea
      placeholder={placeholder}
      rows="3"
      name="notes"
      value={value}
      onChange={onChange}
      className="w-full p-3 rounded-lg border border-gray-300 focus:ring-teal-500 focus:border-teal-500 text-gray-800 bg-wh"
    ></textarea>
  </div>
);
const StatusRadios = ({ value, onChange }) => (
  <div className="mb-4">
    <label className="text-sm font-medium text-gray-700 block mb-2">
      Status do Agendamento
    </label>
    <div className="flex gap-6">
      <label className="flex items-center space-x-2 text-gray-800">
        <input
          type="radio"
          name="status"
          value="Agendado"
          checked={value === "Agendado"}
          onChange={() => onChange("Agendado")}
          className="text-teal-600 focus:ring-teal-500"
        />
        <span>Agendado</span>
      </label>
      <label className="flex items-center space-x-2 text-gray-800">
        <input
          type="radio"
          name="status"
          value="Confirmado"
          checked={value === "Confirmado"}
          onChange={() => onChange("Confirmado")}
          className="text-teal-600 focus:ring-teal-500"
        />
        <span>Confirmado</span>
      </label>
    </div>
  </div>
=======
  label,
  options,
  id,
  defaultMessage = "Selecione o serviço...",
}) => {
  const selectId = id || label.replace(/\s+/g, "-").toLowerCase();

  return (
    <div className="flex flex-col">
      <label
        htmlFor={selectId}
        className="text-sm font-medium text-[#F0F0F0] mb-1"
      >
        {label}
      </label>
      <select
        id={selectId}
        className="w-full p-2.5 rounded-lg border border-gray-300 focus:ring-teal-500 focus:border-teal-500"
      >
        <option value="">{defaultMessage}</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};
const TextArea = ({ placeholder }) => (
  <div className="flex flex-col mt-4">
    <textarea
      placeholder={placeholder}
      rows="3"
      className="w-full p-3 rounded-lg border border-gray-300 focus:ring-teal-500 focus:border-teal-500 text-gray-800 bg-white"
    ></textarea>
  </div>
);
const StatusRadios = () => (
  <div className="mb-4">
    <div className="flex gap-6">
      <label className="flex items-center space-x-2 text-gray-800">
        <input
          type="radio"
          name="status"
          value="Agendado"
          defaultChecked
          className="text-teal-600 focus:ring-teal-500"
        />
        <span>Agendado</span>
      </label>
      <label className="flex items-center space-x-2 text-gray-800">
        <input
          type="radio"
          name="status"
          value="Confirmado"
          className="text-teal-600 focus:ring-teal-500"
        />
        <span>Confirmado</span>
      </label>
    </div>
  </div>
>>>>>>> dev/anna
);

const NewAppointmentModal = ({
  isOpen,
  onClose,
  initialTime,
  onAppointmentSaved,
}) => {
  const { currentUser } = useAuth();
  const providerId = String(currentUser?.id || currentUser?.userId || ''); 
  
  const [selectedPetId, setSelectedPetId] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
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
  });

  useEffect(() => {
    if (initialTime) {
      setFormData((prev) => ({ ...prev, time: initialTime }));
    }
    setSelectedPetId("");
    setError(null);
  }, [initialTime, isOpen]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "petName") {
      setSelectedPetId("");
    }
  }, []);
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (formData.petName.length > 2) {
        setIsSearching(true);
        const results = await searchPets(formData.petName);
        setSearchResults(results);
        setIsSearching(false);
      } else {
        setSearchResults([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [formData.petName]);

  const handlePetSelect = useCallback((pet) => {
    setSelectedPetId(pet._id);
    setFormData((prev) => ({
      ...prev,
      petName: pet.nome,
      clientName: pet.tutor?.nome || `ID:${pet.tutorId.substring(0, 4)}...`,
    }));
    setSearchResults([]);
  }, []);

  const handleStatusChange = useCallback((statusValue) => {
    setFormData((prev) => ({ ...prev, status: statusValue }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);
    if (!selectedPetId) {
      setError("Por favor, selecione um Pet válido da lista de sugestões.");
      setIsSaving(false);
      return;
    }
    if (!providerId || providerId === 'null' || providerId === 'undefined' || providerId === '') {
      setError(
        "Erro de autenticação: ID do prestador não encontrado. Tente logar novamente."
      );
      setIsSaving(false);
      return;
    }

    const payload = {
      pet: selectedPetId,
      provider: providerId,
      dateTime: new Date(`${formData.date}T${formData.time}:00`).toISOString(),
      duration: DURATION_MAP[formData.duration],
      reason: formData.serviceType,
      notes: formData.notes,
      status: STATUS_MAP[formData.status] || "scheduled",
    };

    try {
      await createAppointment(payload, providerId);
      onAppointmentSaved();
      onClose();
    } catch (err) {
      console.error("Erro ao salvar agendamento:", err);
      if (err.response?.data) { 
          console.error("Detalhes da Validação:", err.response.data); 
      }
      setError(
        "Falha ao salvar o agendamento. Verifique a validade dos IDs ou a conexão."
      );
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4"
      onClick={onClose}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-[#A8E6CF] z-10"></div>
        <div className="p-6 space-y-8">
          {error && (
            <div className="p-3 bg-red-100 text-red-700 rounded font-medium">
              {error}
            </div>
          )}
          <Section
            title="Informações do Cliente"
            icon={VscPerson}
            color="text-[#F0F0F0]"
            className="bg-[#058789]"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <Input
                  label="Nome do Pet"
                  icon={MdOutlinePets}
                  placeholder="Busque o nome do Pet..."
                  name="petName"
                  value={formData.petName}
                  onChange={handleChange}
                  autoComplete="off"
                />
                {(isSearching || searchResults.length > 0) && (
                  <div className="absolute z-20 w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-1 max-h-40 overflow-y-auto">
                    {isSearching && (
                      <div className="p-2 text-gray-500">Buscando...</div>
                    )}
                    {!isSearching &&
                      searchResults.length === 0 &&
                      formData.petName.length > 2 && (
                        <div className="p-2 text-gray-500">
                          Pet não encontrado.
                        </div>
                      )}
                    {searchResults.map((pet) => (
                      <div
                        key={pet._id}
                        className="p-2 cursor-pointer hover:bg-teal-100"
                        onClick={() => handlePetSelect(pet)}
                      >
                        {pet.nome} ({pet.especie}) - Tutor:{" "}
                        {pet.tutor?.nome || `ID:${pet.tutorId.substring(0, 4)}...`}
                      </div>
                    ))}
                  </div>
                )}
                {selectedPetId && (
                  <p className="text-xs text-yellow-300 mt-1">
                    Pet selecionado (ID: {selectedPetId.substring(0, 4)}...)
                  </p>
                )}
              </div>

              <Input
                label="Nome do Tutor"
                icon={VscPerson}
                placeholder="Nome do Tutor (Informação)"
                name="clientName"
                value={formData.clientName}
                onChange={handleChange}
                disabled={selectedPetId ? true : false}
              />
              <Input
                label="Telefone"
                icon={FiPhoneCall}
                placeholder="Telefone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
              <Input
                label="Email"
                icon={VscMail}
                placeholder="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </Section>
          <Section
            title="Informações do Serviço"
            icon={VscTag}
            color="text-[#F0F0F0]"
            className="bg-[#058789]"
          >
            <Select
              label="Tipo de Serviço"
              options={["Consulta", "Tosa", "Banho", "Vacinação"]}
              name="serviceType"
              value={formData.serviceType}
              onChange={handleChange}
            />
          </Section>
          <Section
            title="Data e Horário"
            icon={MdOutlineWatchLater}
            color="text-[#F0F0F0]"
            className="bg-[#058789]"
          >
            <div className="grid grid-cols-3 gap-4">
              <Input
                label="Data"
                placeholder="DD/MM/AAAA"
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />
              <Select
                label="Horário"
                options={["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"]}
                defaultMessage="Selecione o horário..."
                name="time"
                value={formData.time}
                onChange={handleChange}
              />

              <Select
                label="Duração"
                options={["30 min", "60 min", "90 min"]}
                defaultMessage="Selecione a duração..."
                name="duration"
                value={formData.duration}
                onChange={handleChange}
              />
            </div>
          </Section>
          <Section
            title="Status do Agendamento"
            icon={VscInfo}
            color="text-gray-700"
            className="bg-gray-50"
          >
            <StatusRadios
              value={formData.status}
              onChange={handleStatusChange}
            />
          </Section>
          <Section
            title="Observações (opcional)"
            icon={VscInfo}
            color="text-[#F0F0F0]"
            className="bg-[#058789]"
          >
            <TextArea
              placeholder="Informações adicionais sobre o agendamento..."
              name="notes"
              value={formData.notes}
              onChange={handleChange}
            />
          </Section>
            </div>
        <div className="p-6 border-t flex justify-end gap-3 sticky bottom-0 bg-white z-10">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 rounded-lg text-gray-600 border border-gray-300 hover:bg-gray-50 transition-colors"
            disabled={isSaving}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-6 py-2 rounded-lg text-white font-semibold bg-teal-600 hover:bg-teal-700 transition-colors shadow-md disabled:bg-gray-400"
            disabled={isSaving}
          >
            {isSaving ? "Salvando..." : "Salvar"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewAppointmentModal;