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
        <Text style={styles.statValue}>R$ {vet.precoConsulta.toFixed(0)}</Text>
        <Text style={styles.statLabel}>Preço Médio</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#FFF",
    borderRadius: 15,
    paddingVertical: 15,
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statItem: { 
    alignItems: "center", 
    paddingHorizontal: 10,
    flex: 1,
  },
  rightBorder: { 
    borderRightWidth: 1, 
    borderRightColor: "#EFEFEF" 
  },
  statValue: { 
    fontSize: 20, 
    fontWeight: "bold", 
    color: "#2F8B88", 
    marginBottom: 4 
  },
  statLabel: { 
    fontSize: 12, 
    color: "#8E8E8E",
    textAlign: "center",
  },
});