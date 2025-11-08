import React from "react";
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import BottomNav from "../../../components/lembrete/AddLembreteScreen/BottomNav";

export default function ServicoTutorScreen() {
  const hoje = [
    {
      id: 1,
      nome: "Dra. Carolina Vivaz",
      cargo: "Médica Veterinária Oncológica",
      data: "20 Ago",
      diaSemana: "Segunda-feira",
      hora: "09:30",
      imagem: require("../../../assets/images/servicos/vet1.png"),
    },
  ];

  const mes = [
    {
      id: 2,
      nome: "Diego Cruz",
      cargo: "PetWalker",
      data: "18 Ago",
      diaSemana: "Terça-feira",
      hora: "18:00",
      imagem: require("../../../assets/images/servicos/petwalker.png"),
    },
    {
      id: 3,
      nome: "S.O.S Animal",
      cargo: "Petshop Banho",
      data: "17 Ago",
      diaSemana: "Segunda-feira",
      hora: "10:00",
      imagem: require("../../../assets/images/servicos/petshop.png"),
    },
  ];

  const renderCard = (item) => (
    <TouchableOpacity key={item.id} style={styles.card}>
      <View style={styles.leftBorder} />
      <View style={styles.cardContent}>
        <Image source={item.imagem} style={styles.avatar} />
        <View style={{ flex: 1 }}>
          <Text style={styles.nome}>{item.nome}</Text>
          <Text style={styles.cargo}>{item.cargo}</Text>
          <Text style={styles.data}>
            {item.data} - {item.diaSemana}{" "}
            <Text style={styles.hora}>{item.hora}</Text>
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialCommunityIcons name="arrow-left" size={24} color="#2F8B88" />
        <Text style={styles.headerTitle}>Pet Serviços</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.sectionTitle}>Hoje</Text>
        {hoje.map(renderCard)}

        <Text style={styles.sectionTitle}>Esse mês</Text>
        {mes.map(renderCard)}
      </ScrollView>

      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9F9F9", paddingTop: 55 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2F8B88",
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 120,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2F8B88",
    marginTop: 10,
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    elevation: 2,
    flexDirection: "row",
  },
  leftBorder: {
    width: 4,
    backgroundColor: "#2F8B88",
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    marginRight: 12,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  nome: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333",
  },
  cargo: {
    fontSize: 13,
    color: "#777",
    marginVertical: 2,
  },
  data: {
    fontSize: 12,
    color: "#2F8B88",
  },
  hora: {
    fontWeight: "600",
  },
});
