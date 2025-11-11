import React, { useState, useEffect, useCallback } from "react";
import { View, ScrollView, StyleSheet, StatusBar, Platform, ActivityIndicator, Alert, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams } from "expo-router";
import api from "../../../src/service/api";
import VetHeader from "../../../components/servico/servicoVet/VetHeader";
import VetCard from "../../../components/servico/servicoVet/VetCard";
import BottomNav from "../../../components/servico/servicoVet/BottomNav";
import FiltroVet from "../../../components/servico/servicoVet/FiltrarVet";

const servicosRelacionados = {
  "Banho & Tosa": ["Banho & Tosa", "Pet Shop"],
  Passeios: ["Pet Sistter"],
  Cuidadora: ["Cuidadora", "Pet Sistter"],
  Hospedagem: ["Hotel para Pets"],
  Veterinário: ["Veterinário Autônomo", "Clínica Veterinária", "Pet Shop"],
  Adestrador: ["Adestrador"],
};

export default function ServicoVetScreen() {
  const [prestadores, setPrestadores] = useState([]);
  const [filtrados, setFiltrados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtroExtra, setFiltroExtra] = useState(null); 
  const { servico } = useLocalSearchParams();

  const carregarProviders = useCallback(async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) throw new Error("Token ausente, faça login novamente.");

      const response = await api.get("/providers", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = response.data.items || response.data || [];

      const formatados = data.map((p) => ({
        id: p._id,
        nome: p.name,
        tipo: p.providerType || "", 
        especialidade:
          Array.isArray(p.servicesOffered) && p.servicesOffered.length > 0
            ? p.servicesOffered.join(", ")
            : p.service || "",
        especialidades:
          Array.isArray(p.servicesOffered) && p.servicesOffered.length > 0
            ? p.servicesOffered
            : [p.service || ""],
        estrelas: p.averageRating || 0,
        avaliacoes: p.ratings?.length || 0,
      }));

      setPrestadores(formatados);

      if (servico) {
        const relacionados = servicosRelacionados[servico] || [servico];
        const filtradosPorServico = formatados.filter((p) =>
          p.especialidades.some((esp) =>
            relacionados.some((r) =>
              esp.toLowerCase().includes(r.toLowerCase())
            )
          )
        );
        setFiltrados(filtradosPorServico);
      } else {
        setFiltrados(formatados);
      }
    } catch (error) {
      console.error("Erro ao carregar prestadores:", error);
      Alert.alert(
        "Erro",
        error.response?.status === 401
          ? "Sessão expirada. Faça login novamente."
          : "Não foi possível carregar os prestadores."
      );
    } finally {
      setLoading(false);
    }
  }, [servico]);

  useEffect(() => {
    carregarProviders();
  }, [carregarProviders]);

  const handleFiltro = (filtroSelecionado, correspondencias) => {
    setFiltroExtra(filtroSelecionado);

    const relacionados = servicosRelacionados[servico] || [servico];

    const filtrados = prestadores.filter((p) => {
      const combinaServico = servico
        ? p.especialidades.some((esp) =>
            relacionados.some((r) =>
              esp.toLowerCase().includes(r.toLowerCase())
            )
          )
        : true;

      const combinaTipo = filtroSelecionado
        ? correspondencias.some((esp) =>
            p.especialidades.some((e) =>
              e.toLowerCase().includes(esp.toLowerCase())
            )
          )
        : true;

      return combinaServico && combinaTipo;
    });

    setFiltrados(filtrados);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" translucent />
      <VetHeader />

      <FiltroVet onSelecionar={handleFiltro} />

      {loading ? (
        <ActivityIndicator size="large" color="#2196f3" style={{ marginTop: 40 }} />
      ) : filtrados.length === 0 ? (
        <Text style={styles.emptyText}>Nenhum prestador encontrado.</Text>
      ) : (
        <ScrollView contentContainerStyle={styles.scroll}>
          {filtrados.map((vet) => (
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
  emptyText: {
    textAlign: "center",
    color: "#777",
    marginTop: 30,
    fontSize: 15,
  },
});
