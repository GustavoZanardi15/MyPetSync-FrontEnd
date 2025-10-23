import React from "react";
import { Text, ScrollView, StyleSheet } from "react-native";
import AvaliacaoCard from "./AvaliacaoCard";

export default function VetAvaliacoesSection({ avaliacoes }) {
  return (
    <>
      <Text style={styles.sectionTitle}>Avaliações</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {avaliacoes.map((avaliacao) => (
          <AvaliacaoCard key={avaliacao.id} avaliacao={avaliacao} />
        ))}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  sectionTitle: { fontSize: 18, fontWeight: "bold", color: "#333", marginBottom: 15 },
  scroll: { paddingVertical: 5, marginBottom: 30 },
});
