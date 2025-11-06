import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function InfoTutorCard({ nome, email, telefone }) {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Ionicons name="person-circle-outline" size={22} color="#2F7A67" />
        <Text style={styles.text}>{nome}</Text>
      </View>
      <View style={styles.row}>
        <Ionicons name="mail-outline" size={20} color="#2F7A67" />
        <Text style={styles.text}>{email}</Text>
      </View>
      <View style={styles.row}>
        <Ionicons name="call-outline" size={20} color="#2F7A67" />
        <Text style={styles.text}>{telefone}</Text>
      </View>
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
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  text: {
    marginLeft: 10,
    fontSize: 15,
    color: "#4D4D4D",
  },
});
