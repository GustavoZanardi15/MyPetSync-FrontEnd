import React, { useEffect, useState, useCallback, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Platform,
  StatusBar,
  Pressable,
  Image,
  Animated,
  PanResponder,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import api from "../../../src/service/api";

const TYPE_META = {
  home: { chip: "Casa", icon: "home-outline", color: "#00C853" },
  work: { chip: "Trabalho", icon: "briefcase-outline", color: "#2962FF" },
  other: { chip: "Outro", icon: "map-marker-outline", color: "#FFD600" },
};

const EnderecoItem = ({ item, onDelete }) => {
  const translateX = useRef(new Animated.Value(0)).current;
  const meta = TYPE_META[item.type] ?? TYPE_META.other;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) =>
        Math.abs(gestureState.dx) > 5 && Math.abs(gestureState.dy) < 10,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dx < 0) translateX.setValue(Math.max(gestureState.dx, -80));
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx < -40) {
          Animated.timing(translateX, {
            toValue: -80,
            duration: 150,
            useNativeDriver: true,
          }).start();
        } else {
          Animated.timing(translateX, {
            toValue: 0,
            duration: 150,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  return (
    <View style={styles.itemWrapper}>
      <View style={styles.deleteContainer}>
        <Pressable onPress={() => onDelete(item.id)} style={styles.deleteBtn}>
          <MaterialCommunityIcons name="delete-outline" size={22} color="#FF5252" />
        </Pressable>
      </View>

      <Animated.View
        style={[styles.item, { transform: [{ translateX }] }]}
        {...panResponder.panHandlers}
      >
        <View
          style={[
            styles.chip,
            { backgroundColor: `${meta.color}33`, borderColor: meta.color },
          ]}
        >
          <MaterialCommunityIcons name={meta.icon} size={16} color={meta.color} />
          <Text style={[styles.chipText, { color: meta.color }]}>{meta.chip}</Text>
        </View>
        <Text style={styles.addressText}>{item.line}</Text>
      </Animated.View>
    </View>
  );
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
      console.log("Erro ao buscar endereços:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEnderecos();
  }, [fetchEnderecos]);

  const handleDelete = async (id) => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) throw new Error("Token ausente");

      await api.delete(`/tutor/enderecos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setAddresses((prev) => prev.filter((a) => a.id !== id));
    } catch (e) {
      console.log("Erro ao deletar endereço:", e);
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
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <MaterialCommunityIcons name="chevron-left" size={24} color="#2F8B88" />
        </Pressable>
        <Text style={styles.headerTitle}>Endereços</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.contentWrapper}>
        <FlatList
          data={addresses}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => <EnderecoItem item={item} onDelete={handleDelete} />}
          contentContainerStyle={{ paddingBottom: 16 }}
        />

        <Pressable
          style={styles.addBtn}
          onPress={() => router.push("/screens/perfilTutorScreens/NovoEnderecoScreen")}
        >
          <Text style={styles.addBtnText}>+ Adicionar novo endereço</Text>
        </Pressable>
      </View>

      <View style={styles.bottomNav}>
        <Pressable onPress={() => router.push("/screens/lembreteScreens/LembreteScreen")}>
          <Image source={require("../../../assets/images/home/NavBarCalendar.png")} />
        </Pressable>
        <Pressable onPress={() => router.push("/screens/servicoScreens/ServicoPetScreen")}>
          <Image source={require("../../../assets/images/home/NavBarServico.png")} />
        </Pressable>
        <Pressable onPress={() => router.push("/screens/homeScreens/HomeScreen")}>
          <Image source={require("../../../assets/images/home/NavBarHome.png")} />
        </Pressable>
        <Pressable onPress={() => router.push("/screens/perfilPetScreens/PerfilPetScreen")}>
          <Image source={require("../../../assets/images/home/NavBarPet.png")} />
        </Pressable>
        <Pressable onPress={() => router.push("/screens/perfilTutorScreens/PerfilTutorScreen")}>
          <Image source={require("../../../assets/images/home/NavBarPerfilSelect.png")} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F4F6F6",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 60
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 24,
    marginVertical: 16
  },
  backBtn: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center"
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2F8B88"
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
    elevation: 5
  },
  itemWrapper: {
    marginBottom: 12,
    position: "relative"
  },
  item: {
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 96,
    height: 36,
    borderWidth: 1,
    borderRadius: 18,
    paddingHorizontal: 8,
    gap: 6,
    marginBottom: 6
  },
  chipText: {
    fontSize: 12,
    fontWeight: "600"
  },
  addressText: {
    fontSize: 14,
    color: "#2F8B88"
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#E5E7EB",
    marginTop: 8
  },
  deleteContainer: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    width: 80,
    justifyContent: "center",
    alignItems: "center"
  },
  deleteBtn: {
    backgroundColor: "#FFEAEA",
    borderRadius: 16,
    padding: 12
  },
  addBtn: {
    alignSelf: "center",
    marginTop: 16,
    marginBottom: 90,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 16,
    backgroundColor: "#2F8B88"
  },
  addBtnText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 14
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 25,
    paddingVertical: 10,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 0.3,
    borderColor: "#ccc",
    height: 70,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 10
  }
});
