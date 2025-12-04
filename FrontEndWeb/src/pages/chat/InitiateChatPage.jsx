import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/Api";
import { useAuth } from "../../context/AuthContext";

function InitiateChatPage() {
  const [clients, setClients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuth();
  const currentUserId = user?.userId;

  useEffect(() => {
    api
      .get("/appointments/clients/booked")
      .then((response) => {
        setClients(response.data);
      })
      .catch((err) => {
        console.error("Erro ao carregar clientes agendados:", err);
        setError("Não foi possível carregar a lista de clientes.");
      })
      .finally(() => setIsLoading(false));
  }, []);

  const handleSelectClient = async (clientUserId, clientName) => {
    if (!currentUserId) return;

    try {
      setIsLoading(true);
      const response = await api.post("/chat/rooms", {
        participants: [clientUserId],
        name: `Chat com ${clientName}`,
      });

      const newRoomId = response.data._id;

      navigate(`/app/chat/${newRoomId}`);
    } catch (err) {
      console.error("Erro ao iniciar chat:", err);
      setError("Não foi possível iniciar a conversa.");
      setIsLoading(false);
    }
  };

  if (isLoading && clients.length === 0)
    return <div className="p-4">Carregando clientes...</div>;
  if (error) return <div className="p-4 text-red-600">{error}</div>;

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
        Selecione um Cliente para Conversar
      </h1>

      {clients.length === 0 ? (
        <div className="text-center p-8 bg-white rounded-lg shadow-inner">
          Nenhum cliente com agendamento encontrado.
        </div>
      ) : (
        <div className="space-y-3">
          {clients.map((client) => (
            <div
              key={client.userId}
              onClick={() => handleSelectClient(client.userId, client.nome)}
              className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm hover:shadow-md cursor-pointer transition-all duration-200 border-l-4 border-[#A5E5D9] hover:border-[#058789]"
            >
              <p className="font-semibold text-gray-800">
                {client.nome ||
                  `Cliente ID: ${client.userId.substring(0, 4)}...`}
              </p>
              <button
                className="bg-[#045f61] hover:bg-[#024d4e] text-white text-sm py-2 px-4 rounded-lg transition-colors"
                disabled={isLoading}
              >
                Iniciar Chat
              </button>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={() => navigate("/app/chat")}
        className="mt-8 text-sm text-gray-500 hover:text-gray-700"
      >
        &larr; Voltar para Caixa de Entrada
      </button>
    </div>
  );
}

export default InitiateChatPage;
