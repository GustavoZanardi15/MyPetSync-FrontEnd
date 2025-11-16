import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import * as Linking from "expo-linking";

export default function VetInfoSection({ vet }) {

  const calcularMediaAvaliacoes = () => {
    if (!vet.avaliacoesList || vet.avaliacoesList.length === 0) return 0;
    
    const soma = vet.avaliacoesList.reduce((total, avaliacao) => 
      total + (avaliacao.rating || 0), 0
    );
    return soma / vet.avaliacoesList.length;
  };

  const mediaAvaliacoes = calcularMediaAvaliacoes();
  const totalAvaliacoes = vet.avaliacoesList?.length || 0;

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FontAwesome
          key={i}
          name={i <= rating ? "star" : "star-o"}
          size={14}
          color="#FFC107"
          style={{ marginRight: 2 }}
        />
      );
    }
    return stars;
  };

  return (
    <View style={styles.infoSection}>
      <View>
        <Text style={styles.vetName}>{vet.nome}</Text>
        <Text style={styles.vetSpecialty}>{vet.service}</Text>
        <Text style={styles.vetType}>
          {vet.type === "empresa" ? "Empresa" : "Profissional Autônomo"}
        </Text>
        
        {totalAvaliacoes > 0 ? (
          <View style={styles.ratingRow}>
            <View style={styles.stars}>
              {renderStars(mediaAvaliacoes)}
            </View>
            <Text style={styles.avaliacoesCount}>
              {mediaAvaliacoes.toFixed(1)} ({totalAvaliacoes})
            </Text>
          </View>
        ) : (
          <Text style={styles.noAvaliacoes}>Nenhuma avaliação ainda</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  infoSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  vetName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2F8B88",
  },
  vetSpecialty: {
    fontSize: 16,
    color: "#4A4A4A",
    fontWeight: "600",
    marginBottom: 2,
  },
  vetType: {
    fontSize: 14,
    color: "#8E8E8E",
    marginBottom: 8,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  stars: {
    flexDirection: "row",
    marginRight: 8,
  },
  avaliacoesCount: {
    fontSize: 14,
    color: "#8E8E8E",
  },
  noAvaliacoes: {
    fontSize: 14,
    color: "#8E8E8E",
    fontStyle: "italic",
    marginTop: 4,
  },
});