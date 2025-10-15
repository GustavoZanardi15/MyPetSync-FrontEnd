import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function HomeHeader() {
  const router = useRouter();

  return (
    <View style={styles.header}>
      <Text style={styles.ola}>
        Olá, <Text style={styles.nome}>Lucas</Text>
      </Text>

      <View style={styles.icons}>
        <Pressable
          style={styles.iconCircle}
          onPress={() => router.push("/screens/home/BuscaScreen")}
        >
          <Ionicons name="search-outline" size={23} color="#2F8B88" />
        </Pressable>

        <Pressable
          style={styles.iconCircle}
          onPress={() => router.push("/screens/home/NotificationScreen")}
        >
          <Ionicons name="notifications-outline" size={23} color="#2F8B88" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: 40,
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  ola: {
    fontSize: 22,
    fontWeight: "400",
    color: "#2F8B88"
  },
  nome: {
    color: "#2F8B88",
    fontWeight: "700"
  },
  icons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10
  },
  iconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 1.5,
    borderColor: "rgba(50, 50, 50, 0.3)",
    justifyContent: "center",
    alignItems: "center"
  }
});
