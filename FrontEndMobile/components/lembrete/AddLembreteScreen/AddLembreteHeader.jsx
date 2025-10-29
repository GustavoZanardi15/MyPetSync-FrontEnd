import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function AddLembreteHeader({  }) {
  return (
    <View style={styles.header}>
      <Pressable onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#2F8B88" />
      </Pressable>
      <Text style={styles.title}>Adicionar Lembrete</Text>
      <View style={{ width: 40, height: 40 }} /> 
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 10
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2F8B88",
    textAlign: "center",
    flex: 1
  }
});
