import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function NovaSenhaHeader() {
  const router = useRouter();
  return (
    <View style={styles.header}>
      <Pressable onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="#2F8B88" /> 
      </Pressable>
      <Text style={styles.headerTitle}>Redefinir senha</Text>
      <View style={{ width: 24 }} /> 
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 0, 
    paddingBottom: 20, 
    backgroundColor: "#F7F7F7", 
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2F8B88",
  },
});