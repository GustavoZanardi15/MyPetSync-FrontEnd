import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export default function AvaliacaoCard({ avaliacao }) {
  const [expanded, setExpanded] = useState(false);

  const renderStars = (count) =>
    Array.from({ length: 5 }, (_, i) => (
      <FontAwesome
        key={i}
        name={i < Math.floor(count) ? "star" : i < count ? "star-half-full" : "star-o"}
        size={14}
        color="#FFC107"
        style={{ marginRight: 4 }}
      />
    ));

  const MAX_LENGTH = 60;
  const isLong = avaliacao.comentario.length > MAX_LENGTH;
  const displayText = expanded
    ? avaliacao.comentario
    : isLong
    ? avaliacao.comentario.substring(0, MAX_LENGTH) + "..."
    : avaliacao.comentario;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.nome}>{avaliacao.nome}</Text>
        <Text style={styles.data}>{avaliacao.data}</Text>
      </View>

      <View style={styles.stars}>{renderStars(avaliacao.estrelas)}</View>

      <Text style={styles.comentario}>
        {displayText}{" "}
        {isLong && (
          <Pressable onPress={() => setExpanded(!expanded)}>
            <Text style={styles.lerMais}>
              {expanded ? "Ler menos" : "Ler mais"}
            </Text>
          </Pressable>
        )}
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
  nome: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#2F8B88",
  },
  data: {
    fontSize: 12,
    color: "#A9A9A9",
  },
  stars: {
    flexDirection: "row",
    marginBottom: 8,
  },
  comentario: {
    fontSize: 13,
    color: "#8E8E8E",
    lineHeight: 18,
  },
  lerMais: {
    color: "#89CFF0",
    fontSize: 13,
    fontWeight: "regular",
  },
});
