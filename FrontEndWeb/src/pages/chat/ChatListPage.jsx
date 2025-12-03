import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/Api";

function ChatListPage() {
  const [rooms, setRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/chat/rooms")
      .then((response) => setRooms(response.data))
      .catch((error) => console.error("Erro ao carregar salas:", error))
      .finally(() => setIsLoading(false));
  }, []);

  const navigateToChatRoom = (roomId) => {
    navigate(`/app/chat/${roomId}`);
  };

  const handleInitiateChat = () => {
    navigate("/app/chat/new");
  };

  if (isLoading) return <div className="p-4">Carregando Conversas...</div>;

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
        <span className="text-[#058789]">Caixa de Entrada</span> ({rooms.length}
        )
      </h1>
      <button
        onClick={handleInitiateChat}
        className="w-full bg-[#058789] hover:bg-[#2BB6A8] text-white font-semibold py-3 px-4 rounded-lg shadow-md mb-8 transition-colors flex items-center justify-center gap-2 transform hover:scale-[1.01] active:scale-100"
        title="Inicia uma conversa com um novo cliente"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 4v16m8-8H4"
          ></path>
        </svg>
        Iniciar Nova Conversa
      </button>
      {rooms.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 bg-white rounded-xl border border-dashed border-gray-300 shadow-inner text-center">
          <svg
            className="w-16 h-16 text-indigo-400 mb-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.596 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            ></path>
          </svg>

          <p className="text-xl font-semibold text-gray-800 mb-2">
            Caixa de Entrada Limpa
          </p>

          <p className="text-sm text-gray-600">
            Você ainda não possui conversas ativas. Use o botão acima para
            iniciar um chat com seus clientes.
          </p>
        </div>
      ) : (
        rooms.map((room) => (
          <div
            key={room._id}
            onClick={() => navigateToChatRoom(room._id)}
            className="flex items-center p-4 mb-3 bg-white rounded-xl shadow-sm hover:shadow-md cursor-pointer transition-all duration-200 border-l-4 border-[#2BB6A8] hover:border-[#058789]"
          >
            <div className="w-10 h-10 bg-[#A5E5D9] rounded-full flex items-center justify-center text-[#058789] font-bold text-sm mr-3 flex-shrink-0">
              {room.name ? room.name[0].toUpperCase() : "C"}
            </div>
            <div className="flex-grow">
              <p className="font-semibold text-gray-800 truncate">
                {room.name ||
                  `Conversa com Tutor (ID: ${room._id.substring(0, 4)}...)`}
              </p>
            </div>
            <small className="text-gray-500 text-xs flex-shrink-0 ml-4">
              {new Date(room.updatedAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </small>
          </div>
        ))
      )}
    </div>
  );
}

export default ChatListPage;
