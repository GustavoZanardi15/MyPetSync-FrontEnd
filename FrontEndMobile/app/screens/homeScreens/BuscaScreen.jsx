import React, { useState, useMemo } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import BuscaHeader from "../../../components/busca/BuscaHeader";
import BuscaForm from "../../../components/busca/BuscaForm";
import BuscaResultados from "../../../components/busca/BuscaResultados";
import BottomNav from "../../../components/busca/BottomNav";

const RECENT_ITEMS = [
  "Banho & Tosa",
  "Passeio",
  "Hospedagem para o fim de semana",
  "Treinamento / Adestramento",
  "Médicos Veterinários",
  "Consultas Veterinárias",
  "Vacinação",
  "Castração",
  "Venda de Ração",
  "Acessórios Pet",
];

export default function BuscaScreen() {
  const [searchText, setSearchText] = useState("");

  const filteredItems = useMemo(() => {
    if (!searchText) return RECENT_ITEMS;
    const lowerCaseSearch = searchText.toLowerCase();
    return RECENT_ITEMS.filter((item) => item.toLowerCase().includes(lowerCaseSearch));
  }, [searchText]);

  const handleItemPress = (item) => console.log(`Buscando e navegando para: ${item}`);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <BuscaHeader/>
        <BuscaForm searchText={searchText} setSearchText={setSearchText} />
        <BuscaResultados filteredItems={filteredItems} searchText={searchText} onItemPress={handleItemPress} />
      </ScrollView>
      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },
  scrollContent: {
    paddingTop: 40,
    paddingBottom: 80,
    paddingHorizontal: 20,
  },
});
