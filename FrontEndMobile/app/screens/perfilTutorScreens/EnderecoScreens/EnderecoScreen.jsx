import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Platform,
  StatusBar,
  Pressable,
  Alert,
} from "react-native";
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

  // 🔹 Busca os endereços do tutor logado
  const fetchEnderecos = useCallback(async () => {
    setLoading(true);
    try {
      const token =
        (await AsyncStorage.getItem("access-token")) ||
        (await AsyncStorage.getItem("userToken"));
      if (!token) throw new Error("Token ausente");

      const resp = await api.get("/tutors/mine", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const tutor = resp?.data;
      const data = tutor?.addresses ?? [];
      setAddresses(Array.isArray(data) ? data : []);
    } catch (e) {
      console.log("Erro ao buscar endereços:", e);
      setAddresses([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // 🔹 Atualiza lista quando a tela ganha foco
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", fetchEnderecos);
    return unsubscribe;
  }, [navigation, fetchEnderecos]);

  // 🔹 Exclui o endereço
  const handleDelete = async (indexToRemove) => {
    try {
      const token =
        (await AsyncStorage.getItem("access-token")) ||
        (await AsyncStorage.getItem("userToken"));
      if (!token) throw new Error("Token ausente");

      const tutorResp = await api.get("/tutors/mine", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const tutor = tutorResp.data;

      const updatedAddresses = tutor.addresses.filter(
        (_, index) => index !== indexToRemove
      );

      await api.put(
        "/tutors/mine",
        { addresses: updatedAddresses },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setAddresses(updatedAddresses);
    } catch (e) {
      console.error("Erro ao deletar endereço:", e);
      Alert.alert("Erro", "Não foi possível excluir o endereço.");
    }
  };

  // 🔹 Editar endereço
  const handleEdit = (item) => {
    router.push({
      pathname:
        "/screens/perfilTutorScreens/EnderecoScreens/EditarEnderecoScreen",
      params: { endereco: JSON.stringify(item) },
    });
  };

  if (loading) {
    return (
      <View
        style={[
          styles.screen,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
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
            keyExtractor={(item, index) =>
              String(item._id || item.id || index)
            }
            renderItem={({ item, index }) => (
              <EnderecoItem
                item={item}
                onDelete={() => handleDelete(index)}
                onEdit={handleEdit} // ✅ botão de editar funcionando
              />
            )}
            contentContainerStyle={{ paddingBottom: 16 }}
          />
        ) : (
          <Text style={styles.emptyText}>Nenhum endereço cadastrado.</Text>
        )}

        <Pressable
          style={styles.addBtn}
          onPress={() =>
            router.push(
              "/screens/perfilTutorScreens/EnderecoScreens/NovoEnderecoScreen"
            )
          }
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
  },
  addBtnText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 14,
  },
  emptyText: {
    textAlign: "center",
    color: "#888",
    fontSize: 14,
    marginTop: 20,
  },
});
