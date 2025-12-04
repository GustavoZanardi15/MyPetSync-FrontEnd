import { io } from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../config/api';

// Sempre wss:// em produção para mobile
const SOCKET_URL = `${API_BASE_URL.replace("http", "ws")}/chat`;

class WebSocketService {
    constructor() {
        this.socket = null;
        this.listeners = new Map();
        this.connected = false;
        this.currentRoomId = null;
        this.connecting = false; // evita múltiplas conexões
        
        // 🔥 ADICIONAR BINDINGS
        this.restoreRoomFromStorage = this.restoreRoomFromStorage.bind(this);
        this.saveRoomToStorage = this.saveRoomToStorage.bind(this);
        
        // Restaurar sala ao iniciar
        this.restoreRoomFromStorage();
    }

    // 🔥 MÉTODO PARA SALVAR NO STORAGE
    async saveRoomToStorage(roomId) {
        try {
            await AsyncStorage.setItem('lastChatRoom', roomId);
        } catch (error) {
            console.error("❌ Erro ao salvar sala:", error);
        }
    }

    // 🔥 MÉTODO PARA RESTAURAR DO STORAGE
    async restoreRoomFromStorage() {
        try {
            const savedRoom = await AsyncStorage.getItem('lastChatRoom');
            if (savedRoom) {
                this.currentRoomId = savedRoom;
            }
        } catch (error) {
            console.error("❌ Erro ao restaurar sala:", error);
        }
    }

    // 🔥 Conecta apenas uma vez
    async connect() {
        if (this.connected) {
            console.log("⚠️ [WS] Já conectado");
            return true;
        }

        if (this.connecting) {
            console.log("⏳ [WS] Conexão já em andamento...");
            return false;
        }

        this.connecting = true;
        console.log("🔌 [WS] Iniciando conexão...");

        const token = await AsyncStorage.getItem("userToken");
        if (!token) {
            this.connecting = false;
            throw new Error("Token não encontrado");
        }

        this.socket = io(SOCKET_URL, {
            auth: { token },
            transports: ["websocket"],
            reconnection: true,
            reconnectionAttempts: 10,
            reconnectionDelay: 1000,
        });

        this.setupEventListeners();

        return new Promise((resolve, reject) => {
            this.socket.once("connect", () => {
                this.connected = true;
                this.connecting = false;
                console.log("✅ [WS] Conectado:", this.socket.id);

                // se já tem sala selecionada, entra nela
                if (this.currentRoomId) {
                    this.joinRoom(this.currentRoomId);
                }

                resolve(true);
            });

            this.socket.once("connect_error", (err) => {
                this.connecting = false;
                console.error("❌ [WS] Erro ao conectar:", err.message);
                reject(err);
            });
        });
    }

    setupEventListeners() {
        if (!this.socket) return;

        this.socket.on("connect", () => {
            this.connected = true;
            console.log("🔄 [WS] Reconectado:", this.socket.id);

            if (this.currentRoomId) {
                this.joinRoom(this.currentRoomId);
            }

            this.emitToListeners("connected");
        });

        this.socket.on("disconnect", (reason) => {
            this.connected = false;
            console.log("❌ [WS] Desconectado:", reason);
            this.emitToListeners("disconnected", reason);
        });

        this.socket.on("connect_error", (err) => {
            console.log("⚠️ [WS] Erro ao conectar:", err.message);
            this.emitToListeners("connection_error", err.message);
        });

        // Recebimento de mensagens
        this.socket.on("newMessage", (message) => {
            console.log("📩 [WS] Nova mensagem:", message);
            this.emitToListeners("newMessage", message);
        });
    }

    // ------------------------------
    // 🔥 SALAS
    // ------------------------------
    joinRoom(roomId) {
        if (!roomId) return;

        this.currentRoomId = roomId;
        
        // 🔥 SALVAR NO STORAGE
        this.saveRoomToStorage(roomId);

        if (!this.connected) {
            console.log("⏳ [WS] Aguardando conexão para entrar na sala...");
            return;
        }

        console.log("🚪 [WS] Entrando na sala:", roomId);
        this.socket.emit("joinRoom", roomId);
    }

    leaveRoom(roomId) {
        if (this.connected) {
            console.log("🚪 [WS] Saindo da sala:", roomId);
            this.socket.emit("leaveRoom", roomId);
        }

        if (this.currentRoomId === roomId) {
            this.currentRoomId = null;
            // 🔥 REMOVER DO STORAGE
            AsyncStorage.removeItem('lastChatRoom');
        }
    }

    getCurrentRoom() {
        return this.currentRoomId;
    }

    // ------------------------------
    // 🔥 ENVIO DE MENSAGEM
    // ------------------------------
    async sendMessage(roomId, content) {
        return new Promise((resolve, reject) => {
            if (!this.connected) {
                reject(new Error("WebSocket não está conectado"));
                return;
            }

            if (!roomId || !content.trim()) {
                reject(new Error("RoomId e conteúdo são obrigatórios"));
                return;
            }

            console.log(`📤 [WS] Enviando mensagem → sala ${roomId}:`, content);

            this.socket.emit(
                "sendMessage",
                { roomId, content },
                (response) => {
                    if (response?.error) {
                        reject(new Error(response.error));
                    } else {
                        resolve(response || { success: true });
                    }
                }
            );
        });
    }

    // ------------------------------
    // 🔥 EVENTOS CUSTOM
    // ------------------------------
    on(event, callback) {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, []);
        }

        this.listeners.get(event).push(callback);
    }

    // 🔥 ADICIONAR MÉTODO off() QUE FALTAVA
    off(event, callbackToRemove) {
        if (!this.listeners.has(event)) {
            return;
        }

        if (callbackToRemove) {
            // Remove callback específico
            const callbacks = this.listeners.get(event);
            const filtered = callbacks.filter(cb => cb !== callbackToRemove);
            this.listeners.set(event, filtered);
        } else {
            // Remove todos os callbacks do evento
            this.listeners.delete(event);
        }
    }

    emitToListeners(event, data) {
        const list = this.listeners.get(event);
        if (list) {
            list.forEach((cb) => cb(data));
        }
    }

    // ------------------------------
    // 🔥 ESTADO
    // ------------------------------
    isSocketConnected() {
        return this.connected === true;
    }

    disconnect() {
        if (this.socket) {
            console.log("👋 [WS] Desconectando...");
            this.socket.disconnect();
        }

        this.socket = null;
        this.connected = false;
        this.currentRoomId = null;
        this.listeners.clear();
        this.connecting = false;
    }
}

export default new WebSocketService();