import React, { useState, useCallback } from "react";
import { View, ScrollView, StyleSheet, Platform, StatusBar, ActivityIndicator, Alert } from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../../src/service/api";

import ServicoHeader from "../../../components/servico/servicoLista/ServicoHeader";
import ServicoCard from "../../../components/servico/servicoLista/ServicoCard";
import BottomNav from "../../../components/servico/BottomNav";

const servicosData = [
  {
    nome: "Banho & Tosa",
    cor: "#A8E6CF",
    imagem: require("../../../assets/images/servicos/BanhoTosa.png"),
  },
  {
    nome: "Hospedagem",
    cor: "#89CFF0",
    imagem: require("../../../assets/images/servicos/Hospedagem.png"),
  },
  {
    nome: "Passeios",
    cor: "#FFD97D",
    imagem: require("../../../assets/images/servicos/Passeios.png"),
  },
  {
    nome: "Veterinário",
    cor: "#DFD4FB",
    imagem: require("../../../assets/images/servicos/Veterinário.png"),
  },
  {
    nome: "Cuidadora",
    cor: "#FF9D97",
    imagem: require("../../../assets/images/servicos/Cuidadora.png"),
  },
  {
    nome: "Adestrador",
    cor: "#D9D9D9",
    imagem: require("../../../assets/images/servicos/Adestrador.png"),
  },
];

export default function ServicoPetScreen() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const getAuthToken = async () => {
    try {
      return await AsyncStorage.getItem("userToken");
    } catch {
      return null;
    }
  };

  const fetchPets = useCallback(async () => {
    setLoading(true);
    const token = await getAuthToken();
    if (!token) {
      Alert.alert("Erro", "Sessão expirada. Faça login novamente.");
      setLoading(false);
      return;
    }

    try {
      await api.get("/pets", {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error) {
      console.error("Erro ao buscar pets:", error.response?.data || error.message);
      Alert.alert("Erro", "Não foi possível carregar seus pets.");
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchPets();
    }, [fetchPets])
  );

  const handleSelectServico = (servicoNome) => {
    router.push(
      `/screens/servicoScreens/ServicoVetScreen?servico=${encodeURIComponent(
        servicoNome
      )}`
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <ServicoHeader />

        {loading ? (
          <ActivityIndicator size="large" color="#2196f3" style={{ marginTop: 40 }} />
        ) : null}

        <View style={{ height: 40 }} />

        <View style={styles.gridContainer}>
          {servicosData.map((servico, index) => (
            <ServicoCard
              key={index}
              nome={servico.nome}
              cor={servico.cor}
              imagem={servico.imagem}
              onPress={() => handleSelectServico(servico.nome)}
            />
          ))}
        </View>

        <View style={{ height: 90 }} />
      </ScrollView>

      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAF9",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 10 : 60,
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 15,
    paddingBottom: 20,
  },
});
