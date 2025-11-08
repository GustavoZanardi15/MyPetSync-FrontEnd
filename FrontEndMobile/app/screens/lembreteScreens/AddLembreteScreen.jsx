import React, { useState, useCallback } from "react";
import { View, ScrollView, StyleSheet, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";

import AddLembreteHeader from "../../../components/lembrete/AddLembreteScreen/AddLembreteHeader";
import TiposLembrete from "../../../components/lembrete/AddLembreteScreen/TiposLembretes";
import PetDropdown from "../../../components/lembrete/AddLembreteScreen/PetDropdown";
import NovoLembreteCard from "../../../components/lembrete/AddLembreteScreen/NovoLembreteCard";
import BottomNav from "../../../components/lembrete/AddLembreteScreen/BottomNav";

const pets = [
  { name: "Theo", image: require("../../../assets/images/home/DogHomePet1.png") },
  { name: "Fred", image: require("../../../assets/images/home/DogHomePet2.png") },
  { name: "Luna", image: require("../../../assets/images/home/CatHomePet.png") },
];

const tiposLembrete = [
  { name: "Remédios", icon: "pill", iconColor: "#2F8B88", iconBg: "#A8E6CF" },
  { name: "Vacinas", icon: "needle", iconColor: "#2F8B88", iconBg: "#DFD4FB" },
  { name: "Exercícios", icon: "basketball", iconColor: "#2F8B88", iconBg: "#A8E6CF" },
  { name: "Água", icon: "cup-water", iconColor: "#2F8B88", iconBg: "#FFD97D" },
];

export default function AddLembreteScreen() {
  const [selectedPet, setSelectedPet] = useState(null);
  const [selectedTipo, setSelectedTipo] = useState(null);
  const [lembretes, setLembretes] = useState([]);

  // Recarrega lembretes sempre que a tela for reaberta
  useFocusEffect(
    useCallback(() => {
      const loadLembretes = async () => {
        try {
          const data = await AsyncStorage.getItem("lembretes");
          if (data) setLembretes(JSON.parse(data));
        } catch (err) {
          console.log("Erro ao carregar lembretes:", err);
        }
      };
      loadLembretes();
    }, [])
  );

  return (
    <View style={styles.container}>
      <AddLembreteHeader />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TiposLembrete
          tipos={tiposLembrete}
          selectedTipo={selectedTipo}
          setSelectedTipo={setSelectedTipo}
        />
        <PetDropdown
          pets={pets}
          selectedPet={selectedPet}
          setSelectedPet={setSelectedPet}
        />

        {/* Renderiza lembretes salvos */}
        {lembretes
          .filter((l) => !selectedPet || l.pet === selectedPet.name)
          .map((l, index) => (
            <View key={index} style={styles.lembreteCard}>
              <View>
                <Text style={styles.lembreteTitulo}>{l.nome}</Text>
                <Text style={styles.lembreteSub}>
                  {`${l.horario}h  •  ${l.quantidade} ${l.tipo}`}
                </Text>
              </View>
            </View>
          ))}

        <NovoLembreteCard selectedTipo={selectedTipo} selectedPet={selectedPet} />
      </ScrollView>
      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9F9F9", paddingTop: 55 },
  scrollContainer: { padding: 16, paddingBottom: 100 },
  lembreteCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
  },
  lembreteTitulo: {
    color: "#2F8B88",
    fontWeight: "600",
    fontSize: 15,
  },
  lembreteSub: {
    color: "#999",
    fontSize: 13,
    marginTop: 4,
  },
});
