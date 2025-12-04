import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  Platform,
  StatusBar,
  Alert
} from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../../../src/service/api";
import BottomNav from "../../../../components/tutor/BottomNav";
import ListaHeader from "../../../../components/tutor/mensagensTutor/ListaHeader";
import EmptyState from "../../../../components/tutor/mensagensTutor/EmptyState";
import LoadingState from "../../../../components/tutor/mensagensTutor/LoadingState";
import Card from "../../../../components/tutor/mensagensTutor/Card";

const fetchTutoresData = async () => {
  try {
    console.log("🔍 [DEBUG] Iniciando fetchTutoresData...");

    const token = await AsyncStorage.getItem("userToken");
    const tutorId = await AsyncStorage.getItem("tutorId");

    if (!token) {
      return { success: false, error: "Token de autenticação não encontrado" };
    }

    let actualTutorId = tutorId;
    
    if (!actualTutorId) {
      try {
        const userResponse = await api.get("/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        if (userResponse.data?._id || userResponse.data?.id) {
          actualTutorId = userResponse.data._id || userResponse.data.id;
          await AsyncStorage.setItem("tutorId", actualTutorId);
        }
      } catch (userError) {
        console.log("⚠️ [DEBUG] Erro ao buscar dados do usuário:", userError.message);
      }
    }

    if (!actualTutorId) {
      return { success: false, error: "Não foi possível identificar sua conta" };
    }

    console.log("📡 [DEBUG] Buscando agendamentos com tutorId:", actualTutorId);
    
    const response = await api.get("/appointments", {
      headers: { 
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      params: {
        tutorId: actualTutorId,
        limit: 50
      },
      timeout: 10000
    });

    let appointmentsData = [];
    
    if (response.data?.items && Array.isArray(response.data.items)) {
      appointmentsData = response.data.items;
    } else if (Array.isArray(response.data)) {
      appointmentsData = response.data;
    }

    const uniqueProviders = new Map();
    
    for (const appointment of appointmentsData) {
      try {
        const provider = appointment.provider;
        
        if (!provider) continue;
        
        const providerId = provider._id || provider.id;
        if (!providerId) continue;
        
        if (uniqueProviders.has(providerId)) {
          const existing = uniqueProviders.get(providerId);
          existing.totalServicos += 1;
          
          const appointmentDate = new Date(appointment.updatedAt || appointment.createdAt || new Date());
          const existingDate = new Date(existing.updatedAt);
          
          if (appointmentDate > existingDate) {
            existing.updatedAt = appointment.updatedAt || appointment.createdAt || new Date().toISOString();
            existing.ultimoServico = appointment.service?.name || 
                                   appointment.reason || 
                                   existing.ultimoServico;
          }
        } else {
          uniqueProviders.set(providerId, {
            id: providerId,
            nome: provider.name || provider.fullName || "Prestador",
            especialidade: provider.providerType || 
                         appointment.service?.name || 
                         "Serviço",
            foto: provider.photo || null,
            updatedAt: appointment.updatedAt || appointment.createdAt || new Date().toISOString(),
            ultimoServico: appointment.service?.name || 
                         appointment.reason || 
                         "Serviço",
            ultimaData: appointment.updatedAt || appointment.createdAt || new Date().toISOString(),
            totalServicos: 1,
            ultimoStatus: appointment.status || "scheduled",
            petNome: appointment.pet?.nome || 
                    appointment.pet?.name || 
                    "Pet não identificado",
            isReviewed: appointment.isReviewed || false
          });
        }
      } catch (itemError) {
        console.log("⚠️ [DEBUG] Erro ao processar appointment:", itemError.message);
      }
    }
    
    const providers = Array.from(uniqueProviders.values());
    
    providers.sort((a, b) => {
      return new Date(b.updatedAt) - new Date(a.updatedAt);
    });
    
    return { success: true, data: providers };
    
  } catch (apiError) {
    let errorMsg = "Não foi possível carregar seus prestadores.";
    
    if (apiError.response?.status === 401) {
      errorMsg = "Sessão expirada. Faça login novamente.";
    } else if (apiError.code === 'ECONNABORTED') {
      errorMsg = "Tempo de requisição esgotado. Verifique sua conexão.";
    } else if (!apiError.response) {
      errorMsg = "Erro de rede. Verifique sua conexão com a internet.";
    }
    
    return { success: false, error: errorMsg };
  }
};

export default function ListaPrestadores() {
  const [tutores, setTutores] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const loadTutores = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage("");
    
    const result = await fetchTutoresData();
    
    if (result.success) {
      setTutores(result.data);
    } else {
      setErrorMessage(result.error);
    }
    
    setIsLoading(false);
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTutores();
    }, [loadTutores])
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadTutores();
    setRefreshing(false);
  }, [loadTutores]);

  const openChat = (tutor) => {
    if (!tutor.id) {
      Alert.alert("Erro", "Prestador inválido. Tente novamente.");
      return;
    }
    
    router.push({
      pathname: "./ChatScreen",
      params: {
        providerId: tutor.id, 
        providerName: tutor.nome,
        providerPhoto: tutor.foto || "",
        providerType: tutor.especialidade
      },
    });
  };

  if (isLoading && !refreshing) {
    return <LoadingState />;
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.contentContainer}>
        <ListaHeader />

        {errorMessage ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{errorMessage}</Text>
          </View>
        ) : null}

        {tutores.length === 0 && !isLoading ? (
          <EmptyState />
        ) : (
          <FlatList
            data={tutores}
            keyExtractor={(item) => item.id ? item.id.toString() : Math.random().toString()}
            contentContainerStyle={styles.listContent}
            renderItem={({ item }) => (
              <Card 
                tutor={item}
                onPress={() => openChat(item)}
              />
            )}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl 
                refreshing={refreshing} 
                onRefresh={onRefresh}
                colors={["#2F8B88"]}
                tintColor="#2F8B88"
              />
            }
            ListHeaderComponent={() => (
              <View style={styles.listHeader}>
                <Text style={styles.totalText}>
                  {tutores.length} prestador(es) encontrado(s)
                </Text>
                <Text style={styles.lastUpdateText}>
                  Última atualização: {new Date().toLocaleTimeString('pt-BR')}
                </Text>
              </View>
            )}
          />
        )}
      </View>
      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#F7F7F7",
  },
  contentContainer: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 10 : 60,
    paddingBottom: 80,
  },
  listHeader: {
    paddingBottom: 10,
    paddingHorizontal: 24,
  },
  totalText: {
    fontSize: 14,
    color: "#888",
    marginBottom: 5,
    fontStyle: "italic",
  },
  lastUpdateText: {
    fontSize: 12,
    color: "#AAA",
    fontStyle: "italic",
  },
  listContent: {
    paddingBottom: 100,
  },
  errorContainer: {
    backgroundColor: "#FFEBEE",
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 24,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#D32F2F',
  },
  errorText: {
    color: "#D32F2F",
    fontSize: 14,
  },
});
