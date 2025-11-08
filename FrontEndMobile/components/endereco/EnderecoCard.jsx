import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function EnderecoCard({ item, onDelete }) {
  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <View style={[styles.tag, { backgroundColor: item.color || "#A8E6CF" }]}>
          <MaterialCommunityIcons name={item.icon} size={16} color="#2F8B88" />
          <Text style={styles.tagText}>{item.tipo}</Text>
        </View>

        {onDelete && (
          <TouchableOpacity onPress={() => onDelete(item)} style={styles.deleteButton}>
            <MaterialCommunityIcons name="trash-can-outline" size={22} color="#E63946" />
          </TouchableOpacity>
        )}
      </View>

      <Text style={styles.textEndereco}>{item.endereco}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    elevation: 2,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  tag: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  tagText: {
    color: "#2F8B88",
    fontSize: 13,
    fontWeight: "600",
    marginLeft: 5,
  },
  textEndereco: {
    fontSize: 14,
    color: "#333",
    marginTop: 4,
  },
  deleteButton: {
    padding: 4,
  },
});
