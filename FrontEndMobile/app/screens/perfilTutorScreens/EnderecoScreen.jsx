import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import api from "../../../src/service/api";

const TYPE_META = {
  home: { chip: "Casa", icon: "home-outline", color: "#2F7D73" },
  work: { chip: "Work", icon: "briefcase-outline", color: "#2F7D73" },
  other: { chip: "Other", icon: "map-marker-outline", color: "#8B5CF6" },
};

export default function EnderecoScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [addresses, setAddresses] = useState([]);

  const fetchEnderecos = useCallback(async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) throw new Error("Token ausente");

      let data;
      try {
        const resp = await api.get("/tutor/enderecos", {
          headers: { Authorization: `Bearer ${token}` },
        });
        data = resp?.data;
      } catch {
        const me = await api.get("/usuarios/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        data = me?.data?.enderecos;
      }

      if (!Array.isArray(data) || data.length === 0) {
        data = [
          { id: "1", type: "home", line: "Rua Antonio Salema 666, Zona 02" },
          { id: "2", type: "work", line: "Av Humaitá 542, Zona 02" },
          { id: "3", type: "other", line: "Rua José de Alencar 1091, Centro" },
        ];
      }

      setAddresses(
        data.map((a, idx) => ({
          id: a.id ?? String(idx + 1),
          type: (a.type ?? "other").toLowerCase(),
          line: a.line ?? a.endereco ?? "",
        }))
      );
    } catch (e) {
      setAddresses([
        { id: "1", type: "home", line: "Rua Antonio Salema 666, Zona 02" },
        { id: "2", type: "work", line: "Av Humaitá 542, Zona 02" },
        { id: "3", type: "other", line: "Rua José de Alencar 1091, Centro" },
      ]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEnderecos();
  }, [fetchEnderecos]);

  const renderItem = ({ item }) => {
    const meta = TYPE_META[item.type] ?? TYPE_META.other;

    return (
      <View style={styles.itemWrapper}>
        <Pressable
          style={({ pressed }) => [styles.item, pressed && { opacity: 0.85 }]}
          onPress={() => router.push("/screens/perfilTutorScreens/RemoverEnderecoScreen")}
        >
          {/* Chip de tipo */}
          <View style={[styles.chip, { backgroundColor: `${meta.color}1A`, borderColor: meta.color }]}>
            <MaterialCommunityIcons name={meta.icon} size={16} color={meta.color} />
            <Text style={[styles.chipText, { color: meta.color }]}>{meta.chip}</Text>
          </View>

          {/* Linha do endereço */}
          <Text style={styles.addressText}>{item.line}</Text>
        </Pressable>

        <View style={styles.divider} />
      </View>
    );
  };

  if (loading) {
    return (
      <View style={[styles.screen, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={({ pressed }) => [styles.backBtn, pressed && { opacity: 0.6 }]}>
          <MaterialCommunityIcons name="chevron-left" size={24} color="#2F7D73" />
        </Pressable>
        <Text style={styles.headerTitle}>Endereço</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.card}>
        <FlatList
          data={addresses}
          keyExtractor={(it) => String(it.id)}
          renderItem={renderItem}
          contentContainerStyle={{ paddingTop: 8, paddingBottom: 8 }}
        />

       
        <Pressable
          style={({ pressed }) => [styles.addBtn, pressed && { transform: [{ translateY: 1 }] }]}
          onPress={() => router.push("/screens/perfilTutorScreens/NovoEnderecoScreen")}
        >
          <Text style={styles.addBtnText}>+ Adicionar novo endereço</Text>
        </Pressable>
      </View>

      <View style={{ height: 20 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F4F6F6",
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  backBtn: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2A2A2A",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  itemWrapper: {
    position: "relative",
  },
  item: {
    paddingVertical: 10,
    paddingRight: 44,
  },
  chip: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginBottom: 6,
  },
  chipText: {
    fontSize: 12,
    fontWeight: "600",
  },
  addressText: {
    fontSize: 14,
    color: "#2A2A2A",
    marginBottom: 6,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#E5E7EB",
  },
  addBtn: {
    alignSelf: "center",
    marginTop: 14,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: "#2F7D73",
  },
  addBtnText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 14,
  },
});
