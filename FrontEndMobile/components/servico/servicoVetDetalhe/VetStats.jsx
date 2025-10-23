import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function VetStats({ vet }) {
  return (
    <View style={styles.statsContainer}>
      <View style={[styles.statItem, styles.rightBorder]}>
        <Text style={styles.statValue}>{vet.experiencia}</Text>
        <Text style={styles.statLabel}>Experiência</Text>
      </View>
      <View style={[styles.statItem, styles.rightBorder]}>
        <Text style={styles.statValue}>{vet.consultasRealizadas}</Text>
        <Text style={styles.statLabel}>Consultas</Text>
      </View>
      <View style={styles.statItem}>
        <Text style={styles.statValuePrice}>{vet.precoConsulta}</Text>
        <Text style={styles.statLabel}>Preço</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#F7F7F7",
    borderRadius: 15,
    paddingVertical: 15,
    marginBottom: 30,
  },
  statItem: { alignItems: "center", paddingHorizontal: 10 },
  rightBorder: { borderRightWidth: 1, borderRightColor: "#EFEFEF" },
  statValue: { fontSize: 18, fontWeight: "bold", color: "#2F8B88", marginBottom: 4 },
  statValuePrice: { fontSize: 18, fontWeight: "bold", color: "#FF6347", marginBottom: 4 },
  statLabel: { fontSize: 12, color: "#888" },
});
