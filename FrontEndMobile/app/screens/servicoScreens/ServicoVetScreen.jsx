import React, { useState } from "react";
import { View, ScrollView, StyleSheet, StatusBar, Platform } from "react-native";
import VetHeader from "../../../components/servico/servicoVet/VetHeader";
import VetCard from "../../../components/servico/servicoVet/VetCard";
import BottomNav from "../../../components/servico/servicoVet/BottomNav";
import FiltroVet from "../../../components/servico/servicoVet/FiltrarVet";

export default function ServicoVetScreen() {
  const [veterinariosFiltrados, setVeterinariosFiltrados] = useState(null);

  const veterinarios = [
    {
      id: 1,
      nome: "Dra. Carolina Vivaz",
      especialidade: "Médica Veterinária Oncológica",
      estrelas: 5,
      avaliacoes: 1094,
      foto: require("../../../assets/images/home/Vet1.png"),
    },
    {
      id: 2,
      nome: "Dr. Miguel Leal",
      especialidade: "Cirurgião Geral",
      estrelas: 2.5,
      avaliacoes: 385,
      foto: require("../../../assets/images/home/Vet2.png"),
    },
    {
      id: 3,
      nome: "Dra. Bianca Vargas",
      especialidade: "Oncologia",
      estrelas: 4,
      avaliacoes: 124,
      foto: require("../../../assets/images/home/Vet3.png"),
    },
    {
      id: 4,
      nome: "Dr. Samuel Perez",
      especialidade: "Clínico Geral",
      estrelas: 4,
      avaliacoes: 231,
      foto: require("../../../assets/images/home/DogHome.png"),
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" translucent />
      <VetHeader />

      <FiltroVet
        onSelecionar={(filtroSelecionado, correspondencias) => {
          if (!filtroSelecionado) {
            setVeterinariosFiltrados(veterinarios);
          } else {
            const filtrados = veterinarios.filter((v) =>
              correspondencias.some((esp) =>
                v.especialidade.toLowerCase().includes(esp.toLowerCase())
              )
            );
            setVeterinariosFiltrados(filtrados);
          }
        }}
      />

      <ScrollView contentContainerStyle={styles.scroll}>
        {(veterinariosFiltrados || veterinarios).map((vet) => (
          <VetCard key={vet.id} vet={vet} />
        ))}
      </ScrollView>

      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 10 : 40,
  },
  scroll: {
    paddingHorizontal: 16,
    paddingBottom: 80,
  },
});
