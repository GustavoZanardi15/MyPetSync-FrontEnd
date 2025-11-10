import React, { useEffect, useState, useCallback } from "react";
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Platform, StatusBar, Pressable, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter, useNavigation } from "expo-router";
import api from "../../../../src/service/api";
import EnderecoHeader from "../../../../components/tutor/enderecoTutor/EnderecoHeader";
import EnderecoItem from "../../../../components/tutor/enderecoTutor/EnderecoItem";
import BottomNav from "../../../../components/tutor/enderecoTutor/BottomNav";


export default function EnderecoScreen() {
  const router = useRouter();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [addresses, setAddresses] = useState([]);
  const fetchEnderecos = useCallback(async () => {
    setLoading(true);
    try {
      const token =
        (await AsyncStorage.getItem("access-token")) || (await AsyncStorage.getItem("userToken"));
      if (!token) throw new Error("Token ausente");

      const resp = await api.get("/tutors/mine/addresses", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = resp?.data ?? [];
      setAddresses(Array.isArray(data) ? data : []);
    } catch (e) {
      console.log("Erro ao buscar endereços:", e);
      setAddresses([
        { _id: "1", label: "Casa", street: "Rua Antonio Salema 666", city: "Maringá", state: "PR", zip: "87050000" },
        { _id: "2", label: "Trabalho", street: "Av Humaitá 542", city: "Maringá", state: "PR", zip: "87015000" },
      ]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEnderecos();
    const unsubscribe = navigation.addListener("focus", fetchEnderecos);
    return unsubscribe;
  }, [navigation, fetchEnderecos]);

  const handleEdit = (item) => {
    const addressId = item._id ?? item.id;
    if (!addressId) {
      Alert.alert("Erro", "Não foi possível identificar o endereço para edição.");
      return;
    }
    router.push({
      pathname: "/screens/perfilTutorScreens/EnderecoScreens/EditarEnderecoScreen",
      params: {
        id: addressId,
        label: item.label,
        street: item.street,
        city: item.city,
        state: item.state,
        zip: item.zip,
      },
    });
  };

  const handleDelete = async (addressId) => {
    if (!addressId) {
      Alert.alert("Erro", "ID do endereço não foi encontrado.");
      return;
    }
    try {
      const token =
        (await AsyncStorage.getItem("access-token")) || (await AsyncStorage.getItem("userToken"));
      if (!token) throw new Error("Token de autorização ausente.");

      await api.delete(`/tutors/mine/addresses/${addressId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setAddresses((prev) => prev.filter((a) => (a._id ?? a.id) !== addressId));
      Alert.alert("Sucesso", "Endereço removido com sucesso!");

    } catch (e) {
      const errorMessage = e.response?.data?.message || e.message || "Erro desconhecido. Verifique o console.";
      console.error("Erro ao deletar endereço:", errorMessage);
      Alert.alert("Erro", `Não foi possível remover o endereço. Detalhes: ${errorMessage}`);
    }
  };

  if (loading) {
    return (
      <View style={[styles.screen, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" color="#2F8B88" />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <EnderecoHeader />
      <View style={styles.contentWrapper}>
        {addresses.length > 0 ? (
          <FlatList
            data={addresses}
            keyExtractor={(item) => String(item._id ?? item.id)}
            renderItem={({ item }) => (
              <EnderecoItem
                item={item}
                onDelete={() => handleDelete(item._id ?? item.id)}
                onEdit={() => handleEdit(item)}
              />
            )}
            contentContainerStyle={{ paddingBottom: 16 }}
          />
        ) : (
          <Text style={styles.emptyText}>Nenhum endereço cadastrado.</Text>
        )}

        <Pressable
          style={styles.addBtn}
          onPress={() => router.push("/screens/perfilTutorScreens/EnderecoScreens/NovoEnderecoScreen")}
        >
          <Text style={styles.addBtnText}>Adicionar novo endereço</Text>
        </Pressable>
      </View>
      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F7F7F7",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 60,
  },
  contentWrapper: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: 24,
    paddingHorizontal: 20,
    paddingTop: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 5,
  },
  addBtn: {
    alignSelf: "center",
    marginTop: 16,
    marginBottom: 90,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 16,
    backgroundColor: "#2F8B88",
    alignItems: "center",
    width: "60%"
  },
  addBtnText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 14
  },
  emptyText: {
    textAlign: "center",
    color: "#8E8E8E",
    fontSize: 14,
    marginTop: 20,
  },
});