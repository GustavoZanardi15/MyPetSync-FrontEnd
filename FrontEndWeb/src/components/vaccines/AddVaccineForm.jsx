import React, { useState } from "react";
import InputWithIcon from "../common/InputWithIcon.jsx";
import Button from "../common/Button.jsx";
import { createVaccine } from "../../services/vaccineService";

const ROUTES = ["SC", "IM", "Oral", "Nasal"];

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
    veterinarian: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    setLoading(true);

    try {
      const dataToSend = {
        ...formData,
        doseMl: formData.doseMl ? parseFloat(formData.doseMl) : undefined,
        appliedAt: formData.appliedAt || undefined,
        nextDoseAt: formData.nextDoseAt || undefined,
      };

      if (!dataToSend.pet || !dataToSend.name) {
        setError("O Nome da vacina é obrigatório.");
        setLoading(false);
        return;
      }

      await createVaccine(dataToSend);
      setSuccessMessage("Vacina registrada com sucesso!");
      setTimeout(() => onSuccess(dataToSend), 1000);
    } catch (err) {
      const message =
        err.response?.data?.message ||
        "Falha ao registrar vacina. Verifique os campos.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-xl max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-indigo-600">
        Registrar Nova Vacina
      </h2>

      {error && (
        <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
          {error}
        </div>
      )}
      {successMessage && (
        <div className="p-3 mb-4 text-sm text-green-700 bg-green-100 rounded-lg">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputWithIcon
            label="Nome da Vacina"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Ex: V10"
          />
          <InputWithIcon
            label="Fabricante"
            name="manufacturer"
            value={formData.manufacturer}
            onChange={handleChange}
            placeholder="Ex: Zoetis"
          />
          <InputWithIcon
            label="Dose (mL)"
            name="doseMl"
            type="number"
            step="0.1"
            min="0"
            value={formData.doseMl}
            onChange={handleChange}
            placeholder="Ex: 1.5"
          />

          <div>
            <label
              htmlFor="route"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Rota de Administração
            </label>
            <select
              id="route"
              name="route"
              value={formData.route}
              onChange={handleChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="">Selecione...</option>
              {ROUTES.map((route) => (
                <option key={route} value={route}>
                  {route}
                </option>
              ))}
            </select>
          </div>

          <InputWithIcon
            label="Data de Aplicação"
            name="appliedAt"
            type="datetime-local"
            value={formData.appliedAt}
            onChange={handleChange}
          />
          <InputWithIcon
            label="Próxima Dose Em"
            name="nextDoseAt"
            type="datetime-local"
            value={formData.nextDoseAt}
            onChange={handleChange}
          />
          <InputWithIcon
            label="Lote"
            name="batch"
            value={formData.batch}
            onChange={handleChange}
            placeholder="Ex: Lote ABC123"
          />
          <InputWithIcon
            label="Veterinário (Nome ou CRMV)"
            name="veterinarian"
            value={formData.veterinarian}
            onChange={handleChange}
            placeholder="Ex: Dra. Marina K."
          />

          <div className="md:col-span-2">
            <label
              htmlFor="notes"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Notas Adicionais
            </label>
            <textarea
              id="notes"
              name="notes"
              rows="3"
              value={formData.notes}
              onChange={handleChange}
              className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2 focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Ex: Sem reações adversas."
            ></textarea>
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <Button
            type="button"
            onClick={onClose}
            variant="secondary"
            disabled={loading}
          >
            Cancelar
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? "Registrando..." : "Salvar Vacina"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddVaccineForm;
