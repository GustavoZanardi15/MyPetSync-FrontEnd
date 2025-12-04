import React, { useState } from "react";
import InputWithIcon from "../common/InputWithIcon.jsx";
import Button from "../common/Button.jsx";
import { createVaccine } from "../../services/vaccineService";

const ROUTES = [
  { value: "SC", label: " Subcutânea (Abaixo da Pele)" },
  { value: "IM", label: " Intramuscular (No Músculo)" },
  { value: "Oral", label: " Oral (Pela Boca)" },
  { value: "Nasal", label: " Nasal (Pelo Nariz)" },
];

const AddVaccineForm = ({ petId, onSuccess, onClose }) => {
  const [formData, setFormData] = useState({
    pet: petId,
    name: "",
    manufacturer: "",
    batch: "",
    doseMl: "",
    route: "",
    appliedAt: "",
    nextDoseAt: "",
    isCompleted: false,
    veterinarian: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData((prev) => {
      let newState = { ...prev, [name]: newValue };
      if (name === "isCompleted" && newValue === true) {
        newState.nextDoseAt = "";
      }
      return newState;
    });
    if (error && name === "name") setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    setLoading(true);

    try {
      const { doseMl, appliedAt, nextDoseAt, isCompleted, ...restOfData } =
        formData;

      const dataToSend = {
        ...restOfData,
        doseMl: doseMl ? parseFloat(doseMl) : null,
        appliedAt: appliedAt || null,
        nextDoseAt: nextDoseAt || null,
        isCompleted: isCompleted,
      };

      if (!dataToSend.pet || !dataToSend.name) {
        setError("O NOME da vacina e a Data de Aplicação são obrigatórios!");
        setLoading(false);
        return;
      }

      if (dataToSend.doseMl !== null && isNaN(dataToSend.doseMl)) {
        setError("A Dose (mL) precisa ser um número válido.");
        setLoading(false);
        return;
      }

      await createVaccine(dataToSend);
      setSuccessMessage("Vacina registrada com sucesso! Uau!");
      setTimeout(() => onSuccess(dataToSend), 1000);
    } catch (err) {
      console.error("Erro ao criar vacina:", err);
      const message =
        err.response?.data?.message ||
        "Ops! Falha ao registrar a vacina. Verifique se preencheu tudo certinho.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-2xl max-w-3xl mx-auto border-4 border-gray-100">
      <h2 className="text-3xl font-extrabold mb-8 text-[#058789] border-b pb-3">
        Registrar Nova Vacina
      </h2>

      {error && (
        <div className="p-4 mb-4 text-lg font-semibold text-red-800 bg-red-100 border-l-4 border-red-500 rounded-lg">
          {error}
        </div>
      )}
      {successMessage && (
        <div className="p-4 mb-4 text-lg font-semibold text-green-800 bg-green-100 border-l-4 border-green-500 rounded-lg">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <fieldset className="p-4 border border-gray-200 rounded-lg mb-6">
          <legend className="text-xl font-bold text-gray-700 px-2">
            Detalhes da Vacina
          </legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <InputWithIcon
              label="Nome da Vacina (Obrigatório)"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Ex: V10, Raiva"
              maxLength={120}
            />
            <InputWithIcon
              label="Fabricante (Opcional)"
              name="manufacturer"
              value={formData.manufacturer}
              onChange={handleChange}
              placeholder="Ex: Zoetis"
              maxLength={120}
            />
            <InputWithIcon
              label="Lote (Opcional)"
              name="batch"
              value={formData.batch}
              onChange={handleChange}
              placeholder="Ex: Lote ABC123"
              maxLength={60}
            />
            <InputWithIcon
              label="Dose em mL (Opcional)"
              name="doseMl"
              type="number"
              step="0.1"
              min="0"
              value={formData.doseMl}
              onChange={handleChange}
              placeholder="Ex: 1.5"
            />
          </div>
        </fieldset>
        <fieldset className="p-4 border border-gray-200 rounded-lg mb-6">
          <legend className="text-xl font-bold text-gray-700 px-2">
            Datas e Aplicação
          </legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <InputWithIcon
              label="Data e Hora da Aplicação (Obrigatório)"
              name="appliedAt"
              type="datetime-local"
              value={formData.appliedAt}
              onChange={handleChange}
              required
            />
            {formData.isCompleted ? (
              <div className="p-3 border border-dashed border-gray-300 rounded-lg flex items-center justify-center text-sm text-gray-500 bg-gray-50 h-full min-h-[44px] md:col-span-1">
                <p className="text-center">Vacinação marcada como concluída.</p>
              </div>
            ) : (
              <InputWithIcon
                label="Data da Próxima Dose (Opcional)"
                name="nextDoseAt"
                type="datetime-local"
                value={formData.nextDoseAt}
                onChange={handleChange}
              />
            )}

            <div>
              <label
                htmlFor="route"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Via de Aplicação (Opcional)
              </label>
              <select
                id="route"
                name="route"
                value={formData.route}
                onChange={handleChange}
                className="mt-1 block w-full pl-3 pr-10 py-2.5 text-base border-gray-300 rounded-lg shadow-sm focus:border-[#058789] focus:ring-[#058789]"
              >
                <option value="">Selecione a forma de aplicação...</option>
                {ROUTES.map(({ value, label }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
            <InputWithIcon
              label="Nome do Veterinário (Opcional)"
              name="veterinarian"
              value={formData.veterinarian}
              onChange={handleChange}
              placeholder="Ex: Dra. Fernanda ou CRMV"
              maxLength={180}
            />
          </div>
        </fieldset>
        <fieldset className="p-4 border border-gray-200 rounded-lg mb-6">
          <legend className="text-xl font-bold text-gray-700 px-2">
            Observações e Conclusão
          </legend>
          <div className="grid grid-cols-1 gap-4 mt-2">
            <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
              <input
                id="isCompleted"
                name="isCompleted"
                type="checkbox"
                checked={formData.isCompleted}
                onChange={handleChange}
                className="h-5 w-5 text-[#058789] border-gray-300 rounded focus:ring-[#058789] cursor-pointer"
              />
              <label
                htmlFor="isCompleted"
                className="text-base font-medium text-gray-700 cursor-pointer"
              >
                Vacinação Concluída? (Marque se esta é a última dose!)
              </label>
            </div>
            <div>
              <label
                htmlFor="notes"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Notas Adicionais (Opcional)
              </label>
              <textarea
                id="notes"
                name="notes"
                rows="3"
                value={formData.notes}
                onChange={handleChange}
                className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-lg p-3 focus:border-[#058789] focus:ring-[#058789] resize-none"
                placeholder="Ex: Sem reações adversas, pet ficou sonolento por 1 dia."
              ></textarea>
            </div>
          </div>
        </fieldset>
        <div className="mt-8 flex justify-end space-x-3 border-t pt-4">
          <Button
            type="button"
            onClick={onClose}
            variant="secondary"
            disabled={loading}
            className="hover:bg-gray-200"
          >
            Fechar Janela
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? " Salvando..." : " Salvar Vacina"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddVaccineForm;
