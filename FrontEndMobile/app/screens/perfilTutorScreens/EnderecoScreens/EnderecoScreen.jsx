import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Platform,
  StatusBar,
  RefreshControl,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import api from "../../../../src/service/api";

const ServicoPetScreen = () => {
  const [servicos, setServicos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();

  const fetchServicos = useCallback(async () => {
    try {
      setLoading(true);

      const token =
        (await AsyncStorage.getItem("access-token")) ||
        (await AsyncStorage.getItem("userToken"));

      if (!token) {
        Alert.alert("Sessão expirada", "Faça login novamente.");
        router.replace("/login");
        return;
      }

      const resp = await api.get("/providers/me/services", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setServicos(resp.data || []);
    } catch (error) {
      console.error("Erro ao carregar serviços:", error);
      if (error.response?.status === 401) {
        Alert.alert("Sessão expirada", "Token inválido ou expirado.");
        await AsyncStorage.removeItem("userToken");
        router.replace("/login");
      } else {
        Alert.alert("Erro", "Não foi possível carregar os serviços.");
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [router]);

  useEffect(() => {
    fetchServicos();
  }, [fetchServicos]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchServicos();
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.nome}>{item.name}</Text>
      <Text style={styles.descricao}>{item.description}</Text>
      {item.price && (
        <Text style={styles.preco}>R$ {parseFloat(item.price).toFixed(2)}</Text>
      )}
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#009688" />
        <Text>Carregando serviços...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {servicos.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>Nenhum serviço cadastrado.</Text>
        </View>
      ) : (
        <FlatList
          data={servicos}
          keyExtractor={(item) => item.id?.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </View>
  );
};

export default ServicoPetScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  list: {
    padding: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
  },
  nome: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  descricao: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  preco: {
    marginTop: 8,
    fontWeight: "bold",
    color: "#009688",
    fontSize: 15,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#777",
  },
});
