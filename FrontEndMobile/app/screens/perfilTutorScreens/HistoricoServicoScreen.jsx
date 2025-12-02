import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, SectionList, ActivityIndicator, Platform, StatusBar } from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import api from "../../../src/service/api";
import { mapAppointmentFromApi, groupByPeriodo } from "../../../components/tutor/historicoTutor/HistoricoUtils";
import HistoricoHeader from "../../../components/tutor/historicoTutor/HistoricoHeader";
import HistoricoCard from "../../../components/tutor/historicoTutor/HistoricoCard";
import BottomNav from "../../../components/tutor/BottomNav";

export default function HistoricoServicoScreen() {
  const router = useRouter();

  const [appointments, setAppointments] = useState([]);
  const [sections, setSections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchHistory = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const token = await AsyncStorage.getItem("userToken");
      const tutorId = await AsyncStorage.getItem("tutorId");

      if (!token || !tutorId) {
        setErrorMessage("Sessão expirada. Faça login novamente.");
        router.replace("screens/loginScreens/LoginScreen");
        return;
      }

      const response = await api.get("/appointments", {
        headers: { Authorization: `Bearer ${token}` },
        params: { tutorId },
      });

      const rawItems = Array.isArray(response.data?.items)
        ? response.data.items
        : [];

      const mapped = rawItems.map(mapAppointmentFromApi);
      
      setAppointments(mapped);
      setSections(groupByPeriodo(mapped));
    } catch (error) {
      console.log(
        "Erro ao carregar histórico de agendamentos:",
        error.response?.data || error.message
      );
      setErrorMessage("Não foi possível carregar o histórico de serviços.");
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  useFocusEffect(
    useCallback(() => {
      fetchHistory();
    }, [fetchHistory])
  );

  const renderLoading = () => (
    <View style={[styles.container, styles.loadingContainer]}>
      <ActivityIndicator size="large" color={"#2F8B88"} />
      <Text style={styles.loadingText}>Carregando histórico...</Text>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="paw-outline" size={40} color="#C4EDE6" />
      <Text style={styles.emptyTitle}>Nenhum serviço encontrado</Text>
      <Text style={styles.emptyText}>
        Assim que você começar a agendar serviços, eles aparecerão aqui.
      </Text>
    </View>
  );

  const renderSectionHeader = ({ section: { title } }) => (
    <Text style={styles.sectionTitle}>{title}</Text>
  );

  const renderItem = ({ item }) => <HistoricoCard item={item} />;

  if (isLoading) {
    return renderLoading();
  }

  const isEmpty = !isLoading && appointments.length === 0;

  return (
    <View style={styles.mainContainer}>
      <View style={styles.contentContainer}>
        <HistoricoHeader />

        {errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : null}

        {isEmpty ? (
          renderEmptyState()
        ) : (
          <SectionList
            sections={sections}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            renderSectionHeader={renderSectionHeader}
            renderItem={renderItem}
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
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  sectionTitle: {
    marginTop: 16,
    marginBottom: 6,
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 10 : 60,
  },
  loadingText: {
    marginTop: 10,
    color: "#2F8B88",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  emptyTitle: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: "600",
    color: "#555",
  },
  emptyText: {
    marginTop: 4,
    fontSize: 13,
    textAlign: "center",
    color: "#777",
  },
  errorText: {
    marginHorizontal: 20,
    marginBottom: 8,
    fontSize: 13,
    color: "#D32F2F",
  },
});