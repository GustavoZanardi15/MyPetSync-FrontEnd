import React, { useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import HomeHeader from "../../../components/home/HomeHeader";
import SpaCard from "../../../components/home/SpaCard";
import PetSelector from "../../../components/home/PetSelector";
import LembretesSection from "../../../components/home/LembretesSection";
import VeterinariosSection from "../../../components/home/VeterinariosSection";
import BottomNav from "../../../components/home/BottomNav";

export default function HomeScreen() {
  const [selectedPet, setSelectedPet] = useState(0);

  // PETS DISPONÍVEIS
  const pets = [
    { id: 0, image: require("../../../assets/images/home/DogHomePet1.png") },
    { id: 1, image: require("../../../assets/images/home/DogHomePet2.png") },
    { id: 2, image: require("../../../assets/images/home/CatHomePet.png") }
  ];

  // LEMBRETES POR PET
  const reminders = [
    [
      { title: "Colírio Ocular", subtitle: "Aplicar 3 gotas, manhã e noite", time: "08:45 - 20:45", repeat: "Diariamente" },
      { title: "Passeio", subtitle: "Lembrar de levar água", time: "18:00 - 19:00", repeat: "Quarta-feira" }
    ],
    [
      { title: "Petshop", subtitle: "Banho e tosa", time: "09:00", repeat: "Sexta-feira" }
    ],
    [
      { title: "Vacina", subtitle: "Levar ao veterinário", time: "10:00", repeat: "Anual" }
    ]
  ];
  
  const vets = [
    { name: "Carolina Vivaz", image: require("../../../assets/images/home/Vet1.png"), rating: 4 },
    { name: "José Augusto", image: require("../../../assets/images/home/Vet2.png"), rating: 4 },
    { name: "Alisson Dias", image: require("../../../assets/images/home/Vet3.png"), rating: 3 }
  ];

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <HomeHeader/>

        {/* SPA CARD */}
        <SpaCard />

        {/* SELEÇÃO DE PET */}
        <PetSelector pets={pets} selectedPet={selectedPet} setSelectedPet={setSelectedPet} />

        {/* LEMBRETES */}
        <LembretesSection reminders={reminders[selectedPet] || []} />

        {/* VETERINÁRIOS */}
        <VeterinariosSection vets={vets} />
      </ScrollView>

      {/* BOTTOM NAV */}
      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9"
  },
  scrollContent: {
    paddingBottom: 80
  }
});
