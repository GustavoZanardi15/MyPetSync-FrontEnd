import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  Platform,
  StatusBar,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../../src/service/api";

// Importando os componentes existentes
import VetInfoSection from "../../../components/servico/servicoVetDetalhe/VetInfoSection";
import VetStats from "../../../components/servico/servicoVetDetalhe/VetStats";
import VetAvaliacoesSection from "../../../components/servico/servicoVetDetalhe/VetAvaliacoesSection";
import BottomNav from "../../../components/servico/servicoVetDetalhe/BottomNav";

export default function ServicoVetDetalheScreen() {
  const router = useRouter();
  const { vetId } = useLocalSearchParams();

  const [vet, setVet] = useState({
    nome: "Veterinário",
    bio: "Nenhuma bio disponível no momento.",
    avaliacoesList: [],
    experiencia: "—",
    consultasRealizadas: 0,
    precoConsulta: 0,
    type: "",
    service: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadVet() {
      if (!vetId) {
        setLoading(false);
        return;
      }

      try {
        const token = await AsyncStorage.getItem("userToken");
        if (!token) {
          Alert.alert("Sessão expirada", "Faça login novamente.");
          router.replace("/screens/telaInicialScreens/LoginScreen");
          return;
        }

        // 1. Buscar dados do provider
        const response = await api.get(`/providers/${vetId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const vetData = response.data;

        // 2. Buscar appointments para estatísticas
        let appointments = [];
        try {
          const appointmentsResponse = await api.get(
            `/providers/${vetId}/appointments`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          appointments = appointmentsResponse.data;
        } catch (err) {
          console.log("Erro ao buscar appointments:", err.message);
        }

        // 3. ✅ BUSCAR AVALIAÇÕES SEPARADAMENTE
        let avaliacoes = [];
        try {
          const reviewsResponse = await api.get(`/reviews`, {
            params: { provider: vetId },
            headers: { Authorization: `Bearer ${token}` }
          });
          
          if (reviewsResponse.data && reviewsResponse.data.items) {
            avaliacoes = reviewsResponse.data.items;
            console.log("✅ Avaliações encontradas:", avaliacoes.length);
            
            // ✅ CORREÇÃO: Buscar nomes reais dos usuários
            const avaliacoesComNomes = await Promise.all(
              avaliacoes.map(async (avaliacao) => {
                try {
                  // Buscar dados completos do usuário
                  const userResponse = await api.get(`/users/${avaliacao.author}`, {
                    headers: { Authorization: `Bearer ${token}` }
                  });
                  
                  const userData = userResponse.data;
                  console.log("👤 Dados do usuário:", userData);
                  
                  // Extrair nome real do usuário
                  const userName = userData.nome || userData.name || "Usuário";
                  
                  return {
                    ...avaliacao,
                    author: {
                      _id: avaliacao.author,
                      name: userName
                    }
                  };
                  
                } catch (error) {
                  console.log("❌ Erro ao buscar usuário:", error.message);
                  console.log("   Author ID:", avaliacao.author);
                  
                  return {
                    ...avaliacao,
                    author: { 
                      _id: avaliacao.author,
                      name: "Usuário Anônimo" 
                    }
                  };
                }
              })
            );
            avaliacoes = avaliacoesComNomes;
          }
        } catch (err) {
          console.log("Erro ao buscar avaliações:", err.response?.data || err.message);
        }

        setVet({
          id: vetData._id || vetId,
          nome: vetData.name || "Veterinário",
          bio: vetData.bio || "Nenhuma bio disponível no momento.",
          avaliacoesList: avaliacoes,
          experiencia: vetData.experiencia || "—",
          consultasRealizadas: appointments.length || 0,
          precoConsulta:
            appointments.length > 0
              ? appointments.reduce((sum, a) => sum + (a.price || 0), 0) / appointments.length
              : 0,
          type: vetData.providerType || vetData.type || "autonomo",
          service: vetData.service || vetData.servicesOffered?.[0] || "Serviço Não Definido",
        });

        console.log("📊 Dados carregados:");
        console.log("   Nome do vet:", vetData.name);
        console.log("   Avaliações encontradas:", avaliacoes.length);
        console.log("   Primeira avaliação:", avaliacoes[0]);
        console.log("   Autor da primeira avaliação:", avaliacoes[0]?.author);

      } catch (err) {
        console.error(
          "Erro ao buscar prestador:",
          err.response?.data || err.message
        );
        Alert.alert(
          "Erro",
          "Não foi possível carregar os detalhes do prestador."
        );
        setVet(null);
      } finally {
        setLoading(false);
      }
    }
    loadVet();
  }, [vetId]);

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" color="#2F8B88" />
      </View>
    );
  }

  if (!vet) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <Text style={{ fontSize: 18, color: "#FF0000" }}>
          Erro: Detalhes do Veterinário não encontrados
        </Text>
        <Pressable style={{ marginTop: 20 }} onPress={() => router.back()}>
          <Text style={{ color: "#2F8B88", fontSize: 16 }}>Voltar</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.topBackground} />
      <ScrollView contentContainerStyle={styles.scroll}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#2F8B88" />
        </Pressable>

        <View style={styles.mainAvatar}>
          <Text style={styles.mainAvatarText}>{vet.nome[0]}</Text>
        </View>

        <View style={styles.contentCard}>
          <VetInfoSection vet={vet} />
          <Text style={styles.vetBio}>{vet.bio}</Text>
          <VetStats vet={vet} />
          <VetAvaliacoesSection avaliacoes={vet.avaliacoesList} />
          <Pressable
            style={styles.mainButton}
            onPress={() =>
              router.push({
                pathname: "/screens/servicoScreens/ServicoConsultaScreen",
                params: {
                  vet: JSON.stringify({
                    id: vet.id,
                    nome: vet.nome,
                    type: vet.type,
                    service: vet.service,
                  }),
                },
              })
            }
          >
            <Text style={styles.mainButtonText}>Marque uma Consulta!</Text>
          </Pressable>
        </View>
      </ScrollView>
      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#F9F9F9" 
  },
  topBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 200,
    backgroundColor: "#D1E6E5",
  },
  backButton: {
    position: "absolute",
    top: Platform.OS === "android" ? (StatusBar.currentHeight || 20) + 10 : 50,
    left: 20,
    zIndex: 10,
    padding: 5,
    borderRadius: 50,
    backgroundColor: "#FFF"
  },
  scroll: { 
    paddingBottom: 100 
  },
  mainAvatar: {
    width: "100%",
    height: 280,
    backgroundColor: "#FFA500",
    justifyContent: "center",
    alignItems: "center",
  },
  mainAvatarText: { 
    fontSize: 100, 
    fontWeight: "bold", 
    color: "#FFFFFF" 
  },
  contentCard: {
    backgroundColor: "#F9F9F9",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    marginTop: -30,
  },
  vetBio: { 
    fontSize: 14, 
    color: "#8E8E8E", 
    lineHeight: 18, 
    marginBottom: 30 
  },
  mainButton: {
    backgroundColor: "#2F8B88",
    borderRadius: 16,
    height: 35,
    width: 177,
    paddingVertical: 15,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  mainButtonText: { 
    color: "#FFFFFF", 
    fontSize: 15, 
    fontWeight: "bold" 
  },
});