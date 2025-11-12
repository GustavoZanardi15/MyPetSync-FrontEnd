import React, { useState, useCallback } from "react";
import {  View, ScrollView, StyleSheet, Platform, StatusBar, ActivityIndicator, Alert, Text } from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../../src/service/api";
import { API_BASE_URL } from "../../../src/config/api";

import ServicoHeader from "../../../components/servico/servicoLista/ServicoHeader";
import PetSelector from "../../../components/servico/servicoLista/PetSelector";
import ServicoCard from "../../../components/servico/servicoLista/ServicoCard";
import BottomNav from "../../../components/servico/servicoLista/BottomNav";

const PET_COLORS = [
  "#A9E4D4",
  "#B0C4DE",
  "#FFC0CB",
  "#F0E68C",
  "#ADD8E6",
  "#FAFAD2",
  "#DDA0DD",
];

const petColorMap = new Map();

const getStablePetColor = (petId) => {
  if (petColorMap.has(petId)) return petColorMap.get(petId);

  const hash = petId
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const color = PET_COLORS[hash % PET_COLORS.length];
  petColorMap.set(petId, color);
  return color;
};

const DEFAULT_AVATAR_DOG = require("../../../assets/images/addPet/Dog.png");
const DEFAULT_AVATAR_CAT = require("../../../assets/images/addPet/Cat.png");

const formatPetData = (pet) => {
  const isDog =
    pet.especie?.toLowerCase() === "cachorro" ||
    pet.especie?.toLowerCase() === "cão";

  const imageSource = pet.foto
    ? { uri: `${API_BASE_URL}${pet.foto}` }
    : isDog
    ? DEFAULT_AVATAR_DOG
    : DEFAULT_AVATAR_CAT;

  return {
    id: pet._id,
    name: pet.nome,
    image: imageSource,
    color: getStablePetColor(pet._id),
  };
};

const servicosData = [
  {
    nome: "Banho & Tosa",
    cor: "#A8E6CF",
    imagem: require("../../../assets/images/servicos/BanhoTosa.png"),
  },
  {
    nome: "Hospedagem",
    cor: "#89CFF0",
    imagem: require("../../../assets/images/servicos/Hospedagem.png"),
  },
  {
    nome: "Passeios",
    cor: "#FFD97D",
    imagem: require("../../../assets/images/servicos/Passeios.png"),
  },
  {
    nome: "Veterinário",
    cor: "#DFD4FB",
    imagem: require("../../../assets/images/servicos/Veterinário.png"),
  },
  {
    nome: "Cuidadora",
    cor: "#FF9D97",
    imagem: require("../../../assets/images/servicos/Cuidadora.png"),
  },
  {
    nome: "Adestrador",
    cor: "#D9D9D9",
    imagem: require("../../../assets/images/servicos/Adestrador.png"),
  },
];

export default function ServicoPetScreen() {
  const [pets, setPets] = useState([]);
  const [selectedPetId, setSelectedPetId] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const getAuthToken = async () => {
    try {
      return await AsyncStorage.getItem("userToken");
    } catch {
      return null;
    }
  };

  const fetchPets = useCallback(async () => {
    setLoading(true);
    const token = await getAuthToken();

    if (!token) {
      Alert.alert("Erro", "Sessão expirada. Faça login novamente.");
      setLoading(false);
      return;
    }

    try {
      const response = await api.get("/pets", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const fetchedPets = (response.data || []).map(formatPetData);
      setPets(fetchedPets);
      setSelectedPetId(fetchedPets[0]?._id || fetchedPets[0]?.id || null);
    } catch (error) {
      console.error("Erro ao buscar pets:", error.response?.data || error.message);
      Alert.alert("Erro", "Não foi possível carregar seus pets.");
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchPets();
    }, [fetchPets])
  );

  const handleSelectPet = (petId) => setSelectedPetId(petId);

  const handleSelectServico = (servicoNome) => {
    router.push(
      `/screens/servicoScreens/ServicoVetScreen?servico=${encodeURIComponent(servicoNome)}`
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <ServicoHeader />

        {loading ? (
          <ActivityIndicator size="large" color="#2196f3" style={{ marginTop: 40 }} />
        ) : pets.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Nenhum pet cadastrado</Text>
          </View>
        ) : (
          <PetSelector
            pets={pets}
            selectedPetId={selectedPetId}
            onSelectPet={handleSelectPet}
          />
        )}

        <View style={styles.gridContainer}>
          {servicosData.map((servico, index) => (
            <ServicoCard
              key={index}
              nome={servico.nome}
              cor={servico.cor}
              imagem={servico.imagem}
              onPress={() => handleSelectServico(servico.nome)}
            />
          ))}
        </View>

        <View style={{ height: 90 }} />
      </ScrollView>

      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAF9",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 10 : 60,
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 15,
    paddingBottom: 20,
  },
  emptyContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  emptyText: {
    color: "#888",
    fontSize: 16,
  },
});
