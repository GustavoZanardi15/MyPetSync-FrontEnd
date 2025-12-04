import React, { useState, useEffect, useRef, useCallback } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Pressable,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    Image,
    Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../../../src/service/api";
import websocket from "../../../../src/service/websocket";

// 🔥 VARIÁVEIS GLOBAIS PARA MANTER O ESTADO
let globalMessages = [];
let globalRoomId = null;
let globalCurrentUserId = null;
let globalIsConnected = false;
let isInitialized = false;

// 🔥 CHAVE DE ARMAZENAMENTO
const CHAT_STORAGE_KEY = 'chat_state_';

export default function ChatScreen() {
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState("");
    const [providerName, setProviderName] = useState("Prestador");
    const [loadingMessages, setLoadingMessages] = useState(false);
    const [providerPhoto, setProviderPhoto] = useState(null);
    const [roomId, setRoomId] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [currentUserId, setCurrentUserId] = useState(null);
    const [debugInfo, setDebugInfo] = useState("");

    const router = useRouter();
    const { providerId, providerUserId, providerName: pName, providerPhoto: pPhoto } = useLocalSearchParams();

    const flatListRef = useRef(null);
    const isMountedRef = useRef(true);
    const messageHandlerRef = useRef(null);
    const connectedHandlerRef = useRef(null);
    const disconnectedHandlerRef = useRef(null);

    // 🔥 SINCRONIZAR ESTADO GLOBAL
    const syncGlobalState = useCallback(async () => {
        try {
            if (!providerId || !roomId) return;
            
            await AsyncStorage.setItem(
                `${CHAT_STORAGE_KEY}${providerId}`,
                JSON.stringify({
                    messages: messages,
                    roomId: roomId,
                    providerName: providerName,
                    providerPhoto: providerPhoto,
                    timestamp: Date.now()
                })
            );
            
            // Atualizar variáveis globais
            globalMessages = [...messages];
            globalRoomId = roomId;
            globalCurrentUserId = currentUserId;
            globalIsConnected = isConnected;
            
        } catch (error) {
            console.error("❌ Erro ao salvar estado:", error);
        }
    }, [messages, roomId, providerId, providerName, providerPhoto, currentUserId, isConnected]);

    // 🔥 CARREGAR ESTADO SALVO
    const loadSavedState = useCallback(async () => {
        try {
            if (!providerId) return null;
            
            const saved = await AsyncStorage.getItem(`${CHAT_STORAGE_KEY}${providerId}`);
            if (saved) {
                const parsed = JSON.parse(saved);
                
                // Verificar se é recente (menos de 1 hora)
                if (Date.now() - parsed.timestamp < 3600000) {
                    setMessages(parsed.messages || []);
                    globalMessages = parsed.messages || [];
                    
                    if (parsed.providerName) setProviderName(parsed.providerName);
                    if (parsed.providerPhoto) setProviderPhoto(parsed.providerPhoto);
                    
                    return parsed.roomId; // Retorna o roomId salvo
                }
            }
        } catch (error) {
            console.error("❌ Erro ao carregar estado salvo:", error);
        }
        return null;
    }, [providerId]);

    // 🔥 OBTER USERID
    const getCurrentUserId = useCallback(async () => {
        try {
            let userId = await AsyncStorage.getItem("userId");
            
            if (!userId) {
                const token = await AsyncStorage.getItem("userToken");
                if (token) {
                    const userResponse = await api.get("/users/me", {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    userId = userResponse.data?._id || userResponse.data?.id;
                    if (userId) {
                        await AsyncStorage.setItem("userId", userId);
                    }
                }
            }
            
            console.log("✅ UserId obtido:", userId);
            setCurrentUserId(userId);
            globalCurrentUserId = userId;
            return userId;
            
        } catch (error) {
            console.error("❌ Erro ao obter userId:", error);
            return null;
        }
    }, []);

    // 🔥 BUSCAR/CRIAR SALA
    const fetchOrCreateRoom = useCallback(async (userId) => {
        try {
            if (!userId) throw new Error("Usuário não identificado");
            if (!providerId) throw new Error("Provider não identificado");

            const token = await AsyncStorage.getItem("userToken");
            if (!token) throw new Error("Token não encontrado");

            // 1. Buscar salas existentes
            setDebugInfo("Buscando salas existentes...");
            const roomsResponse = await api.get("/chat/rooms", {
                headers: { Authorization: `Bearer ${token}` },
            });

            console.log(`📦 ${roomsResponse.data.length} salas encontradas`);

            // 2. Procurar sala com ambos os usuários
            const existingRoom = roomsResponse.data.find(room => {
                const participants = room.participants || [];
                const participantIds = participants.map(p => p._id || p.id);
                return (
                    participantIds.includes(userId) && 
                    participantIds.includes(providerUserId)
                );
            });

            if (existingRoom) {
                console.log("✅ Sala existente encontrada:", existingRoom._id);
                setDebugInfo(`Sala existente: ${existingRoom._id}`);
                return existingRoom;
            }

            // 3. Criar nova sala (COM AMBOS OS USUÁRIOS)
            setDebugInfo("Criando nova sala...");
            console.log("🆕 Criando nova sala...");
            const payload = {
                participants: [userId, providerUserId], // 🔥 AMBOS OS USUÁRIOS
                name: `Chat com ${pName || 'Cliente'}`,
            };

            const newRoom = await api.post("/chat/rooms", payload, {
                headers: { Authorization: `Bearer ${token}` },
            });

            console.log("✅ Nova sala criada:", newRoom.data._id);
            setDebugInfo(`Nova sala criada: ${newRoom.data._id}`);
            return newRoom.data;

        } catch (error) {
            console.error("❌ Erro ao buscar/criar sala:", error.message);
            setDebugInfo(`Erro: ${error.message}`);
            throw error;
        }
    }, [providerUserId, pName]);

    // 🔥 CARREGAR MENSAGENS DA API
    const loadMessages = useCallback(async (roomId) => {
        if (!roomId) return [];

        try {
            setDebugInfo(`Carregando mensagens da sala ${roomId}...`);
            const token = await AsyncStorage.getItem("userToken");
            const response = await api.get(`/chat/rooms/${roomId}/messages`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            console.log(`📝 ${response.data.length} mensagens carregadas`);
            setDebugInfo(`${response.data.length} mensagens carregadas`);

            return response.data.map(msg => ({
                id: msg._id,
                text: msg.content,
                senderId: msg.senderId,
                timestamp: msg.createdAt,
                isSending: false,
                failed: false,
            }));

        } catch (error) {
            console.error("❌ Erro ao carregar mensagens:", error.message);
            setDebugInfo(`Erro ao carregar: ${error.message}`);
            return [];
        }
    }, []);

    // 🔥 ENVIAR MENSAGEM
    const sendMessage = async () => {
        if (!text.trim() || !roomId || !currentUserId) return;

        const tempMessageId = `temp_${Date.now()}`;
        const messageText = text.trim();

        // Adiciona localmente
        const newMessage = {
            id: tempMessageId,
            text: messageText,
            senderId: currentUserId,
            timestamp: new Date().toISOString(),
            isSending: true,
        };

        const updatedMessages = [...messages, newMessage];
        setMessages(updatedMessages);
        setText("");
        setDebugInfo(`Enviando: "${messageText.substring(0, 20)}..."`);

        try {
            // Verifica se WebSocket está conectado
            if (!websocket.isSocketConnected()) {
                console.log("🔄 WebSocket não conectado, tentando conectar...");
                await websocket.connect();
            }

            // Envia via WebSocket
            await websocket.sendMessage(roomId, messageText);
            console.log("✅ Mensagem enviada via WebSocket");
            setDebugInfo("Mensagem enviada via WebSocket");
            
        } catch (error) {
            console.error("❌ Erro ao enviar mensagem:", error.message);
            setDebugInfo(`Erro no envio: ${error.message}`);
            
            // Fallback para API REST
            try {
                const token = await AsyncStorage.getItem("userToken");
                await api.post(`/chat/rooms/${roomId}/messages`, {
                    content: messageText,
                }, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                console.log("✅ Mensagem enviada via API REST");
                setDebugInfo("Mensagem enviada via API REST (fallback)");

                // Atualiza para mensagem real
                const updated = messages.map(msg =>
                    msg.id === tempMessageId
                        ? { ...msg, isSending: false, id: `api_${Date.now()}` }
                        : msg
                );
                setMessages(updated);

            } catch (apiError) {
                console.error("❌ Erro no fallback API:", apiError.message);
                setDebugInfo(`Erro no fallback: ${apiError.message}`);
                
                // Marca como falha
                const updated = messages.map(msg =>
                    msg.id === tempMessageId
                        ? { ...msg, isSending: false, failed: true }
                        : msg
                );
                setMessages(updated);
            }
        }
    };

    // 🔥 LISTENER DE NOVAS MENSAGENS (GLOBAL)
    const setupMessageListener = useCallback((chatRoomId, userId) => {
        const handleNewMessage = (message) => {
            console.log("📩 Nova mensagem recebida via WebSocket:", message);
            setDebugInfo(`Nova mensagem: ${message.content.substring(0, 30)}...`);
            
            if (message.roomId === chatRoomId && isMountedRef.current) {
                const isFromMe = message.senderId === userId;
                const newMsg = {
                    id: message._id,
                    text: message.content,
                    senderId: message.senderId,
                    timestamp: message.createdAt,
                    isSending: false,
                    failed: false,
                };

                // Atualiza estado local e global
                setMessages(prev => {
                    // Substituir mensagem temporária se existir
                    const existingTempIndex = prev.findIndex(msg => 
                        msg.isSending && msg.text === newMsg.text
                    );
                    
                    if (existingTempIndex > -1) {
                        const updated = [...prev];
                        updated[existingTempIndex] = newMsg;
                        console.log("🔄 Mensagem temporária substituída");
                        return updated;
                    }
                    
                    // Adicionar se não existir
                    if (!prev.some(msg => msg.id === newMsg.id)) {
                        const updated = [...prev, newMsg];
                        console.log("➕ Nova mensagem adicionada");
                        return updated;
                    }
                    
                    return prev;
                });
            }
        };

        messageHandlerRef.current = handleNewMessage;
        websocket.on('newMessage', handleNewMessage);
        
        return handleNewMessage;
    }, []);

    // 🔥 INICIALIZAR CHAT
    useEffect(() => {
        console.log("🚀 Inicializando chat...");
        console.log("ProviderId:", providerId);
        console.log("ProviderName:", pName);

        if (!providerId) {
            Alert.alert("Erro", "Prestador não identificado");
            router.back();
            return;
        }

        if (pName) setProviderName(pName);
        if (pPhoto) setProviderPhoto(pPhoto);

        isMountedRef.current = true;

        const initializeChat = async () => {
            setLoadingMessages(true);
            setDebugInfo("Inicializando chat...");

            try {
                // 1. Tentar carregar estado salvo primeiro
                const savedRoomId = await loadSavedState();
                
                // 2. Obter userId
                const userId = await getCurrentUserId();
                if (!userId) throw new Error("Não foi possível identificar o usuário");

                let chatRoomId = savedRoomId;
                
                // 3. Se não tem sala salva, buscar/criar
                if (!chatRoomId) {
                    const roomData = await fetchOrCreateRoom(userId);
                    chatRoomId = roomData._id;
                }
                
                console.log("📦 RoomId:", chatRoomId);
                setRoomId(chatRoomId);

                // 4. Carregar mensagens da API se não tiver salvas ou se for sala nova
                if (messages.length === 0 || !savedRoomId) {
                    const apiMessages = await loadMessages(chatRoomId);
                    setMessages(apiMessages);
                }

                // 5. Configurar WebSocket
                setDebugInfo("Conectando WebSocket...");
                
                try {
                    await websocket.connect();
                    setIsConnected(true);
                    setDebugInfo("WebSocket conectado!");
                    
                    // 🔥 IMPORTANTE: Entrar na sala
                    websocket.joinRoom(chatRoomId);
                    console.log("🚪 Entrou na sala:", chatRoomId);
                    
                } catch (wsError) {
                    console.warn("⚠️ WebSocket não conectado:", wsError.message);
                    setDebugInfo(`WebSocket offline: ${wsError.message}`);
                    setIsConnected(false);
                }

                // 6. Configurar listeners
                setupMessageListener(chatRoomId, userId);

                const handleConnected = () => {
                    console.log("✅ WebSocket conectado");
                    setIsConnected(true);
                    setDebugInfo("WebSocket conectado!");
                    if (chatRoomId) websocket.joinRoom(chatRoomId);
                };

                const handleDisconnected = () => {
                    console.log("❌ WebSocket desconectado");
                    setIsConnected(false);
                    setDebugInfo("WebSocket desconectado");
                };

                connectedHandlerRef.current = handleConnected;
                disconnectedHandlerRef.current = handleDisconnected;
                
                websocket.on('connected', handleConnected);
                websocket.on('disconnected', handleDisconnected);

                // Marcar como inicializado
                isInitialized = true;

            } catch (error) {
                console.error("❌ Erro na inicialização:", error);
                setDebugInfo(`Erro: ${error.message}`);
                Alert.alert("Erro", "Não foi possível carregar a conversa");
            } finally {
                setLoadingMessages(false);
                console.log("✅ Chat inicializado");
            }
        };

        initializeChat();

        // 🔥 SALVAR ESTADO PERIODICAMENTE
        const saveInterval = setInterval(() => {
            if (roomId && messages.length > 0) {
                syncGlobalState();
            }
        }, 30000); // Salva a cada 30 segundos

        // 🔥 LIMPEZA
        return () => {
            console.log("🏠 Componente desmontado");
            isMountedRef.current = false;
            clearInterval(saveInterval);
            
            // Remover listeners
            if (messageHandlerRef.current) {
                websocket.off('newMessage', messageHandlerRef.current);
            }
            if (connectedHandlerRef.current) {
                websocket.off('connected', connectedHandlerRef.current);
            }
            if (disconnectedHandlerRef.current) {
                websocket.off('disconnected', disconnectedHandlerRef.current);
            }
            
            // Salvar estado final
            syncGlobalState();
        };
    }, [providerId]);

    // 🔥 SINCRONIZAR ESTADO QUANDO MENSAGENS MUDAM
    useEffect(() => {
        if (messages.length > 0 && roomId) {
            syncGlobalState();
        }
    }, [messages, roomId]);

    // 🔥 ROLAR PARA O FINAL
    useEffect(() => {
        if (messages.length > 0 && flatListRef.current) {
            setTimeout(() => {
                flatListRef.current?.scrollToEnd({ animated: true });
            }, 100);
        }
    }, [messages]);

    // 🔥 DEBUG WEBSOCKET
    const debugWebSocket = async () => {
        console.log("🔧 Debug do WebSocket:");
        console.log("RoomId:", roomId);
        console.log("UserId:", currentUserId);
        console.log("ProviderId:", providerId);
        console.log("WebSocket conectado?", websocket.isSocketConnected());
        console.log("Mensagens:", messages.length);
        
        Alert.alert(
            "Debug Chat",
            `RoomId: ${roomId || 'N/A'}\n` +
            `UserId: ${currentUserId || 'N/A'}\n` +
            `ProviderId: ${providerId || 'N/A'}\n` +
            `WebSocket: ${websocket.isSocketConnected() ? 'Conectado' : 'Desconectado'}\n` +
            `Mensagens: ${messages.length}\n` +
            `Status: ${debugInfo}`,
            [{ text: "OK" }]
        );
    };

    // 🔥 RENDERIZAR MENSAGEM
    const renderMessage = ({ item }) => {
        const isMyMessage = item.senderId === currentUserId;
        
        return (
            <View
                style={[
                    styles.messageBubble,
                    isMyMessage ? styles.myMessage : styles.otherMessage
                ]}
            >
                <Text style={styles.messageText}>{item.text}</Text>
                <View style={styles.messageFooter}>
                    <Text style={styles.messageTime}>
                        {new Date(item.timestamp).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                        })}
                    </Text>
                    {isMyMessage && item.isSending && (
                        <ActivityIndicator size="small" color="#666" />
                    )}
                    {isMyMessage && item.failed && (
                        <TouchableOpacity onPress={() => {
                            setText(item.text);
                            sendMessage();
                        }}>
                            <Ionicons name="refresh-circle" size={16} color="#F44336" />
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        );
    };

    // 🔥 BOTÃO LIMPAR CACHE
    const clearCache = async () => {
        try {
            await AsyncStorage.removeItem(`${CHAT_STORAGE_KEY}${providerId}`);
            setMessages([]);
            Alert.alert("Sucesso", "Cache limpo!");
        } catch (error) {
            Alert.alert("Erro", "Falha ao limpar cache");
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.headerRow}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                    <Ionicons name="arrow-back" size={24} color={"#2F8B88"} />
                </TouchableOpacity>

                <View style={styles.avatarContainer}>
                    {providerPhoto ? (
                        <Image
                            source={{ uri: providerPhoto }}
                            style={styles.providerAvatar}
                            onError={() => setProviderPhoto(null)}
                        />
                    ) : (
                        <View style={styles.avatarPlaceholder}>
                            <Text style={styles.avatarText}>
                                {providerName[0]?.toUpperCase() || "P"}
                            </Text>
                        </View>
                    )}
                </View>

                <View style={styles.providerInfo}>
                    <Text style={styles.providerName} numberOfLines={1}>
                        {providerName}
                    </Text>
                    <Text style={[
                        styles.connectionStatus,
                        { color: isConnected ? '#4CAF50' : '#F44336' }
                    ]}>
                        • {isConnected ? 'Online' : 'Offline'}
                    </Text>
                    <Text style={styles.debugInfo} numberOfLines={1}>
                        {debugInfo}
                    </Text>
                </View>

                <TouchableOpacity onPress={debugWebSocket} style={styles.debugButton}>
                    <Ionicons name="bug-outline" size={20} color="#2F8B88" />
                </TouchableOpacity>
                
                <TouchableOpacity onPress={clearCache} style={styles.clearButton}>
                    <Ionicons name="trash-outline" size={20} color="#F44336" />
                </TouchableOpacity>
            </View>

            {/* Chat Area */}
            <KeyboardAvoidingView
                style={styles.chatContainer}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
            >
                {loadingMessages ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="#2F8B88" />
                        <Text style={styles.loadingText}>
                            Carregando conversa...
                        </Text>
                        <Text style={styles.debugText}>{debugInfo}</Text>
                    </View>
                ) : (
                    <>
                        <FlatList
                            ref={flatListRef}
                            data={messages}
                            keyExtractor={(item) => item.id}
                            contentContainerStyle={styles.chatListContent}
                            renderItem={renderMessage}
                            ListEmptyComponent={
                                <View style={styles.emptyChatContainer}>
                                    <Ionicons name="chatbubble-ellipses-outline" size={60} color="#C4EDE6" />
                                    <Text style={styles.emptyChatTitle}>Inicie uma conversa</Text>
                                    <Text style={styles.emptyChatText}>
                                        Envie uma mensagem para {providerName}
                                    </Text>
                                    <Text style={styles.debugText}>{debugInfo}</Text>
                                </View>
                            }
                            onContentSizeChange={() => {
                                if (messages.length > 0) {
                                    setTimeout(() => {
                                        flatListRef.current?.scrollToEnd({ animated: true });
                                    }, 100);
                                }
                            }}
                        />

                        {/* Input Area */}
                        <View style={styles.inputArea}>
                            <TextInput
                                style={[
                                    styles.input,
                                    !isConnected && styles.inputDisabled
                                ]}
                                placeholder={isConnected ? "Digite uma mensagem..." : "Conectando..."}
                                value={text}
                                onChangeText={setText}
                                multiline
                                maxLength={500}
                                editable={isConnected && !!roomId}
                            />
                            <Pressable
                                style={[
                                    styles.sendButton,
                                    (!text.trim() || !isConnected || !roomId) && styles.sendButtonDisabled
                                ]}
                                onPress={sendMessage}
                                disabled={!text.trim() || !isConnected || !roomId}
                            >
                                <Ionicons name="send" size={20} color="#fff" />
                            </Pressable>
                        </View>
                    </>
                )}
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F7F7',
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#e5e5e5',
        backgroundColor: '#fff',
    },
    backBtn: {
        marginRight: 12,
    },
    avatarContainer: {
        marginRight: 12,
    },
    providerAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    avatarPlaceholder: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#FFA500',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
    },
    providerInfo: {
        flex: 1,
    },
    providerName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2F8B88',
    },
    connectionStatus: {
        fontSize: 11,
        marginTop: 2,
    },
    debugInfo: {
        fontSize: 10,
        color: '#666',
        marginTop: 2,
        fontStyle: 'italic',
    },
    debugButton: {
        padding: 8,
    },
    clearButton: {
        padding: 8,
        marginLeft: 4,
    },
    chatContainer: {
        flex: 1,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 12,
        color: '#666',
    },
    debugText: {
        fontSize: 12,
        color: '#888',
        marginTop: 8,
        textAlign: 'center',
        paddingHorizontal: 20,
    },
    chatListContent: {
        padding: 16,
        paddingBottom: 8,
    },
    messageBubble: {
        maxWidth: '80%',
        padding: 12,
        borderRadius: 18,
        marginBottom: 8,
    },
    myMessage: {
        alignSelf: 'flex-end',
        backgroundColor: '#2F8B88',
        borderBottomRightRadius: 4,
    },
    otherMessage: {
        alignSelf: 'flex-start',
        backgroundColor: '#e5e5e5',
        borderBottomLeftRadius: 4,
    },
    messageText: {
        color: '#fff',
        fontSize: 16,
        lineHeight: 20,
    },
    messageFooter: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: 4,
    },
    messageTime: {
        fontSize: 11,
        color: 'rgba(255,255,255,0.7)',
        marginRight: 4,
    },
    emptyChatContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 60,
    },
    emptyChatTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginTop: 16,
    },
    emptyChatText: {
        fontSize: 14,
        color: '#666',
        marginTop: 8,
        textAlign: 'center',
    },
    inputArea: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        padding: 12,
        borderTopWidth: 1,
        borderTopColor: '#e5e5e5',
        backgroundColor: '#fff',
    },
    input: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 12,
        maxHeight: 100,
        fontSize: 16,
    },
    inputDisabled: {
        backgroundColor: '#f0f0f0',
        color: '#999',
    },
    sendButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#2F8B88',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 8,
    },
    sendButtonDisabled: {
        backgroundColor: '#ccc',
    },
});