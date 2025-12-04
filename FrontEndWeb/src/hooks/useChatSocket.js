import { useState, useEffect, useCallback } from "react";
import io from "socket.io-client";
import { useAuth } from "../context/AuthContext";
import { getToken } from "../services/authService";
import api from "../utils/Api";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "https://mypetsync-escoladeti-production.up.railway.app/chat";

export function useChatSocket(roomId) {
  const { user } = useAuth();
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const setHistory = useCallback((history) => {
    setMessages(history);
  }, []);

  const fetchHistory = useCallback(async () => {
    if (!roomId) return;
    try {
      const response = await api.get(`/chat/rooms/${roomId}/messages`);
      setHistory(response.data);
    } catch (e) {
      console.error("Erro ao carregar histórico de mensagens:", e);
    }
  }, [roomId, setHistory]);

  useEffect(() => {
    const currentToken = getToken();

    if (!currentToken || !roomId) return;

    const newSocket = io(SOCKET_URL, {
      auth: { token: currentToken },
      transports: ["websocket", "polling"],
    });

    newSocket.on("connect", () => {
      setIsConnected(true);
      console.log(`Socket conectado! ID: ${newSocket.id}`);
      newSocket.emit("joinRoom", roomId);
    });
    newSocket.on("newMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    newSocket.on("disconnect", () => {
      setIsConnected(false);
      console.log("Socket desconectado.");
    });

    setSocket(newSocket);
    fetchHistory();

    return () => {
      newSocket.disconnect();
    };
  }, [roomId, fetchHistory]);

  const sendMessage = useCallback(
    (content) => {
      if (socket && isConnected && content.trim()) {
        socket.emit("sendMessage", { roomId, content: content.trim() });
      }
    },
    [socket, isConnected, roomId]
  );

  const currentUserId = user?.userId;
  return { messages, sendMessage, isConnected, setHistory, currentUserId };
}
