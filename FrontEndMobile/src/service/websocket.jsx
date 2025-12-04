import { io } from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../config/api.jsx';

class WebSocketService {
    constructor() {
        this.socket = null;
        this.listeners = new Map();
        this.connectedRooms = new Set();
        this.baseURL = API_BASE_URL;
        this.isConnecting = false;
        this.isAuthenticated = false;
        this.reconnectionAttempts = 0;
        this.maxReconnectionAttempts = 5;
    }

    async connect() {
        try {
            if (this.isConnecting) {
                console.log('🔄 [WebSocket] Já está conectando...');
                return;
            }

            this.isConnecting = true;
            
            const token = await AsyncStorage.getItem('userToken');
            
            if (!token) {
                console.error('❌ [WebSocket] Token não encontrado');
                this.isConnecting = false;
                throw new Error('Token não encontrado');
            }

            console.log('🔌 [WebSocket] Tentando conectar ao namespace /chat...');

            if (this.socket) {
                this.disconnect();
            }

            // IMPORTANTE: Conectar ao namespace /chat como definido no back-end
            this.socket = io(`${this.baseURL}/chat`, {
                transports: ['websocket', 'polling'],
                auth: { token },
                reconnection: true,
                reconnectionAttempts: 5,
                reconnectionDelay: 1000,
                timeout: 5000,
                forceNew: true,
                path: '/socket.io', // Certifique-se que este caminho está correto
                query: {
                    token: token
                }
            });

            this.setupEventListeners();
            
        } catch (error) {
            console.error('❌ [WebSocket] Erro na conexão:', error.message);
            this.isConnecting = false;
            throw error;
        }
    }

    setupEventListeners() {
        if (!this.socket) return;

        this.socket.on('connect', () => {
            console.log('✅ [WebSocket] Conectado ao namespace /chat. ID:', this.socket.id);
            this.isConnecting = false;
            this.reconnectionAttempts = 0;
            this.isAuthenticated = true;
            
            // Emite evento de conexão para listeners
            this.emitToListeners('connected', { socketId: this.socket.id });
        });

        this.socket.on('disconnect', (reason) => {
            console.log('❌ [WebSocket] Desconectado:', reason);
            this.isConnecting = false;
            this.isAuthenticated = false;
            this.emitToListeners('disconnected', { reason });
            
            // Tentar reconectar se não foi desconexão manual
            if (reason !== 'io client disconnect') {
                this.attemptReconnection();
            }
        });

        this.socket.on('connect_error', (error) => {
            console.error('⚠️ [WebSocket] Erro de conexão:', error.message);
            this.isConnecting = false;
            this.isAuthenticated = false;
            this.emitToListeners('connection_error', { error: error.message });
        });

        // Evento específico do back-end
        this.socket.on('newMessage', (message) => {
            console.log('📩 [WebSocket] Nova mensagem recebida:', message);
            this.emitToListeners('newMessage', message);
        });

        // Confirmação de mensagem enviada (opcional - você pode implementar no back-end)
        this.socket.on('messageSent', (data) => {
            console.log('✅ [WebSocket] Mensagem confirmada:', data);
            this.emitToListeners('messageSent', data);
        });

        // Evento de erro
        this.socket.on('error', (error) => {
            console.error('❌ [WebSocket] Erro:', error);
            this.emitToListeners('error', error);
        });
    }

    async attemptReconnection() {
        if (this.reconnectionAttempts >= this.maxReconnectionAttempts) {
            console.log('⏹️ [WebSocket] Máximo de tentativas de reconexão alcançado');
            return;
        }

        this.reconnectionAttempts++;
        console.log(`🔄 [WebSocket] Tentativa de reconexão ${this.reconnectionAttempts}/${this.maxReconnectionAttempts}`);
        
        setTimeout(async () => {
            try {
                await this.connect();
            } catch (error) {
                console.error(`❌ [WebSocket] Falha na reconexão ${this.reconnectionAttempts}:`, error.message);
            }
        }, 2000 * this.reconnectionAttempts); // Backoff exponencial
    }

    // Método atualizado para enviar mensagem (compatível com o back-end)
    async sendMessage(roomId, content) {
        console.log('📤 [WebSocket] Enviando mensagem para sala:', roomId);
        
        if (!this.socket || !this.socket.connected) {
            console.log('⚠️ [WebSocket] Socket não conectado');
            throw new Error('Socket não conectado. Por favor, conecte-se primeiro.');
        }

        if (!this.isAuthenticated) {
            console.log('⚠️ [WebSocket] Usuário não autenticado');
            throw new Error('Usuário não autenticado');
        }

        return new Promise((resolve, reject) => {
            // Timeout de 5 segundos
            const timeout = setTimeout(() => {
                reject(new Error('Timeout ao enviar mensagem'));
            }, 5000);

            // Emitir conforme definido no ChatGateway
            this.socket.emit('sendMessage', { 
                roomId, 
                content 
            }, (response) => {
                clearTimeout(timeout);
                
                if (response && response.error) {
                    reject(new Error(response.error));
                } else {
                    resolve(response || { success: true });
                }
            });
        });
    }

    // Entrar em uma sala (subscribe)
    joinRoom(roomId) {
        if (!this.socket || !this.socket.connected) {
            console.warn('⚠️ [WebSocket] Não é possível entrar na sala - socket desconectado');
            return false;
        }

        console.log(`🚪 [WebSocket] Entrando na sala: ${roomId}`);
        
        // Emitir evento conforme definido no ChatGateway
        this.socket.emit('joinRoom', roomId);
        this.connectedRooms.add(roomId);
        
        return true;
    }

    // Sair de uma sala
    leaveRoom(roomId) {
        if (this.socket && this.socket.connected) {
            this.socket.emit('leaveRoom', roomId);
            this.connectedRooms.delete(roomId);
            console.log(`🚪 [WebSocket] Saindo da sala: ${roomId}`);
        }
    }

    // Verificar se está em uma sala
    isInRoom(roomId) {
        return this.connectedRooms.has(roomId);
    }

    // Método para testar eventos do back-end
    testBackendEvents() {
        if (!this.socket || !this.socket.connected) {
            console.warn('⚠️ [WebSocket] Socket não conectado para teste');
            return;
        }

        console.log('🧪 [WebSocket] Testando eventos do back-end...');
        
        // Teste de ping (implemente um handler no back-end se quiser)
        this.socket.emit('ping', { timestamp: Date.now() }, (response) => {
            console.log('📡 [WebSocket] Resposta do ping:', response);
        });
    }

    // Gerenciamento de listeners
    on(event, callback) {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, []);
        }
        this.listeners.get(event).push(callback);
        
        // Se já estiver conectado, registrar no socket também
        if (this.socket && (event === 'newMessage' || event === 'messageSent')) {
            this.socket.on(event, callback);
        }
    }

    off(event, callback) {
        if (this.listeners.has(event)) {
            const callbacks = this.listeners.get(event);
            const index = callbacks.indexOf(callback);
            if (index > -1) {
                callbacks.splice(index, 1);
            }
        }
        
        // Remover do socket também
        if (this.socket) {
            this.socket.off(event, callback);
        }
    }

    emitToListeners(event, data) {
        if (this.listeners.has(event)) {
            this.listeners.get(event).forEach(callback => {
                try {
                    callback(data);
                } catch (error) {
                    console.error(`❌ [WebSocket] Erro no listener ${event}:`, error);
                }
            });
        }
    }

    // Getters
    isConnected() {
        return this.socket && this.socket.connected && this.isAuthenticated;
    }

    getSocketId() {
        return this.socket ? this.socket.id : null;
    }

    // Limpar todas as salas
    clearRooms() {
        this.connectedRooms.clear();
    }

    // Desconectar completamente
    disconnect() {
        if (this.socket) {
            console.log('👋 [WebSocket] Desconectando...');
            this.socket.disconnect();
            this.socket = null;
            this.isAuthenticated = false;
            this.connectedRooms.clear();
            this.reconnectionAttempts = 0;
        }
    }

    // Método para obter status completo
    getStatus() {
        return {
            connected: this.isConnected(),
            socketId: this.getSocketId(),
            authenticated: this.isAuthenticated,
            rooms: Array.from(this.connectedRooms),
            reconnectionAttempts: this.reconnectionAttempts
        };
    }
}

export default new WebSocketService();