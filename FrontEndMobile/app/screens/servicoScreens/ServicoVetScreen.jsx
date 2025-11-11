import React, { useState, useEffect, useCallback } from "react";
import { View, ScrollView, StyleSheet, StatusBar, Platform, ActivityIndicator, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../../src/service/api";

import VetHeader from "../../../components/servico/servicoVet/VetHeader";
import VetCard from "../../../components/servico/servicoVet/VetCard";
import BottomNav from "../../../components/servico/servicoVet/BottomNav";
import FiltroVet from "../../../components/servico/servicoVet/FiltrarVet";

export default function ServicoVetScreen() {
  const [veterinarios, setVeterinarios] = useState([]);
  const [veterinariosFiltrados, setVeterinariosFiltrados] = useState(null);
  const [loading, setLoading] = useState(true);

  const carregarProviders = useCallback(async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) throw new Error("Token ausente, faça login novamente.");

      const response = await api.get("/providers", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = response.data.items || response.data || [];

      const vetsFormatados = data.map((p) => ({
        id: p._id,
        nome: p.name,
        especialidade: p.service || (p.servicesOffered?.join(", ") || ""),
        estrelas: p.averageRating || 0,
        avaliacoes: p.ratings?.length || 0,
      }));

      setVeterinarios(vetsFormatados);
      setVeterinariosFiltrados(vetsFormatados);
    } catch (error) {
      console.error("Erro ao carregar veterinários:", error);
      if (error.response?.status === 401) {
        Alert.alert("Sessão expirada", "Faça login novamente.");
      } else {
        Alert.alert("Erro", "Não foi possível carregar os prestadores.");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    carregarProviders();
  }, [carregarProviders]);

  const handleFiltro = (filtroSelecionado, correspondencias) => {
    if (!filtroSelecionado) {
      setVeterinariosFiltrados(veterinarios);
    } else {
      const filtrados = veterinarios.filter((v) =>
        correspondencias.some((esp) =>
          v.especialidade.toLowerCase().includes(esp.toLowerCase())
        )
      );
      setVeterinariosFiltrados(filtrados);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" translucent />
      <VetHeader />

      <FiltroVet onSelecionar={handleFiltro} />

      {loading ? (
        <ActivityIndicator size="large" color="#2196f3" style={{ marginTop: 40 }} />
      ) : (
        <ScrollView contentContainerStyle={styles.scroll}>
          {(veterinariosFiltrados || []).map((vet) => (
            <VetCard key={vet.id} vet={vet} />
          ))}
        </ScrollView>
      )}

      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 10 : 40,
  },
  scroll: {
    paddingHorizontal: 16,
    paddingBottom: 80,
  },
});
