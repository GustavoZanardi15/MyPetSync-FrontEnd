import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  SectionList,
  ActivityIndicator,
  Platform,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import api from "../../../src/service/api";

const PRIMARY = "#2F8B88";
const BG = "#F9FAF9";

const formatDateTime = (dateTimeString) => {
  if (!dateTimeString) {
    return {
      dateLabel: "Data não informada",
      diaSemana: "",
      hora: "",
    };
  }

  const date = new Date(dateTimeString);
  if (Number.isNaN(date.getTime())) {
    return {
      dateLabel: "Data inválida",
      diaSemana: "",
      hora: "",
    };
  }

  const dia = String(date.getDate()).padStart(2, "0");
  const meses = [
    "Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"
  ];
  const diasSemana = [
    "Domingo","Segunda-feira","Terça-feira","Quarta-feira",
    "Quinta-feira","Sexta-feira","Sábado"
  ];

  const mes = meses[date.getMonth()];
  const diaSemana = diasSemana[date.getDay()];
  const horas = String(date.getHours()).padStart(2, "0");
  const minutos = String(date.getMinutes()).padStart(2, "0");

  return {
    dateLabel: `${dia} ${mes}`,
    diaSemana,
    hora: `${horas}:${minutos}`,
  };
};

const getPeriodoFromDate = (dateTimeString) => {
  if (!dateTimeString) return "Outros";

  const d = new Date(dateTimeString);
  if (Number.isNaN(d.getTime())) return "Outros";

  const hoje = new Date();
  const mesmoDia =
    d.getDate() === hoje.getDate() &&
    d.getMonth() === hoje.getMonth() &&
    d.getFullYear() === hoje.getFullYear();

  if (mesmoDia) return "Hoje";

  const mesmoMes =
    d.getMonth() === hoje.getMonth() && d.getFullYear() === hoje.getFullYear();

  if (mesmoMes) return "Este mês";

  return `${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;
};

const mapAppointmentFromApi = (appointment) => {
  const { dateLabel, diaSemana, hora } = formatDateTime(appointment.dateTime);
  const periodo = getPeriodoFromDate(appointment.dateTime);

  return {
    id: appointment._id?.toString() ?? String(Math.random()),
    profissionalNome: appointment.provider?.name ?? "Prestador não informado",
    profissionalEspecialidade:
      appointment.service?.name ??
      appointment.reason ??
      "Serviço pet específico",
    dateLabel,
    diaSemana,
    hora,
    periodo,
    status: appointment.status ?? "pending",
    isReviewed: appointment.isReviewed ?? false,
  };
};

const groupByPeriodo = (items) => {
  const groups = items.reduce((acc, item) => {
    const key = item.periodo || "Outros";
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});

  return Object.keys(groups)
    .sort((a, b) => {
      const ordem = ["Hoje", "Este mês"];
      const ia = ordem.indexOf(a);
      const ib = ordem.indexOf(b);
      if (ia === -1 && ib === -1) return 0;
      if (ia === -1) return 1;
      if (ib === -1) return -1;
      return ia - ib;
    })
    .map((periodo) => ({
      title: periodo,
      data: groups[periodo],
    }));
};

const ServiceHistoryCard = ({ item }) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardAccent} />

      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <View style={styles.textBlock}>
            <Text numberOfLines={1} style={styles.nameText}>
              {item.profissionalNome}
            </Text>
            <Text numberOfLines={1} style={styles.specialtyText}>
              {item.profissionalEspecialidade}
            </Text>
          </View>

          {item.isReviewed && (
            <View style={styles.reviewBadge}>
              <Ionicons name="star" size={12} color="#FFD54F" />
              <Text style={styles.reviewBadgeText}>Avaliado</Text>
            </View>
          )}
        </View>

        <View style={styles.cardFooter}>
          <View style={styles.footerRow}>
            <Ionicons
              name="calendar-outline"
              size={14}
              color={PRIMARY}
              style={{ marginRight: 4 }}
            />
            <Text style={styles.footerText}>
              {item.dateLabel}
              {item.diaSemana ? ` • ${item.diaSemana}` : ""}
            </Text>
          </View>

          <View style={styles.footerRow}>
            <Ionicons
              name="time-outline"
              size={14}
              color={PRIMARY}
              style={{ marginRight: 4 }}
            />
            <Text style={styles.footerText}>{item.hora}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default function HistoricoServicosScreen() {
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

  if (isLoading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color={PRIMARY} />
        <Text style={styles.loadingText}>Carregando histórico...</Text>
      </View>
    );
  }

  const isEmpty = !isLoading && appointments.length === 0;

  return (
    <View style={styles.container}>

      
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={PRIMARY} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Histórico de Serviços</Text>
      </View>

      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}

      {isEmpty ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="paw-outline" size={40} color="#C4EDE6" />
          <Text style={styles.emptyTitle}>Nenhum serviço encontrado</Text>
          <Text style={styles.emptyText}>
            Assim que você começar a agendar serviços, eles aparecerão aqui.
          </Text>
        </View>
      ) : (
        <SectionList
          sections={sections}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.sectionTitle}>{title}</Text>
          )}
          renderItem={({ item }) => <ServiceHistoryCard item={item} />}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 10 : 60,
  },

  
 headerRow: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  paddingHorizontal: 20,
  marginBottom: 10,
  position: "relative",
},
backBtn: {
  position: "absolute",
  left: 20,
  padding: 4,
},
headerTitle: {
  fontSize: 20,
  fontWeight: "700",
  color: PRIMARY,
  textAlign: "center",
  flex: 1,
},

  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },

  sectionTitle: {
    marginTop: 16,
    marginBottom: 6,
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
  },

  card: {
    flexDirection: "row",
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    marginBottom: 10,
    overflow: "hidden",
    elevation: 1,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
  },
  cardAccent: {
    width: 4,
    backgroundColor: PRIMARY,
  },
  cardContent: {
    flex: 1,
    padding: 12,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },

  textBlock: { flex: 1 },

  nameText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#222",
  },
  specialtyText: {
    fontSize: 13,
    color: "#666",
    marginTop: 2,
  },

  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footerRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  footerText: {
    fontSize: 12,
    color: PRIMARY,
  },

  reviewBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF8E1",
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginLeft: 8,
  },
  reviewBadgeText: {
    marginLeft: 4,
    fontSize: 10,
    fontWeight: "600",
    color: "#AF8432",
  },

  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    color: PRIMARY,
  },

  emptyContainer: {
    marginTop: 40,
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
