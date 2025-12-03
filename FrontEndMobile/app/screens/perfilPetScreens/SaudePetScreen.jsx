import React, { useState, useCallback, useEffect } from "react";
import { 
  View, 
  ScrollView, 
  StyleSheet, 
  Platform, 
  StatusBar, 
  ActivityIndicator, 
  Text, 
  Alert,
  RefreshControl 
} from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api, { API_BASE_URL } from "../../../src/service/api";
import SaudeHeader from "../../../components/pet/saudePet/SaudeHeader";
import PetSelector from "../../../components/pet/saudePet/PetSelector";
import VacinaList from "../../../components/pet/saudePet/VacinaList";
import BottomNav from "../../../components/pet/BottomNav";

const DEFAULT_AVATAR_DOG = require("../../../assets/images/addPet/Dog.png");
const DEFAULT_AVATAR_CAT = require("../../../assets/images/addPet/Cat.png");

const PET_COLORS = [
  '#A9E4D4',
  '#B0C4DE',
  '#FFC0CB',
  '#F0E68C',
  '#ADD8E6',
  '#FAFAD2',
  '#DDA0DD',
];

const formatDateSafe = (dateString) => {
  if (!dateString) return null;

  try {
    if (typeof dateString === 'string' && dateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
      const [year, month, day] = dateString.split('-');
      return new Date(parseInt(year), parseInt(month) - 1, parseInt(day)).toLocaleDateString('pt-BR');
    }

    const date = new Date(dateString);
    if (isNaN(date.getTime())) return null;

    return date.toLocaleDateString('pt-BR');
  } catch {
    return null;
  }
};

export default function SaudePetScreen() {
  const router = useRouter();

  const [pets, setPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);
  const [vacinas, setVacinas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoadingVacinas, setIsLoadingVacinas] = useState(false);

  const fetchPets = useCallback(async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");

      if (!token) {
        Alert.alert("Erro de autenticação", "Sessão expirada.");
        router.replace("screens/loginScreens/LoginScreen");
        return [];
      }

      const response = await api.get("/pets", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const formattedPets = response.data.map(pet => {
        const getImageSource = (photoPath, specie) => {
          if (photoPath) return { uri: `${API_BASE_URL}${photoPath}` };
          const isDog = specie?.toLowerCase() === "cachorro" || specie?.toLowerCase() === "cão";
          return isDog ? DEFAULT_AVATAR_DOG : DEFAULT_AVATAR_CAT;
        };

        const hash = pet._id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const color = PET_COLORS[hash % PET_COLORS.length];

        return {
          id: pet._id,
          name: pet.nome || pet.name,
          avatar: getImageSource(pet.foto || pet.photo, pet.especie || pet.species),
          color: color
        };
      });

      return formattedPets;
    } catch {
      Alert.alert("Erro", "Não foi possível carregar seus pets.");
      return [];
    }
  }, [router]);

  const fetchVacinas = useCallback(async (petId) => {
    if (!petId) {
      setVacinas([]);
      return;
    }

    try {
      const token = await AsyncStorage.getItem("userToken");

      const response = await api.get(`/vaccines?pet=${petId}&limit=100`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.data?.items || response.data.items.length === 0) {
        setVacinas([]);
        return;
      }

      const formattedVacinas = response.data.items.map(v => ({
        id: v._id,
        name: v.name,
        manufacturer: v.manufacturer || 'Não informado',
        dose: v.doseMl ? `${v.doseMl} mL` : 'Dose padrão',
        route: v.route || 'SC',
        appliedAt: formatDateSafe(v.appliedAt),
        nextDoseAt: formatDateSafe(v.nextDoseAt),
        isCompleted: v.isCompleted || false,
        batch: v.batch || 'Não informado',
        veterinarian: v.veterinarian || 'Não informado',
        notes: v.notes || ''
      }));

      setVacinas(formattedVacinas);
    } catch {
      Alert.alert("Aviso", "Não foi possível carregar as vacinas deste pet.");
      setVacinas([]);
    }
  }, []);

  const loadInitialData = useCallback(async () => {
    setIsLoading(true);

    try {
      const fetchedPets = await fetchPets();
      setPets(fetchedPets);

      if (fetchedPets.length > 0) {
        const firstPet = fetchedPets[0];
        setSelectedPet(firstPet);

        setIsLoadingVacinas(true);
        await fetchVacinas(firstPet.id);
        setIsLoadingVacinas(false);
      } else {
        setSelectedPet(null);
        setVacinas([]);
      }
    } finally {
      setIsLoading(false);
    }
  }, [fetchPets, fetchVacinas]);

  useEffect(() => {
    const loadVacinasForPet = async () => {
      if (selectedPet?.id) {
        setIsLoadingVacinas(true);
        await fetchVacinas(selectedPet.id);
        setIsLoadingVacinas(false);
      } else {
        setVacinas([]);
      }
    };

    loadVacinasForPet();
  }, [selectedPet?.id, fetchVacinas]);

  useFocusEffect(
    useCallback(() => {
      loadInitialData();
    }, [loadInitialData])
  );

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await loadInitialData();
    setIsRefreshing(false);
  }, [loadInitialData]);

  const handleSelectPet = (petId) => {
    const pet = pets.find(p => p.id === petId);
    if (pet) setSelectedPet(pet);
  };

  if (isLoading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#2F8B88" />
        <Text style={styles.loadingText}>Carregando...</Text>
      </View>
    );
  }

  if (!isLoading && pets.length === 0) {
    return (
      <View style={styles.container}>
        <SaudeHeader />
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>Nenhum pet encontrado</Text>
          <Text style={styles.emptyText}>Adicione um pet para ver vacinas.</Text>
        </View>
        <BottomNav />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            colors={["#2F8B88"]}
            tintColor="#2F8B88"
          />
        }
      >
        <SaudeHeader />

        <PetSelector
          pets={pets}
          selectedPet={selectedPet}
          onSelectPet={handleSelectPet}
          petColor={selectedPet?.color || '#A9E4D4'}
        />

        {isLoadingVacinas ? (
          <View style={styles.vacinaLoadingContainer}>
            <ActivityIndicator size="small" color="#2F8B88" />
            <Text style={styles.vacinaLoadingText}>Carregando vacinas...</Text>
          </View>
        ) : (
          <VacinaList
            vacinas={vacinas}
            petName={selectedPet?.name}
          />
        )}

        <View style={{ height: 100 }} />
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
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    color: "#2F8B88",
    fontSize: 16,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    color: "#2F8B88",
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 16,
    textAlign: "center",
    color: "#777",
  },
  vacinaLoadingContainer: {
    alignItems: "center",
    padding: 20,
  },
  vacinaLoadingText: {
    marginTop: 10,
    color: "#2F8B88",
    fontSize: 14,
  },
});
