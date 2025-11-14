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

  // --- Pega userId atual (para comparar author das reviews) ---
  const loadCurrentUser = useCallback(async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) return;
      const res = await api.get("/users/me", { headers: { Authorization: `Bearer ${token}` } });
      setCurrentUserId(res.data?._id || res.data?.id || null);
    } catch (err) {
      console.warn("Não foi possível obter usuário atual:", err?.response?.data || err.message);
      setCurrentUserId(null);
    }
  }, []);

  useEffect(() => {
    loadCurrentUser();
  }, [loadCurrentUser]);

  // --- Carregar lembretes (com checagem de review) ---
  const carregarLembretes = useCallback(
    async (dataReferencia) => {
      if (!userContext || !userContext.userType) {
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
        } else url = `/appointments`;

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

        const anoAtual = dataReferencia.getFullYear();
        const mesAtual = dataReferencia.getMonth();

        const agrupado = {};

        // percorre e enriquece com isRated
        await Promise.all(
          data.map(async (item) => {
            if (!item) return;

            const dataObj = item.dateTime ? new Date(item.dateTime) : item.date ? new Date(item.date) : null;
            if (!dataObj || isNaN(dataObj)) return;

            const anoItem = dataObj.getFullYear();
            const mesItem = dataObj.getMonth();
            const diaItem = dataObj.getDate().toString().padStart(2, "0");

            // filtro do mês
            if (anoItem !== anoAtual || mesItem !== mesAtual) return;

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

            // checar se já existe review
            let isRated = false;
            try {
              const reviewParams = {};
              
              // Adiciona o ID do usuário como filtro principal
              if (currentUserId) reviewParams.author = currentUserId;

              // ⭐️ REVISÃO CRÍTICA: Para garantir que cada serviço possa ser avaliado
              // individualmente, só verificamos a avaliação pelo Service ID.
              if (item.service?._id) {
                reviewParams.service = item.service._id;
              }

              // ⭐️ Busca reviews filtrando por autor E a entidade (APENAS service ID, se existir)
              if (currentUserId && reviewParams.service) { // Agora só executa se reviewParams.service estiver setado
                const reviewRes = await api.get("/reviews", {
                  headers: { Authorization: `Bearer ${token}` },
                  params: reviewParams,
                });

                const itemsList = reviewRes.data?.items || reviewRes.data || [];
                // itemsList pode ser array de items ou objeto com items
                const arr = Array.isArray(itemsList) ? itemsList : reviewRes.data?.items || [];
                
                // Se o backend filtrou por autor e entidade, basta checar se o array não está vazio.
                if (arr.length > 0) {
                  isRated = true;
                }
              }
            } catch (err) {
              // falha ao consultar reviews -> assume false
              // console.warn("Erro ao consultar review:", err.message); // Opcional: logar para debug
              isRated = false;
            }

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
              cor:
                isRated
                  ? "#A8E6CF"
                  : statusOriginal === "scheduled"
                  ? "#2F8B88"
                  : statusOriginal === "confirmed"
                  ? "#87CEEB"
                  : statusOriginal === "completed"
                  ? "#90EE90"
                  : "#FF7F50",
              status: statusOriginal,
              isRated,
              providerId: item.provider?._id || null,
              serviceId: item.service?._id || null,
            });
          })
        );

        setLembretesPorDia(agrupado);
      } catch (error) {
        console.error("Erro ao carregar lembretes:", error.response?.data || error.message);
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

        await api.patch(`/appointments/${lembreteId}`, dadosAtualizados, {
          headers: { Authorization: `Bearer ${token}` },
        });

        await carregarLembretes(dataAtual);
      } catch (error) {
        console.error("Erro ao atualizar lembrete:", error.response?.data || error.message);
        Alert.alert("Erro", "Não foi possível atualizar o lembrete.");
      } finally {
        setLoading(false);
      }
    },
    [dataAtual, carregarLembretes]
  );

  // carregar quando context mudar
  useEffect(() => {
    if (userContext) carregarLembretes(dataAtual);
  }, [userContext, dataAtual, carregarLembretes]);

  // recarregar ao voltar ao foco
  useFocusEffect(
    useCallback(() => {
      if (userContext) {
        loadCurrentUser(); // atualiza userId caso tenha mudado
        carregarLembretes(dataAtual);
      }
    }, [userContext, dataAtual, carregarLembretes, loadCurrentUser])
  );

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
        >
          <View style={{ marginTop: 15 }}>
            <LembretesList lembretes={lembretes} onAtualizar={atualizarLembrete} />
          </View>
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
});