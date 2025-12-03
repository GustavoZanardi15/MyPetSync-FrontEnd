import React, { useState, useCallback } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import Button from "../common/Button.jsx";
import AddVaccineForm from "../vaccines/AddVaccineForm.jsx";
import { getPetVaccines } from "../../services/vaccineService";

const normalize = (str) =>
  (str || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s/g, "");

const AUTHORIZED_PROVIDER_TYPES_RAW = [
  "Clínica Veterinária",
  "Veterinário Autônomo",
];

const AUTHORIZED_PROVIDER_TYPES_NORMALIZED =
  AUTHORIZED_PROVIDER_TYPES_RAW.map(normalize);

const PetHealthSection = ({ petId, petName = "o Pet" }) => {
  const { user, isLoading } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [listKey, setListKey] = useState(0);
  const [vaccines, setVaccines] = useState([]);
  const [isListLoading, setIsListLoading] = useState(false);
  const [listError, setListError] = useState(null);
  const rawUserRole = user ? user.role : null;
  const rawUserProviderType = user ? user.service : null;

  const canAddVaccine = !isLoading && rawUserRole === "provider";
  const loadVaccines = useCallback(async () => {
    if (!petId) return;
    setIsListLoading(true);
    setListError(null);
    try {
      const data = await getPetVaccines(petId);
      setVaccines(data);
    } catch (err) {
      setListError("Falha ao carregar o histórico de vacinas.");
      setVaccines([]);
    } finally {
      setIsListLoading(false);
    }
  }, [petId]);

  React.useEffect(() => {
    loadVaccines();
  }, [loadVaccines, listKey]);

  const handleRegistrationSuccess = useCallback(
    (newVaccineData) => {
      alert(
        `Vacina ${newVaccineData.name} registrada para ${petName} com sucesso!`
      );
      setIsModalOpen(false);
      setListKey((prev) => prev + 1);
    },
    [petName]
  );

  if (isLoading) {
    return (
      <div className="text-center p-6 text-gray-500">
        Carregando permissões...
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-xl mt-6">
      <h3 className="text-2xl font-bold mb-4 text-gray-800">
        Prontuário de Vacinação - {petName}
      </h3>
      <div className="mb-6 flex justify-between items-center">
        {canAddVaccine ? (
          <Button onClick={() => setIsModalOpen(true)} variant="primary">
            Registrar Nova Vacina
          </Button>
        ) : (
          rawUserRole !== "provider" && (
            <p className="text-sm text-yellow-700 bg-yellow-50 p-3 rounded border border-yellow-200">
              **Autorização Necessária:** Apenas Provedores
              (Veterinários/Clínicas) podem adicionar registros.
            </p>
          )
        )}
      </div>
      <div className="border-t pt-4">
        <h4 className="font-semibold text-lg text-gray-700 mb-3">
          Histórico de Vacinas
        </h4>
        {isListLoading && (
          <p className="text-center text-gray-500">Carregando histórico...</p>
        )}
        {listError && <p className="text-red-500">{listError}</p>}
        {!isListLoading && vaccines.length === 0 && !listError && (
          <p className="text-gray-500">
            Nenhuma vacina registrada para {petName}.
          </p>
        )}
        {!isListLoading && vaccines.length > 0 && (
          <ul className="space-y-3">
            {vaccines.map((v) => (
              <li
                key={v._id || v.id}
                className="p-3 border rounded-lg bg-gray-50 shadow-sm"
              >
                <div className="font-bold text-[#003637]">{v.name}</div>
                <p className="text-sm text-gray-600">
                  Aplicada em:
                  {v.appliedAt
                    ? new Date(v.appliedAt).toLocaleDateString("pt-BR")
                    : "Data Desconhecida"}
                </p>
                {v.nextDoseAt && (
                  <p className="text-xs text-red-500">
                    Próxima Dose:
                    {new Date(v.nextDoseAt).toLocaleDateString("pt-BR")}
                  </p>
                )}
                {v.veterinarian && (
                  <p className="text-xs text-gray-400">
                    Veterinário: {v.veterinarian}
                  </p>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-4">
          <AddVaccineForm
            petId={petId}
            onSuccess={handleRegistrationSuccess}
            onClose={() => setIsModalOpen(false)}
          />
        </div>
      )}
    </div>
  );
};

export default PetHealthSection;
