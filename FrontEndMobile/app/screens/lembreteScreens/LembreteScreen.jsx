import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Platform,
  ScrollView,
  ActivityIndicator,
  Alert,
  RefreshControl,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

import api from "../../../src/service/api";
import LembretesHeader from "../../../components/lembrete/LembreteScreen/LembreteHeader";
import SelectMonth from "../../../components/lembrete/LembreteScreen/SelectMonth";
import SelectDay from "../../../components/lembrete/LembreteScreen/SelectDay";
import LembretesList from "../../../components/lembrete/LembreteScreen/LembreteList";
import BottomNav from "../../../components/lembrete/LembreteScreen/BottomNav";

export default function LembretesScreen() {
  const [userContext, setUserContext] = useState(null);
  const [dataAtual, setDataAtual] = useState(new Date());
  const [dataSelecionada, setDataSelecionada] = useState(
    new Date().getDate().toString().padStart(2, "0")
  );
  const [dias, setDias] = useState([]);
  const [lembretesPorDia, setLembretesPorDia] = useState({});
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);
  const scrollRef = useRef(null);

  // --- Carregar contexto do usuário ---
  useEffect(() => {
    const loadUserContext = async () => {
      try {
        const userType = await AsyncStorage.getItem("userType");
        const petId = await AsyncStorage.getItem("selectedPetId");
        const providerId = await AsyncStorage.getItem("providerId");
        const tutorId = await AsyncStorage.getItem("tutorId");
        setUserContext({ userType, petId, providerId, tutorId });
      } catch (err) {
        console.warn("Erro ao ler contexto do usuário:", err);
        setUserContext({});
      }
    };
    loadUserContext();
  }, []);

  // --- Gera dias do mês ---
  const gerarDiasDoMes = (dataBase) => {
    const ano = dataBase.getFullYear();
    const mes = dataBase.getMonth();
    const ultimoDia = new Date(ano, mes + 1, 0).getDate();
    const diasSemana = ["D", "S", "T", "Q", "Q", "S", "S"];
    return Array.from({ length: ultimoDia }, (_, i) => {
      const data = new Date(ano, mes, i + 1);
      return {
        diaSemana: diasSemana[data.getDay()],
        dia: (i + 1).toString().padStart(2, "0"),
      };
    });
  };

  useEffect(() => {
    setDias(gerarDiasDoMes(dataAtual));
  }, [dataAtual]);

  // --- Pega userId atual ---
  const loadCurrentUser = useCallback(async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) return;
      const res = await api.get("/users/me", { headers: { Authorization: `Bearer ${token}` } });
      setCurrentUserId(res.data?._id || res.data?.id || null);
    } catch (err) {
      console.warn("Erro ao obter usuário:", err?.response?.data || err.message);
      setCurrentUserId(null);
    }
  }, []);

  useEffect(() => {
    loadCurrentUser();
  }, [loadCurrentUser]);

  // ✅ Função auxiliar para definir cores
  const getCorPorStatus = (status, isRated) => {
    if (isRated) {
      return "#A8E6CF"; // Verde claro - já avaliado
    }
    
    switch (status) {
      case "scheduled":
      case "Agendado":
        return "#2F8B88"; // Verde escuro - agendado
        
      case "confirmed":
      case "Confirmado":
        return "#87CEEB"; // Azul claro - confirmado
        
      case "completed":
      case "Concluído":
        return "#90EE90"; // Verde - concluído
        
      case "canceled":
      case "Cancelado":
        return "#FF7F50"; // Laranja - cancelado
        
      default:
        return "#2F8B88"; // Padrão verde escuro
    }
  };

  // --- Carregar lembretes ---
  const carregarLembretes = useCallback(
    async (dataReferencia) => {
      if (!userContext || !userContext.userType) {
        console.log("Sem contexto do usuário");
        setLembretesPorDia({});
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const token = await AsyncStorage.getItem("userToken");
        if (!token) throw new Error("Token ausente.");

        let url = "";
        let params = {};

        if (userContext.userType === "provider" && userContext.providerId)
          url = `/providers/${userContext.providerId}/appointments`;
        else if (userContext.userType === "tutor" && userContext.petId)
          url = `/pets/${userContext.petId}/appointments`;
        else if (userContext.userType === "tutor" && userContext.tutorId) {
          url = `/appointments`;
          params = { tutorId: userContext.tutorId };
        } else 
          url = `/appointments`;

        console.log("📡 Buscando lembretes de:", url, params);

        const response = await api.get(url, {
          params,
          headers: { Authorization: `Bearer ${token}` },
        });

        const raw = response?.data;
        const data = Array.isArray(raw?.items)
          ? raw.items
          : Array.isArray(raw)
          ? raw
          : Array.isArray(raw?.data)
          ? raw.data
          : [];

        console.log("✅ Lembretes recebidos:", data.length);

        const agrupado = {};

        await Promise.all(
          data.map(async (item) => {
            if (!item) return;

            const dataObj = item.dateTime ? new Date(item.dateTime) : item.date ? new Date(item.date) : null;
            if (!dataObj || isNaN(dataObj)) {
              console.warn("Data inválida:", item.dateTime || item.date);
              return;
            }

            // ✅ REMOVIDO: Não filtra por mês/ano
            // Agora agrupa TUDO sem limitações
            const diaItem = dataObj.getDate().toString().padStart(2, "0");

            const hora = dataObj.toLocaleTimeString("pt-BR", {
              hour: "2-digit",
              minute: "2-digit",
            });

            const statusOriginal =
              item.status === "Agendado"
                ? "scheduled"
                : item.status === "Confirmado"
                ? "confirmed"
                : item.status === "Concluído"
                ? "completed"
                : item.status === "Cancelado"
                ? "canceled"
                : item.status || "scheduled";

            let isRated = false;
            try {
              const reviewParams = {};
              if (item.service?._id) reviewParams.service = item.service._id;
              else if (item.provider?._id) reviewParams.provider = item.provider._id;

              if (Object.keys(reviewParams).length > 0) {
                const reviewRes = await api.get("/reviews", {
                  headers: { Authorization: `Bearer ${token}` },
                  params: reviewParams,
                });

                const itemsList = reviewRes.data?.items || reviewRes.data || [];
                const arr = Array.isArray(itemsList) ? itemsList : reviewRes.data?.items || [];
                if (arr.length > 0 && currentUserId) {
                  isRated = arr.some((r) => r.author?._id === currentUserId || r.author === currentUserId);
                } else if (arr.length > 0 && !currentUserId) {
                  isRated = true;
                }
              }
            } catch (err) {
              isRated = false;
            }

            // ✅ CORREÇÃO: Usar função de cores
            const cor = getCorPorStatus(statusOriginal, isRated);

            console.log("🎨 Status:", statusOriginal, "Avaliado:", isRated, "Cor:", cor);

            if (!agrupado[diaItem]) agrupado[diaItem] = [];
            agrupado[diaItem].push({
              id: item._id || item.id,
              hora,
              titulo: item.reason || "Consulta",
              descricao:
                item.pet?.nome && item.provider?.name
                  ? `${item.pet.nome} - ${item.provider.name}`
                  : item.pet?.nome
                  ? item.pet.nome
                  : item.provider?.name || "Agendamento",
              cor: cor,
              status: statusOriginal,
              isRated,
              providerId: item.provider?._id || null,
              serviceId: item.service?._id || null,
            });
          })
        );

        console.log("📋 Lembretes agrupados:", agrupado);
        setLembretesPorDia(agrupado);
      } catch (error) {
        console.error("❌ Erro ao carregar lembretes:", error.response?.data || error.message);
        Alert.alert(
          "Erro",
          error.response?.status === 401
            ? "Sessão expirada. Faça login novamente."
            : "Não foi possível carregar os lembretes."
        );
        setLembretesPorDia({});
      } finally {
        setLoading(false);
      }
    },
    [userContext, currentUserId]
  );

  // --- Atualizar lembrete ---
  const atualizarLembrete = useCallback(
    async (lembreteId, dadosAtualizados) => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        if (!token) throw new Error("Token ausente.");

        setLoading(true);

        const response = await api.patch(`/appointments/${lembreteId}`, dadosAtualizados, {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("✅ Agendamento atualizado:", response.data);

        // ✅ Aguarda MAIS tempo
        await new Promise(resolve => setTimeout(resolve, 1500));

        // ✅ Recarrega COMPLETAMENTE
        await carregarLembretes(dataAtual);

        Alert.alert("Sucesso", "Lembrete atualizado!");
      } catch (error) {
        console.error("Erro ao atualizar lembrete:", error.response?.data || error.message);
        Alert.alert("Erro", "Não foi possível atualizar o lembrete.");
      } finally {
        setLoading(false);
      }
    },
    [dataAtual, carregarLembretes]
  );

  // Carregar quando context mudar
  useEffect(() => {
    if (userContext) carregarLembretes(dataAtual);
  }, [userContext, dataAtual, carregarLembretes]);

  // Recarregar ao voltar ao foco
  useFocusEffect(
    useCallback(() => {
      if (userContext) {
        console.log("🔄 Tela ganhou foco, recarregando lembretes...");
        loadCurrentUser();
        carregarLembretes(dataAtual);
      }
    }, [userContext, dataAtual, carregarLembretes, loadCurrentUser])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await carregarLembretes(dataAtual);
    setRefreshing(false);
  };

  const mudarMes = (direcao) => {
    const novaData = new Date(dataAtual);
    novaData.setMonth(dataAtual.getMonth() + direcao);
    setDataAtual(novaData);
    setDataSelecionada(
      novaData.getMonth() === new Date().getMonth() &&
        novaData.getFullYear() === new Date().getFullYear()
        ? new Date().getDate().toString().padStart(2, "0")
        : "01"
    );
  };

  const lembretes = lembretesPorDia[dataSelecionada] || [];

  console.log("🔍 Dia selecionado:", dataSelecionada);
  console.log("🔍 Lembretes disponíveis:", Object.keys(lembretesPorDia));
  console.log("🔍 Lembretes do dia:", lembretes);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" translucent />
      <LembretesHeader />
      <SelectMonth dataAtual={dataAtual} mudarMes={mudarMes} />
      <Text style={styles.subtitle}>
        Hoje {dataSelecionada} de {dataAtual.toLocaleString("pt-BR", { month: "long" })} de{" "}
        {dataAtual.getFullYear()}
      </Text>
      <View style={styles.fixedDaysContainer}>
        <SelectDay
          dias={dias}
          dataSelecionada={dataSelecionada}
          setDataSelecionada={setDataSelecionada}
          scrollRef={scrollRef}
        />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#2F8B88" style={{ marginTop: 50 }} />
      ) : (
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {lembretes.length > 0 ? (
            <View style={{ marginTop: 15 }}>
              <LembretesList lembretes={lembretes} onAtualizar={atualizarLembrete} />
            </View>
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Nenhum lembrete para este dia</Text>
            </View>
          )}
        </ScrollView>
      )}
      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 15 : 55,
  },
  subtitle: {
    textAlign: "center",
    color: "#8E8E8E",
    fontSize: 11,
    marginTop: 4,
  },
  fixedDaysContainer: {
    backgroundColor: "#F9F9F9",
    paddingVertical: 10,
    zIndex: 10,
    elevation: 3,
  },
  scrollContainer: {
    paddingBottom: 120,
  },
  emptyContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: "#2F8B88",
    fontWeight: "500",
  },
});