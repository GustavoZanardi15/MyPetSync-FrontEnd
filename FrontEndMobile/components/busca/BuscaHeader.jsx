import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function BuscaHeader() {
  const router = useRouter();

  return (
    <View style={styles.header}>
      <Pressable
        onPress={() => router.back()}
        style={styles.backButtonAbsolute}
        hitSlop={{ top: 14, bottom: 14, left: 14, right: 14 }}
      >
        <Ionicons name="arrow-back" size={24} color="#2F8B88" />
      </Pressable>
      <Text style={styles.headerTitleCentered}>Buscar</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 44,
    marginBottom: 12,
  },
  backButtonAbsolute: {
    position: "absolute",
    left: 0,
    zIndex: 10,
    paddingVertical: 10,
  },
  headerTitleCentered: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2F8B88",
    textAlign: "center",
  },
});
