import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function NovoLembreteCard({ selectedTipo, selectedPet }) {
  const router = useRouter();

  const handlePress = () => {
    if (!selectedTipo || !selectedPet) {
      alert("Selecione um tipo de lembrete e um pet antes de continuar.");
      return;
    }
    router.push({
      pathname: "/lembrete/addDetalhe",
      params: { tipo: selectedTipo?.name, pet: JSON.stringify(selectedPet) },
    });

  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <Text style={styles.text}>Adicione um novo lembrete</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 12,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
  },
  text: {
    fontSize: 14,
    color: "#2F8B88",
    fontWeight: "500",
  },
});
