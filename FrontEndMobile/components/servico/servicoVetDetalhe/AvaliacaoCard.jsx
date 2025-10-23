import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export default function AvaliacaoCard({ avaliacao }) {
  const renderStars = (count) =>
    Array.from({ length: 5 }, (_, i) => (
      <FontAwesome
        key={i}
        name={i < Math.floor(count) ? "star" : i < count ? "star-half-full" : "star-o"}
        size={10}
        color="#FFC107"
        style={{ marginRight: 4 }}
      />
    ));

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.nome}>{avaliacao.nome}</Text>
        <Text style={styles.data}>{avaliacao.data}</Text>
      </View>
      <View style={styles.stars}>{renderStars(avaliacao.estrelas)}</View>
      <Text style={styles.comentario}>
        {avaliacao.comentario}{" "}
        <Text style={{ color: "#2F8B88", fontWeight: "500" }}>Ler mais</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 280,
    backgroundColor: "#F9FAFB",
    borderRadius: 10,
    padding: 15,
    marginRight: 15,
    borderWidth: 1,
    borderColor: "#EFEFEF",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  nome: { fontWeight: "600", color: "#2F8B88" },
  data: { fontSize: 12, color: "#A9A9A9" },
  stars: { flexDirection: "row", marginBottom: 8 },
  comentario: { fontSize: 13, color: "#666", lineHeight: 18 },
});
