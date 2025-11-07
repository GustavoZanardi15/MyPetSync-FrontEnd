import React, { useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import AddLembreteHeader from "../../../components/lembrete/AddLembreteScreen/AddLembreteHeader";
import TiposLembrete from "../../../components/lembrete/AddLembreteScreen/TiposLembretes";
import PetDropdown from "../../../components/lembrete/AddLembreteScreen/PetDropdown";
import NovoLembreteCard from "../../../components/lembrete/AddLembreteScreen/NovoLembreteCard";
import BottomNav from "../../../components/lembrete/AddLembreteScreen/BottomNav";

const pets = [
  { name: "Theo", image: require("../../../assets/images/home/DogHomePet1.png") },
  { name: "Fred", image: require("../../../assets/images/home/DogHomePet2.png") },
  { name: "Luna", image: require("../../../assets/images/home/CatHomePet.png") }
];

const tiposLembrete = [
  { name: "Remédios", icon: "pill", iconColor: "#2F8B88", iconBg: "#A8E6CF" },
  { name: "Vacinas", icon: "needle", iconColor: "#2F8B88", iconBg: "#DFD4FB" },
  { name: "Exercícios", icon: "basketball", iconColor: "#2F8B88", iconBg: "#A8E6CF" },
  { name: "Água", icon: "cup-water", iconColor: "#2F8B88", iconBg: "#FFD97D" }
];

export default function AddLembreteScreen() {
  const [selectedPet, setSelectedPet] = useState(null);
  const [selectedTipo, setSelectedTipo] = useState(null);

  return (
    <View style={styles.container}>
      <AddLembreteHeader />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TiposLembrete tipos={tiposLembrete} selectedTipo={selectedTipo} setSelectedTipo={setSelectedTipo} />
        <PetDropdown pets={pets} selectedPet={selectedPet} setSelectedPet={setSelectedPet} />
        <NovoLembreteCard
          selectedTipo={selectedTipo}
          selectedPet={selectedPet}
        />
      </ScrollView>
      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9F9F9", paddingTop: 55 },
  scrollContainer: { padding: 16, paddingBottom: 100 }
});
