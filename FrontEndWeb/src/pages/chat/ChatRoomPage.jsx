import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useChatSocket } from "../../hooks/useChatSocket";
import api from "../../utils/Api";
import { useAuth } from "../../context/AuthContext";

function ChatRoomPage() {
  const { roomId } = useParams();
  const { user } = useAuth();
  const currentUserId = user?.userId;

  const { messages, sendMessage, isConnected, setHistory} =
    useChatSocket(roomId);

  const [inputContent, setInputContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [room, setRoom] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!roomId) return;

    const loadRoomAndMessages = async () => {
      try {
        const roomRes = await api.get(`/chat/rooms/${roomId}`);
        setRoom(roomRes.data);

        const messagesRes = await api.get(`/chat/rooms/${roomId}/messages`);
        setHistory(messagesRes.data);
      } catch (error) {
        console.error("Erro ao carregar sala ou histórico:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadRoomAndMessages();
  }, [roomId, setHistory]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (inputContent.trim()) {
      sendMessage(inputContent);
      setInputContent("");
    }
  };

  const displayName = (() => {
    if (!room || !room.participants || !currentUserId) {
      return `Conversa na Sala ${roomId.substring(0, 8)}`;
    }

    const participants = room.participants;

    const otherParticipant =
      participants.find(
        (p) => p._id !== currentUserId && p.tipo_usuario === "tutor"
      ) ||
      participants.find((p) => p._id !== currentUserId) ||
      null;

    return (
      otherParticipant?.nome ||
      room.name ||
      `Conversa na Sala ${roomId.substring(0, 8)}`
    );
  })();

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-full">
        Carregando chat...
      </div>
    );

  return (
    <div className="flex flex-col h-full w-full border-x border-gray-200">
      <header className="p-4 border-b bg-slate-200 sticky top-0 z-10">
        <h1 className="text-xl font-bold text-[#045f61]">
          {displayName}
        </h1>
        <p
          className={`text-xs ${
            isConnected ? "text-green-500" : "text-red-500"
          }`}
        >
          {isConnected ? "Conectado" : "Tentando reconectar..."}
        </p>
      </header>
      <div className="flex-grow overflow-y-auto p-4 space-y-3 bg-gray-100">
        {messages.map((msg) => (
          <div
            key={msg._id}
            className={`flex ${
              msg.senderId === currentUserId ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[75%] px-4 py-2 rounded-xl text-white shadow-md break-words ${
                msg.senderId === currentUserId
                  ? "bg-indigo-500 rounded-br-none"
                  : "bg-gray-700 rounded-tl-none"
              }`}
            >
              {msg.content}
              <div className="text-xs text-right mt-1 opacity-75">
                {new Date(msg.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form
        onSubmit={handleSend}
        className="p-4 border-t bg-white flex sticky bottom-0"
      >
        <input
          type="text"
          value={inputContent}
          onChange={(e) => setInputContent(e.target.value)}
          placeholder={
            isConnected ? "Digite sua mensagem..." : "Aguardando conexão..."
          }
          className="flex-grow p-3 border border-gray-300 rounded-xl focus:ring-indigo-500 focus:border-indigo-500"
          disabled={!isConnected}
        />
        <button
          type="submit"
          className="ml-3 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 disabled:bg-indigo-300"
          disabled={!isConnected || !inputContent.trim()}
        >
          Enviar
        </button>
      </form>
    </div>
  );
}

export default ChatRoomPage;
