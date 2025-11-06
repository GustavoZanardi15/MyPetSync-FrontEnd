import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function PerfilTutorHeader({ onEdit }) {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.title}>Perfil do Tutor</Text>
      <Pressable style={styles.editButton} onPress={onEdit}>
        <Ionicons name="pencil" size={22} color="#2F8B88" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    position: "relative",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2F7A67",
    textAlign: "center",
  },
  editButton: {
    position: "absolute",
    right: 0,
    top: -5,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
});
