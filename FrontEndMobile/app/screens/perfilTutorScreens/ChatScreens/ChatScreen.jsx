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

export default function ChatScreen() {
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState("");
    const [providerName, setProviderName] = useState("Prestador");
    const [providerSpecialty, setProviderSpecialty] = useState("");
    const [providerService, setProviderService] = useState("");
    const [loadingProvider, setLoadingProvider] = useState(false);
    const [loadingMessages, setLoadingMessages] = useState(false);
    const [providerPhoto, setProviderPhoto] = useState(null);
    const [roomId, setRoomId] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [isTestingConnection, setIsTestingConnection] = useState(false);
    
    const router = useRouter();
    const { providerId, providerName: pName, providerType: pType, providerPhoto: pPhoto } = useLocalSearchParams();
    
    const flatListRef = useRef(null);
    const wsInitialized = useRef(false);

    // Testar conexão WebSocket
    const testWebSocketConnection = useCallback(async () => {
        console.log("🧪 Testando conexão WebSocket...");
        setIsTestingConnection(true);
        
        try {
            // Testa se está conectado
            if (!websocket.isConnected()) {
                console.log("🔄 Não está conectado, tentando conectar...");
                await websocket.connect();
                
                // Aguarda conexão (máximo 3 segundos)
                await new Promise((resolve, reject) => {
                    let attempts = 0;
                    const maxAttempts = 30;
                    
                    const checkConnection = () => {
                        if (websocket.isConnected()) {
                            console.log("✅ Conectado!");
                            resolve();
                            return;
                        }
                        
                        attempts++;
                        if (attempts >= maxAttempts) {
                            console.warn("⏰ Timeout na conexão");
                            reject(new Error("Timeout na conexão WebSocket"));
                            return;
                        }
                        
                        setTimeout(checkConnection, 100);
                    };
                    
                    checkConnection();
                });
            }
            
            console.log("✅ Conexão WebSocket testada com sucesso");
            setIsConnected(true);
            return true;
        } catch (error) {
            console.error("❌ Erro ao testar conexão:", error.message);
            setIsConnected(false);
            return false;
        } finally {
            setIsTestingConnection(false);
        }
    }, []);

    // Gerar roomId simples
    const generateRoomId = useCallback(async () => {
        if (!providerId) return null;
        
        try {
            const userId = await AsyncStorage.getItem("userId");
            if (!userId) {
                const token = await AsyncStorage.getItem("userToken");
                if (token) {
                    try {
                        const userResponse = await api.get("/users/me", {
                            headers: { Authorization: `Bearer ${token}` },
                        });
                        const fetchedUserId = userResponse.data?._id || userResponse.data?.id;
                        if (fetchedUserId) {
                            await AsyncStorage.setItem("userId", fetchedUserId);
                            return `chat_${fetchedUserId}_${providerId}`;
                        }
                    } catch (error) {
                        console.log("⚠️ Não foi possível obter userId:", error.message);
                    }
                }
                return `chat_${Date.now()}_${providerId}`;
            }
            
            return `chat_${userId}_${providerId}`;
        } catch (error) {
            console.error("Erro ao gerar roomId:", error);
            return `chat_fallback_${providerId}`;
        }
    }, [providerId]);

    // Carregar mensagens locais
    const loadLocalMessages = useCallback(async (roomId) => {
        if (!roomId) return [];
        
        try {
            const savedMessages = await AsyncStorage.getItem(`chat_messages_${roomId}`);
            return savedMessages ? JSON.parse(savedMessages) : [];
        } catch (error) {
            console.error("Erro ao carregar mensagens:", error);
            return [];
        }
    }, []);

    // Salvar mensagens localmente
    const saveMessagesLocally = useCallback(async (roomId, messages) => {
        if (!roomId) return;
        
        try {
            await AsyncStorage.setItem(`chat_messages_${roomId}`, JSON.stringify(messages));
        } catch (error) {
            console.error("Erro ao salvar mensagens:", error);
        }
    }, []);

    // Enviar via API REST (fallback)
    const sendViaRestAPI = async (roomId, content, tempMessageId) => {
        try {
            console.log("📤 Tentando enviar via API REST...");
            const token = await AsyncStorage.getItem("userToken");
            
            if (!token) {
                throw new Error("Token não encontrado");
            }
            
            // Tenta enviar via API REST
            const response = await api.post('/chats/messages', {
                roomId: roomId,
                content: content,
                receiverId: providerId
            }, {
                headers: { Authorization: `Bearer ${token}` },
                timeout: 5000
            });
            
            console.log("✅ Mensagem enviada via API REST:", response.data);
            
            // Atualiza status
            setMessages(prev => {
                const updated = prev.map(msg => 
                    msg.id === tempMessageId 
                        ? { ...msg, isSending: false, id: `api_${Date.now()}` }
                        : msg
                );
                saveMessagesLocally(roomId, updated);
                return updated;
            });
            
            return true;
            
        } catch (apiError) {
            console.error("❌ Erro na API REST:", apiError.message);
            
            if (apiError.response?.status === 404) {
                // API não existe - modo offline
                return false;
            }
            throw apiError;
        }
    };

    // Enviar mensagem
    const sendMessage = async () => {
        if (!text.trim()) {
            console.warn("⚠️ Mensagem vazia");
            return;
        }

        if (!roomId) {
            Alert.alert("Erro", "Sala de chat não configurada");
            return;
        }

        console.log("📤 Tentando enviar mensagem:", text.trim());
        
        const tempMessageId = `temp_${Date.now()}`;
        const newMessage = {
            id: tempMessageId,
            text: text.trim(),
            sender: "me",
            timestamp: new Date().toISOString(),
            isSending: true
        };

        // Adiciona localmente
        setMessages(prev => {
            const newMessages = [...prev, newMessage];
            saveMessagesLocally(roomId, newMessages);
            return newMessages;
        });
        
        const messageText = text.trim();
        setText("");

        try {
            // Verifica conexão
            const isWsConnected = websocket.isConnected();
            console.log("📡 Status do WebSocket:", isWsConnected ? "✅ Conectado" : "❌ Desconectado");
            
            if (!isWsConnected) {
                console.log("🔄 Tentando reconectar...");
                await testWebSocketConnection();
                
                if (!websocket.isConnected()) {
                    console.log("⚠️ Não conseguiu conectar, usando modo offline");
                    throw new Error("offline_mode");
                }
            }

            console.log("🚀 Enviando mensagem via WebSocket...");
            
            // Tenta enviar via WebSocket com timeout
            try {
                const sendPromise = websocket.sendMessage(roomId, messageText);
                
                // Timeout de 3 segundos
                const timeoutPromise = new Promise((_, reject) => {
                    setTimeout(() => reject(new Error("Timeout WebSocket")), 3000);
                });
                
                await Promise.race([sendPromise, timeoutPromise]);
                
                console.log("✅ Mensagem enviada com sucesso via WebSocket");
                
                // Atualiza status
                setMessages(prev => {
                    const updated = prev.map(msg => 
                        msg.id === tempMessageId 
                            ? { ...msg, isSending: false, id: `sent_${Date.now()}` }
                            : msg
                    );
                    saveMessagesLocally(roomId, updated);
                    return updated;
                });
                
            } catch (wsError) {
                console.warn("⚠️ Erro no WebSocket:", wsError.message);
                
                // Fallback para API REST
                const apiSuccess = await sendViaRestAPI(roomId, messageText, tempMessageId);
                
                if (!apiSuccess) {
                    throw new Error("offline_mode");
                }
            }

        } catch (error) {
            console.error("❌ Erro geral ao enviar:", error.message);
            
            if (error.message === "offline_mode" || error.message.includes("offline")) {
                // Modo offline - apenas salva localmente
                setMessages(prev => {
                    const updated = prev.map(msg => 
                        msg.id === tempMessageId 
                            ? { ...msg, isSending: false, id: `local_${Date.now()}` }
                            : msg
                    );
                    saveMessagesLocally(roomId, updated);
                    return updated;
                });
                
                Alert.alert(
                    "Modo Offline",
                    "Mensagem salva localmente. Será enviada quando houver conexão.",
                    [{ text: "OK" }]
                );
            } else {
                // Marca como falha
                setMessages(prev => {
                    const updated = prev.map(msg => 
                        msg.id === tempMessageId 
                            ? { 
                                ...msg, 
                                isSending: false, 
                                failed: true, 
                                error: error.message
                            }
                            : msg
                    );
                    saveMessagesLocally(roomId, updated);
                    return updated;
                });
                
                Alert.alert(
                    "Erro ao enviar",
                    error.message || "Não foi possível enviar a mensagem",
                    [
                        { text: "OK" },
                        { 
                            text: "Tentar novamente", 
                            onPress: () => sendRetry(tempMessageId, messageText)
                        }
                    ]
                );
            }
        }
    };

    // Retry de mensagem
    const sendRetry = async (messageId, messageText) => {
        try {
            setMessages(prev => {
                const updated = prev.map(msg => 
                    msg.id === messageId 
                        ? { ...msg, isSending: true, failed: false }
                        : msg
                );
                return updated;
            });
            
            await websocket.sendMessage(roomId, messageText);
            
            setMessages(prev => {
                const updated = prev.map(msg => 
                    msg.id === messageId 
                        ? { ...msg, isSending: false, id: `retry_sent_${Date.now()}` }
                        : msg
                );
                saveMessagesLocally(roomId, updated);
                return updated;
            });
        } catch (error) {
            console.error("❌ Erro no retry:", error);
            setMessages(prev => {
                const updated = prev.map(msg => 
                    msg.id === messageId 
                        ? { ...msg, isSending: false, failed: true }
                        : msg
                );
                return updated;
            });
        }
    };

    // Debug WebSocket
    const debugWebSocket = async () => {
        console.log("🔧 Debug do WebSocket:");
        await testWebSocketConnection();
        
        if (websocket.isConnected()) {
            websocket.testBackendEvents();
        }
        
        Alert.alert(
            "Debug WebSocket",
            `Status: ${websocket.isConnected() ? 'Conectado' : 'Desconectado'}\n` +
            `RoomId: ${roomId}\n` +
            `Mensagens: ${messages.length}`,
            [{ text: "OK" }]
        );
    };

    // Inicializar chat
    useEffect(() => {
        console.log("🚀 Inicializando chat...");
        
        if (pName) setProviderName(pName);
        if (pType) setProviderSpecialty(pType);
        if (pPhoto) setProviderPhoto(pPhoto);

        const initializeChat = async () => {
            if (!providerId) {
                console.error("❌ providerId não definido");
                return;
            }

            setLoadingMessages(true);
            
            try {
                // 1. Gerar roomId
                const chatRoomId = await generateRoomId();
                console.log("📦 RoomId gerado:", chatRoomId);
                
                if (!chatRoomId) {
                    throw new Error("Não foi possível gerar roomId");
                }
                
                setRoomId(chatRoomId);
                
                // 2. Carregar mensagens salvas localmente
                const localMessages = await loadLocalMessages(chatRoomId);
                console.log(`📄 ${localMessages.length} mensagens carregadas`);
                setMessages(localMessages);
                
                // 3. Testar conexão WebSocket
                const connectionSuccess = await testWebSocketConnection();
                
                if (connectionSuccess && chatRoomId) {
                    // Entrar na sala
                    websocket.joinRoom(chatRoomId);
                    
                    // Configurar listener para novas mensagens
                    const handleNewMessage = (message) => {
                        console.log("📩 Nova mensagem recebida:", message);
                        
                        if (message.roomId === chatRoomId) {
                            const newMsg = {
                                id: message._id || message.id || `ws_${Date.now()}`,
                                text: message.content || message.text || "",
                                sender: message.senderId === providerId ? "provider" : "me",
                                timestamp: message.createdAt || message.timestamp || new Date().toISOString(),
                            };
                            
                            setMessages(prev => {
                                // Evitar duplicação
                                if (prev.some(msg => msg.id === newMsg.id)) {
                                    return prev;
                                }
                                const newMessages = [...prev, newMsg];
                                saveMessagesLocally(chatRoomId, newMessages);
                                return newMessages;
                            });
                        }
                    };
                    
                    websocket.on('newMessage', handleNewMessage);
                    
                    // Cleanup function
                    return () => {
                        websocket.off('newMessage', handleNewMessage);
                        websocket.leaveRoom(chatRoomId);
                    };
                }
                
            } catch (error) {
                console.error("❌ Erro na inicialização:", error);
            } finally {
                setLoadingMessages(false);
                console.log("✅ Chat inicializado");
            }
        };

        initializeChat();

        return () => {
            console.log("🧹 Cleanup do chat");
            if (roomId) {
                websocket.leaveRoom(roomId);
            }
        };
    }, [providerId]);

    // Efeito para rolar para o final
    useEffect(() => {
        if (messages.length > 0 && flatListRef.current) {
            setTimeout(() => {
                flatListRef.current?.scrollToEnd({ animated: true });
            }, 100);
        }
    }, [messages]);

    // Funções auxiliares
    const getFirstInitial = (name) => {
        if (!name || name.trim().length === 0) return "P";
        return name.trim().charAt(0).toUpperCase();
    };

    const renderMessageTime = (timestamp) => {
        try {
            const date = new Date(timestamp);
            return date.toLocaleTimeString("pt-BR", {
                hour: "2-digit",
                minute: "2-digit",
            });
        } catch {
            return "--:--";
        }
    };

    const renderMessageStatus = (message) => {
        if (message.failed) {
            return (
                <TouchableOpacity onPress={() => sendRetry(message.id, message.text)}>
                    <Ionicons name="refresh-circle" size={16} color="#F44336" />
                </TouchableOpacity>
            );
        }
        if (message.isSending) {
            return <ActivityIndicator size="small" color="#666" />;
        }
        return null;
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
                                {getFirstInitial(providerName)}
                            </Text>
                        </View>
                    )}
                </View>

                <View style={styles.providerInfo}>
                    <Text style={styles.providerName} numberOfLines={1}>
                        {providerName}
                    </Text>
                    <Text style={styles.serviceInfo}>
                        {providerService || providerSpecialty || "Prestador de serviços"}
                    </Text>
                    <Text style={[
                        styles.connectionStatus,
                        { color: isConnected ? '#4CAF50' : '#F44336' }
                    ]}>
                        • {isConnected ? 'Online' : 'Offline'}
                        {isTestingConnection && ' (Conectando...)'}
                    </Text>
                </View>

                <TouchableOpacity onPress={debugWebSocket} style={styles.debugButton}>
                    <Ionicons name="bug-outline" size={20} color="#2F8B88" />
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
                            {isTestingConnection ? "Conectando..." : "Carregando conversa..."}
                        </Text>
                    </View>
                ) : (
                    <>
                        <FlatList
                            ref={flatListRef}
                            data={messages}
                            keyExtractor={(item) => item.id}
                            contentContainerStyle={styles.chatListContent}
                            renderItem={({ item }) => (
                                <View
                                    style={[
                                        styles.messageBubble,
                                        item.sender === "me" ? styles.myMessage : styles.otherMessage
                                    ]}
                                >
                                    <Text style={styles.messageText}>{item.text}</Text>
                                    <View style={styles.messageFooter}>
                                        <Text style={styles.messageTime}>
                                            {renderMessageTime(item.timestamp)}
                                        </Text>
                                        {item.sender === "me" && renderMessageStatus(item)}
                                    </View>
                                </View>
                            )}
                            ListEmptyComponent={
                                <View style={styles.emptyChatContainer}>
                                    <Ionicons name="chatbubble-ellipses-outline" size={60} color="#C4EDE6" />
                                    <Text style={styles.emptyChatTitle}>Inicie uma conversa</Text>
                                    <Text style={styles.emptyChatText}>
                                        Envie uma mensagem para {providerName}
                                    </Text>
                                    {!isConnected && (
                                        <Text style={styles.connectionWarning}>
                                            Conexão offline. As mensagens serão salvas localmente.
                                        </Text>
                                    )}
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
                                    (!isConnected || isTestingConnection) && styles.inputDisabled
                                ]}
                                placeholder={
                                    isTestingConnection ? "Conectando..." :
                                    !isConnected ? "Offline - Conectando..." :
                                    "Digite uma mensagem..."
                                }
                                value={text}
                                onChangeText={setText}
                                multiline
                                maxLength={500}
                                editable={isConnected && !isTestingConnection}
                            />
                            <Pressable
                                style={[
                                    styles.sendButton,
                                    (!text.trim() || !isConnected || isTestingConnection) && styles.sendButtonDisabled
                                ]}
                                onPress={sendMessage}
                                disabled={!text.trim() || !isConnected || isTestingConnection}
                            >
                                {isTestingConnection ? (
                                    <ActivityIndicator size="small" color="#fff" />
                                ) : isConnected ? (
                                    <Ionicons name="send" size={20} color="#fff" />
                                ) : (
                                    <Ionicons name="cloud-offline" size={20} color="#fff" />
                                )}
                            </Pressable>
                        </View>
                    </>
                )}
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#f4f4f4" },
    chatContainer: { flex: 1 },
    loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    loadingText: { marginTop: 10, color: '#666', fontSize: 14 },
    
    headerRow: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 15,
        paddingVertical: 12,
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#e0e0e0",
    },
    backBtn: { padding: 8, marginRight: 12 },
    avatarContainer: { marginRight: 12 },
    providerAvatar: { width: 40, height: 40, borderRadius: 20 },
    avatarPlaceholder: {
        width: 40, height: 40, borderRadius: 20,
        justifyContent: "center", alignItems: "center",
        backgroundColor: "#FFA500"
    },
    avatarText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
    providerInfo: { flex: 1 },
    providerName: { fontSize: 16, fontWeight: "bold", color: "#2F8B88", marginBottom: 2 },
    serviceInfo: { fontSize: 12, color: "#666" },
    connectionStatus: { fontSize: 11, fontWeight: '500' },
    debugButton: { padding: 8, marginLeft: 8 },
    
    chatListContent: {
        padding: 15,
        paddingTop: 20,
        paddingBottom: 10,
        flexGrow: 1,
    },
    messageBubble: {
        padding: 12,
        borderRadius: 16,
        maxWidth: "80%",
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    myMessage: {
        backgroundColor: "#fff",
        alignSelf: "flex-end",
        borderTopRightRadius: 4,
    },
    otherMessage: {
        backgroundColor: "#DCF8C6",
        alignSelf: "flex-start",
        borderTopLeftRadius: 4,
    },
    messageText: {
        fontSize: 15,
        color: "#333",
        marginBottom: 4,
        lineHeight: 20,
    },
    messageFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    messageTime: {
        fontSize: 11,
        color: "#888",
    },
    
    inputArea: {
        flexDirection: "row",
        padding: 15,
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderTopColor: "#e0e0e0",
        alignItems: "flex-end",
    },
    input: {
        flex: 1,
        backgroundColor: "#f0f0f0",
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 10,
        maxHeight: 100,
        minHeight: 40,
        fontSize: 15,
    },
    inputDisabled: {
        backgroundColor: "#e0e0e0",
        color: "#999",
    },
    sendButton: {
        backgroundColor: "#2F8B88",
        marginLeft: 10,
        padding: 12,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        width: 50,
        height: 50,
    },
    sendButtonDisabled: {
        backgroundColor: "#A8D8D7",
    },
    
    emptyChatContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 50,
    },
    emptyChatTitle: {
        marginTop: 16,
        fontSize: 18,
        fontWeight: "600",
        color: "#555",
        marginBottom: 8,
    },
    emptyChatText: {
        fontSize: 14,
        color: "#777",
        textAlign: "center",
        paddingHorizontal: 20,
        marginBottom: 10,
    },
    connectionWarning: {
        fontSize: 12,
        color: "#F44336",
        textAlign: "center",
        paddingHorizontal: 20,
        fontStyle: 'italic',
    },
});