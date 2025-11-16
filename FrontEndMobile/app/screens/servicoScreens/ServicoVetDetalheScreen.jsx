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

const COLORS = {
  primary: "#2F8B88",
  secondary: "#D1E6E5",
  background: "#F9F9F9",
  text: "#333333",
  white: "#FFFFFF",
};

export default function ServicoVetDetalheScreen() {
  const router = useRouter();
  const { vetId } = useLocalSearchParams();

  const [vet, setVet] = useState(null);
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

        const response = await api.get(`/providers/${vetId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const vetData = response.data;

        setVet({
          id: vetData._id || vetId,
          nome: vetData.name || "Prestador Desconhecido",
          type: vetData.providerType || vetData.type || "autonomo",
          service:
            vetData.service ||
            vetData.servicesOffered?.[0] ||
            "Serviço Não Definido",
          descricao: vetData.bio || "Nenhuma biografia disponível no momento.",
        });
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

  const navigateToConsulta = () => {
    if (!vet || !vet.id) {
      Alert.alert(
        "Erro",
        "Detalhes do prestador indisponíveis para agendamento."
      );
      return;
    }

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
    });
  };

  if (loading) {
    return (
      <View
        style={[
          styles.outerContainer,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }
  if (!vet) {
    return (
      <View
        style={[
          styles.outerContainer,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <Text style={{ color: COLORS.text, fontSize: 18 }}>
          Prestador não encontrado.
        </Text>
        <Pressable style={{ marginTop: 20 }} onPress={() => router.back()}>
          <Text style={{ color: COLORS.primary, fontSize: 16 }}>Voltar</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.outerContainer}>
      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={26} color={COLORS.primary} />
      </Pressable>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Detalhe do Prestador</Text>
        <View style={styles.vetInfo}>
          <Ionicons
            name="medkit-outline"
            size={24}
            color={COLORS.primary}
            style={{ marginRight: 10 }}
          />
          <View>
            <Text style={styles.vetName}>
              {vet.nome} - {vet.service}
            </Text>
            <Text style={styles.vetEspecialidade}>
              {vet.type === "empresa" ? "Empresa" : "Profissional Autônomo"}
            </Text>
          </View>
        </View>
        <Text style={styles.description}>{vet.descricao}</Text>
        <Pressable style={styles.button} onPress={navigateToConsulta}>
          <Text style={styles.buttonText}>Agendar Consulta</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: { flex: 1, backgroundColor: COLORS.background },
  container: {
    flexGrow: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 20 : 60,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  backButton: {
    position: "absolute",
    top: Platform.OS === "android" ? StatusBar.currentHeight + 10 : 30,
    left: 20,
    zIndex: 10,
    backgroundColor: COLORS.white,
    borderRadius: 50,
    padding: 6,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.primary,
    textAlign: "center",
    marginBottom: 30,
  },
  vetInfo: {
    flexDirection: "row",
    backgroundColor: COLORS.secondary,
    borderRadius: 15,
    padding: 15,
    marginBottom: 25,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  vetName: { fontSize: 18, fontWeight: "600", color: COLORS.primary },
  vetEspecialidade: { fontSize: 14, color: COLORS.text },
  description: {
    fontSize: 16,
    color: COLORS.text,
    marginBottom: 30,
    lineHeight: 24,
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 30,
  },
  buttonText: { color: COLORS.white, fontWeight: "bold", fontSize: 18 },
});
