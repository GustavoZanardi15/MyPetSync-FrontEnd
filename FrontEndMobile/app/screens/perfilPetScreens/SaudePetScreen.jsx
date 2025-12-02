import React, { useState, useCallback, useRef } from "react";
import { View, ScrollView, StyleSheet, Platform, StatusBar, ActivityIndicator, Text, Alert } from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api, { API_BASE_URL } from "../../../src/service/api";
import SaudeHeader from "../../../components/pet/saudePet/SaudeHeader";
import PetSelector from "../../../components/pet/saudePet/PetSelector";
import VacinaList from "../../../components/pet/saudePet/VacinaList";
import BottomNav from "../../../components/pet/saudePet/BottomNav";

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

const petColorMap = new Map();

const getStablePetColor = (petId) => {
    if (petColorMap.has(petId)) return petColorMap.get(petId);
    const hash = petId.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const color = PET_COLORS[hash % PET_COLORS.length];
    petColorMap.set(petId, color);
    return color;
};

const formatPetData = (petFromApi) => {
    const getImageSource = (photoPath, specie) => {
        if (photoPath) return { uri: `${API_BASE_URL}${photoPath}` };
        const isDog = specie?.toLowerCase() === "cachorro" || specie?.toLowerCase() === "cão";
        return isDog ? DEFAULT_AVATAR_DOG : DEFAULT_AVATAR_CAT;
    };

    return {
        id: petFromApi._id,
        name: petFromApi.nome,
        avatar: getImageSource(petFromApi.foto, petFromApi.especie),
        vacinas: petFromApi.vacinas || []
    };
};

export default function SaudePetScreen() {
    const router = useRouter();

    const [pets, setPets] = useState([]);
    const [selectedPet, setSelectedPet] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const lastSelectedPetIdRef = useRef(null);

    const fetchPets = useCallback(async () => {
        setIsLoading(true);
        try {
            const token = await AsyncStorage.getItem("userToken");

            if (!token) {
                Alert.alert("Erro de autenticação", "Sessão expirada.");
                router.replace("screens/loginScreens/LoginScreen");
                return;
            }

            const response = await api.get("/pets", {
                headers: { Authorization: `Bearer ${token}` },
            });

            const fetchedPets = response.data.map(formatPetData);
            setPets(fetchedPets);

            let petId = lastSelectedPetIdRef.current || (fetchedPets[0]?.id ?? null);
            const petToSelect = fetchedPets.find(p => p.id === petId) || fetchedPets[0] || null;

            setSelectedPet(petToSelect);
            lastSelectedPetIdRef.current = petToSelect?.id || null;

        } catch (error) {
            console.log("Erro ao carregar pets:", error.response?.data || error.message);
            Alert.alert("Erro", "Não foi possível carregar seus pets.");
            setPets([]);
            setSelectedPet(null);
        } finally {
            setIsLoading(false);
        }
    }, [router]);

    useFocusEffect(useCallback(() => {
        fetchPets();
    }, [fetchPets]));

    const handleSelectPet = (petId) => {
        const pet = pets.find(p => p.id === petId);
        if (pet) {
            setSelectedPet(pet);
            lastSelectedPetIdRef.current = pet.id;
        }
    };

    const selectedPetColor = selectedPet ? getStablePetColor(selectedPet.id) : "#FFE9E9";

    if (isLoading) {
        return (
            <View style={[styles.container, styles.loadingContainer]}>
                <ActivityIndicator size="large" color="#2F8B88" />
                <Text style={styles.loadingText}>Carregando pets...</Text>
            </View>
        );
    }

    if (!isLoading && pets.length === 0) {
        return (
            <View style={styles.container}>
                <Text style={styles.emptyTitle}>Nenhum pet encontrado</Text>
                <Text style={styles.emptyText}>Adicione um pet para ver vacinas.</Text>
                <BottomNav />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

                <SaudeHeader />

                <PetSelector
                    pets={pets}
                    selectedPet={selectedPet}
                    onSelectPet={handleSelectPet}
                    petColor={selectedPetColor}  
                />

                <VacinaList
                    vacinas={selectedPet?.vacinas || []}
                    petName={selectedPet?.name}
                />

                <View style={{ height: 80 }} />
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
    },
    scrollContent: {
        paddingHorizontal: 20,
    },
    emptyTitle: {
        fontSize: 22,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 40,
        color: "#2F8B88",
    },
    emptyText: {
        marginTop: 5,
        fontSize: 16,
        textAlign: "center",
        color: "#777",
    }
});
