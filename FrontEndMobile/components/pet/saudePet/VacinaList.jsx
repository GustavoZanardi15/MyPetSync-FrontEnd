import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function VacinaList({ vacinas, petName, onAdd }) {
    return (
        <View style={styles.section}>
            
            <View style={styles.titleRow}>
                <Text style={styles.sectionTitle}>Vacinas</Text>
                
                <Pressable style={styles.addButton} onPress={onAdd}>
                    <Ionicons name="add" size={20} color="#fff" />
                </Pressable>
            </View>

            {vacinas?.length > 0 ? (
                vacinas.map((v, index) => (
                    <View key={index} style={styles.card}>
                        <Text style={styles.vacinaName}>{v.nome ?? "Vacina"}</Text>

                        <View style={styles.row}>
                            <Text style={styles.label}>Dose:</Text>
                            <Text style={styles.value}>{v.dose ?? "-"}</Text>
                        </View>

                        <View style={styles.row}>
                            <Text style={styles.label}>Próxima:</Text>
                            <Text style={styles.value}>{v.proxima ?? "-"}</Text>
                        </View>
                    </View>
                ))
            ) : (
                <Text style={styles.emptyText}>Nenhuma vacina cadastrada para {petName}.</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 25,
  },

  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    paddingRight: 8,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2F8B88",
  },

  addButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#2F8B88",
    justifyContent: "center",
    alignItems: "center",
  },

  emptyText: {
    fontSize: 14,
    color: "#999",
    marginTop: 5,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 18,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },

  vacinaName: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#2F8B88",
    marginBottom: 6,
  },

  row: {
    flexDirection: "row",
    marginBottom: 3,
  },

  label: {
    color: "#777",
    fontWeight: "600",
    width: 70,
  },

  value: {
    color: "#444",
  },
});
