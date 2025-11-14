import React, { useState, useEffect, useCallback } from "react";
import { View, ScrollView, StyleSheet, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HomeHeader from "../../../components/home/HomeHeader";
import SpaCard from "../../../components/home/SpaCard";
import PetSelector from "../../../components/home/PetSelector";
import LembretesSection from "../../../components/home/LembretesSection";
import VeterinariosSection from "../../../components/home/VeterinariosSection";
import BottomNav from "../../../components/home/BottomNav";
import api from "../../../src/service/api";
import { API_BASE_URL } from "../../../src/config/api";
import { useFocusEffect } from "expo-router";

async function getAuthToken() {
  try {
    return await AsyncStorage.getItem("userToken");
  } catch {
    return null;
  }
}

const PET_COLORS = ["#A9E4D4", "#B0C4DE", "#FFC0CB", "#F0E68C", "#ADD8E6", "#FAFAD2", "#DDA0DD"];
const petColorMap = new Map();

const getStablePetColor = (petId) => {
  if (petColorMap.has(petId)) return petColorMap.get(petId);
  const hash = petId.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const color = PET_COLORS[hash % PET_COLORS.length];
  petColorMap.set(petId, color);
  return color;
};

const DEFAULT_AVATAR_DOG = require("../../../assets/images/addPet/Dog.png");
const DEFAULT_AVATAR_CAT = require("../../../assets/images/addPet/Cat.png");

const formatPetDataForHome = (petFromApi) => {
  const getPetImageSource = (photoPath, specie) => {
    if (photoPath) return { uri: `${API_BASE_URL}${photoPath}` };
    const isDog = specie?.toLowerCase() === "cachorro" || specie?.toLowerCase() === "cão";
    return isDog ? DEFAULT_AVATAR_DOG : DEFAULT_AVATAR_CAT;
  };

  return {
    id: petFromApi._id,
    name: petFromApi.nome,
    image: getPetImageSource(petFromApi.foto, petFromApi.especie),
    color: getStablePetColor(petFromApi._id),
  };
};

export default function HomeScreen() {
  const [pets, setPets] = useState([]);
  const [selectedPetIndex, setSelectedPetIndex] = useState(0);
  const [userName, setUserName] = useState("Usuário");
  const [authToken, setAuthToken] = useState(null);
  const [reminders, setReminders] = useState([]);
  const [loadingReminders, setLoadingReminders] = useState(false);
  const [vets, setVets] = useState([]);
  const [loadingVets, setLoadingVets] = useState(false);

  useEffect(() => {
    async function loadToken() {
      const token = await getAuthToken();
      setAuthToken(token);
    }
    loadToken();
  }, []);

  const fetchPets = useCallback(async () => {
    if (!authToken) return;
    try {
      const response = await api.get("/pets", {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      const fetchedPets = Array.isArray(response.data)
        ? response.data.map(formatPetDataForHome)
        : [];
      setPets(fetchedPets);
      setSelectedPetIndex(fetchedPets.length > 0 ? 0 : -1);
    } catch (error) {
      console.error("Erro ao buscar pets:", error.response?.data || error.message);
      setPets([]);
      setSelectedPetIndex(-1);
    }
  }, [authToken]);

  useFocusEffect(
    useCallback(() => {
      fetchPets();
    }, [fetchPets])
  );

  useEffect(() => {
    if (!authToken) return;
    async function fetchUserName() {
      try {
        const response = await api.get("/users/me", {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        setUserName(response.data?.nome || "Usuário");
      } catch {
        setUserName("Usuário");
      }
    }
    fetchUserName();
  }, [authToken]);

  const fetchReminders = useCallback(async () => {
    if (!authToken || pets.length === 0 || selectedPetIndex === -1) return;
    const selectedPet = pets[selectedPetIndex];
    if (!selectedPet?.id) return;

    setLoadingReminders(true);
    try {
      const response = await api.get(`/pets/${selectedPet.id}/appointments`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      const data = Array.isArray(response.data?.items)
        ? response.data.items
        : Array.isArray(response.data)
        ? response.data
        : [];

      const formattedReminders = data.map(item => {
        const date = new Date(item.dateTime);
        const hora = date.toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
        });

        return {
          id: item._id,         
          title: item.reason || "Consulta",
          subtitle: item.provider?.name || "Veterinário",
          time: hora,
          repeat: item.status || "scheduled",
        };
      });

      setReminders(formattedReminders);
    } catch (error) {
      console.error("Erro ao carregar lembretes:", error.response?.data || error.message);
      setReminders([]);
    } finally {
      setLoadingReminders(false);
    }
  }, [authToken, pets, selectedPetIndex]);

  useEffect(() => {
    fetchReminders();
  }, [fetchReminders]);

  const fetchVets = useCallback(async () => {
    if (!authToken) return;
    setLoadingVets(true);
    try {
      const response = await api.get("/providers", {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      const data = Array.isArray(response.data?.items)
        ? response.data.items
        : Array.isArray(response.data)
        ? response.data
        : [];

      const formatted = data.map((vet) => ({
        id: vet._id,
        name: vet.name || "Veterinário",
        specialty:
          Array.isArray(vet.servicesOffered) && vet.servicesOffered.length > 0
            ? vet.servicesOffered.join(", ")
            : vet.service || vet.providerType || "Clínico Geral",
        imageUrl: vet.avatar ? `${API_BASE_URL}${vet.avatar}` : null,
        rating: vet.averageRating || 0,
      }));

      setVets(formatted);
    } catch {
      setVets([]);
    } finally {
      setLoadingVets(false);
    }
  }, [authToken]);

  useFocusEffect(
    useCallback(() => {
      fetchVets();
    }, [fetchVets])
  );

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <HomeHeader userName={userName} />
        <SpaCard />
        <PetSelector
          pets={pets}
          selectedPet={selectedPetIndex}
          setSelectedPet={setSelectedPetIndex}
        />

        {loadingReminders ? (
          <ActivityIndicator size="large" color="#2F8B88" style={{ marginTop: 30 }} />
        ) : (
          <LembretesSection reminders={reminders || []} />
        )}

        {loadingVets ? (
          <ActivityIndicator size="large" color="#2F8B88" style={{ marginTop: 20 }} />
        ) : (
          <VeterinariosSection vets={vets || []} />
        )}
      </ScrollView>
      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#F7F7F7" 
  },
  scrollContent: { 
    paddingBottom: 80 
  },
});
