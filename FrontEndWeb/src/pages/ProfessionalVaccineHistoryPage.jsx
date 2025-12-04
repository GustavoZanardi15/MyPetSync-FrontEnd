import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { getProviderVaccineHistory } from "../services/vaccineService.js";
import { VscHistory } from "react-icons/vsc";

const ProfessionalVaccineHistoryPage = () => {
  const { user, isLoading: authLoading, isLoggedIn } = useAuth();
  const [vaccines, setVaccines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const providerId = user?.providerId;

  useEffect(() => {
    if (authLoading) {
      setLoading(true);
      return;
    }

    if (
      !isLoggedIn ||
      typeof providerId !== "string" ||
      providerId.length < 10
    ) {
      setLoading(false);
      setError(
        "Seu perfil não está configurado como Prestador de Serviço (ID Ausente)."
      );
      return;
    }

    const fetchVaccineHistory = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getProviderVaccineHistory(providerId);

        setVaccines(data.items || []);
      } catch (err) {
        console.error("Falha na API ao buscar histórico:", err);

        const status = err.response?.status;
        let errorMessage = "Falha ao carregar o histórico. Tente novamente.";

        if (status === 400) {
          errorMessage =
            "O servidor rejeitou a requisição. (Erro 400: Parâmetros inválidos no backend).";
        } else if (status === 401 || status === 403) {
          errorMessage = `Acesso negado: Falha na autenticação (Erro ${status}).`;
        } else if (status) {
          errorMessage = `Erro na API: Status ${status}. Não foi possível carregar os dados.`;
        }

        setError(errorMessage);
        setVaccines([]);
      } finally {
        setLoading(false);
      }
    };

    fetchVaccineHistory();
  }, [providerId, isLoggedIn, authLoading]);

  const renderVaccineList = () => {
    if (loading) {
      return <p className="text-gray-600">Carregando dados e histórico...</p>;
    }
    if (error) {
      return <p className="text-red-500 font-medium">Erro: {error}</p>;
    }
    if (vaccines.length === 0) {
      return (
        <p className="text-gray-600">
          Nenhuma vacina encontrada em seu histórico.
        </p>
      );
    }
    return (
      <div className="space-y-4">
        {vaccines.map((vac) => (
          <div
            key={vac._id}
            className="p-4 bg-white rounded-lg shadow-sm border border-gray-200"
          >
            <p className="font-semibold text-lg text-[#058789]">
              Vacina: {vac.vaccineName || "Nome Indisponível"}
            </p>
            <p className="text-gray-700">
              Pet: {vac.pet?.name || "Pet Indisponível"} (
              {vac.pet?.tutor?.name || "Tutor Indisponível"})
            </p>
            <p className="text-sm text-gray-500">
              Data:{" "}
              {new Date(vac.date).toLocaleDateString("pt-BR") ||
                "Data Indisponível"}
            </p>
            <p className="text-sm text-gray-500">
              Lote: {vac.batch || "Não informado"}
            </p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex-1 p-8 overflow-y-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <VscHistory className="w-6 h-6 mr-3 text-[#058789]" />
        Histórico de Vacinas Aplicadas
      </h1>
      <div className="mt-8 bg-gray-50 p-6 rounded-lg shadow-inner">
        {renderVaccineList()}
      </div>
    </div>
  );
};

export default ProfessionalVaccineHistoryPage;
