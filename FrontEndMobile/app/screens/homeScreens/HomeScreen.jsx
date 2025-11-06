import React, { useState, useEffect, useCallback } from "react"; 
import { View, ScrollView, StyleSheet } from "react-native";
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
    const token = await AsyncStorage.getItem("userToken");
    return token;
  } catch (error) {
    return null;
  }
}

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
  if (petColorMap.has(petId)) {
    return petColorMap.get(petId);
  }

  const hash = petId.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const colorIndex = hash % PET_COLORS.length;
  const color = PET_COLORS[colorIndex];

  petColorMap.set(petId, color);
  return color;
};

const DEFAULT_AVATAR_DOG = require("../../../assets/images/addPet/Dog.png");
const DEFAULT_AVATAR_CAT = require("../../../assets/images/addPet/Cat.png");

const formatPetDataForHome = (petFromApi) => {
  const getPetImageSource = (photoPath, specie) => {
    if (photoPath) {
      return { uri: `${API_BASE_URL}${photoPath}` };
    }

    const isDog = petFromApi.especie?.toLowerCase() === "cachorro" || petFromApi.especie?.toLowerCase() === "cão";
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

  const reminders = [
    [
      {
        title: "Colírio Ocular",
        subtitle: "Aplicar 3 gotas, manhã e noite",
        time: "08:45 - 20:45",
        repeat: "Diariamente",
      },
      {
        title: "Passeio",
        subtitle: "Lembrar de levar água",
        time: "18:00 - 19:00",
        repeat: "Quarta-feira",
      },
    ],
    [
      {
        title: "Petshop",
        subtitle: "Banho e tosa",
        time: "09:00",
        repeat: "Sexta-feira",
      },
    ],
    [
      {
        title: "Vacina",
        subtitle: "Levar ao veterinário",
        time: "10:00",
        repeat: "Anual",
      },
    ],
  ];

  const vets = [
    {
      name: "Carolina Vivaz",
      image: require("../../../assets/images/home/Vet1.png"),
      rating: 4,
    },
    {
      name: "José Augusto",
      image: require("../../../assets/images/home/Vet2.png"),
      rating: 4,
    },
    {
      name: "Alisson Dias",
      image: require("../../../assets/images/home/Vet3.png"),
      rating: 3,
    },
  ];

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

      const fetchedPets = response.data.map(formatPetDataForHome);
      setPets(fetchedPets);

      if (fetchedPets.length > 0) {
        setSelectedPetIndex(0);
      } else {
        setSelectedPetIndex(-1);
      }

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
    if (!authToken) {
      console.warn("Sem token, usando nome padrão.");
      setUserName("Usuário");
      return;
    }

    async function fetchUserName() {
      try {
        const response = await api.get("/users/me", {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        const data = response.data;

        if (data?.nome) {
          setUserName(data.nome);
        } else {
          console.warn("Campo 'nome' não retornado:", data);
          setUserName("Usuário");
        }
      } catch (error) {
        console.error("Erro ao buscar nome do usuário:", error.response?.data || error.message);
        setUserName("Usuário");
      }
    }

    fetchUserName();
  }, [authToken]);


  const currentReminders = pets.length > 0 && selectedPetIndex !== -1
    ? reminders[selectedPetIndex] || []
    : [];


  return (
    <View style={styles.container}>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent} >
        <HomeHeader userName={userName} />
        <SpaCard />
        <PetSelector pets={pets} selectedPet={selectedPetIndex} setSelectedPet={setSelectedPetIndex} />
        <LembretesSection reminders={currentReminders} />
        <VeterinariosSection vets={vets} />
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
    paddingBottom: 80,
  },
});
