import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export default function AvaliacaoCard({ avaliacao }) {
  const [expanded, setExpanded] = useState(false);

  // Renderizar estrelas baseadas na avaliação
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FontAwesome
          key={i}
          name={i <= rating ? "star" : "star-o"}
          size={14}
          color="#FFC107"
          style={{ marginRight: 4 }}
        />
      );
    }
    return stars;
  };

  // Formatar data
  const formatDate = (dateString) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('pt-BR');
    } catch (error) {
      return "";
    }
  };

  const MAX_LENGTH = 60;
  const comment = avaliacao.comment || avaliacao.comentario || "";
  const isLong = comment.length > MAX_LENGTH;
  const displayText = expanded
    ? comment
    : isLong
    ? comment.substring(0, MAX_LENGTH) + "..."
    : comment;

  const authorName = avaliacao.author?.name || avaliacao.nome || "Usuário Anônimo";
  const rating = avaliacao.rating || avaliacao.estrelas || 0;
  const date = formatDate(avaliacao.createdAt || avaliacao.data);

  return (
    <View style={styles.card}>
      {/* Cabeçalho com nome e data */}
      <View style={styles.header}>
        <Text style={styles.nome}>{authorName}</Text>
        <Text style={styles.data}>{date}</Text>
      </View>

      {/* Estrelas */}
      <View style={styles.stars}>
        {renderStars(rating)}
      </View>

      {/* Comentário com opção de expandir */}
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
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
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
    marginBottom: 10,
  },
  comentario: {
    fontSize: 13,
    color: "#8E8E8E",
    lineHeight: 18,
  },
  lerMais: {
    color: "#89CFF0",
    fontSize: 13,
    fontWeight: "600",
  },
});