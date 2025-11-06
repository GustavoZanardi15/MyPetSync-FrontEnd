import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function OpcoesPerfilCard({ onLogout, onEndereco, onServicos, onLembretes }) {
  return (
    <View style={styles.card}>
      <Pressable style={styles.option} onPress={onEndereco}>
        <View style={[styles.iconContainer, { backgroundColor: "#FFE7A3" }]}>
          <Ionicons name="home-outline" size={20} color="#2F7A67" />
        </View>
        <Text style={styles.optionText}>Endereço</Text>
      </Pressable>

      <Pressable style={styles.option} onPress={onServicos}>
        <View style={[styles.iconContainer, { backgroundColor: "#E5D4FF" }]}>
          <Ionicons name="briefcase-outline" size={20} color="#2F7A67" />
        </View>
        <Text style={styles.optionText}>Serviços</Text>
      </Pressable>

      <Pressable style={styles.option} onPress={onLembretes}>
        <View style={[styles.iconContainer, { backgroundColor: "#C8E8E0" }]}>
          <Ionicons name="calendar-outline" size={20} color="#2F7A67" />
        </View>
        <Text style={styles.optionText}>Lembretes</Text>
      </Pressable>

      <Pressable onPress={onLogout} style={styles.logout}>
        <Text style={styles.logoutText}>Sair</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginTop: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  optionText: {
    fontSize: 15,
    color: "#2F7A67",
    marginLeft: 10,
  },
  logout: {
    paddingVertical: 12,
  },
  logoutText: {
    color: "#D9534F",
    fontWeight: "500",
  },
});
