import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useChatSocket } from "../../hooks/useChatSocket";
import api from "../../utils/Api";

function ChatRoomPage() {
  const { roomId } = useParams();
  const { messages, sendMessage, isConnected, setHistory, currentUserId } =
    useChatSocket(roomId);

  const [inputContent, setInputContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!roomId) return;

    api
      .get(`/chat/rooms/${roomId}/messages`)
      .then((response) => {
        setHistory(response.data);
      })
      .catch((error) => console.error("Erro ao carregar histórico:", error))
      .finally(() => setIsLoading(false));
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

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        Carregando chat...
      </div>
    );
  return (
    <div className="flex flex-col h-screen max-w-xl mx-auto border-x border-gray-200">
      <header className="p-4 border-b bg-white sticky top-0 z-10">
        <h1 className="text-xl font-bold text-indigo-700">
          Conversa na Sala {roomId.substring(0, 8)}
        </h1>
        <p
          className={`text-xs ${
            isConnected ? "text-green-500" : "text-red-500"
          }`}
        >
          {isConnected ? "Conectado" : "Tentando reconectar..."}
        </p>
      </header>

      <div className="flex-grow overflow-y-auto p-4 space-y-3 bg-gray-50">
        {messages.map((msg) => (
          <div
            key={msg._id}
            className={`flex ${
              msg.senderId === currentUserId ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[75%] px-4 py-2 rounded-xl text-white shadow-md ${
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
