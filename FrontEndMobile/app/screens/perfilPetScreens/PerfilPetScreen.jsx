import React, { useState, useCallback, useRef } from "react";
import { View, ScrollView, StyleSheet, Platform, StatusBar, Pressable, Text, ActivityIndicator, Alert } from "react-native";
import { useRouter, useLocalSearchParams, useFocusEffect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api, { API_BASE_URL } from "../../../src/service/api";
import PetInfo from "../../../components/pet/perfilPet/PetInfo";
import BottomNav from "../../../components/pet/perfilPet/BottomNav";
import PetAvatarSelector from "../../../components/pet/perfilPet/PetAvatarSelector";
import PetImageInfo from "../../../components/pet/perfilPet/PetImageInfo";
import DeletePetButton from "../../../components/pet/perfilPet/DeletePetButton";

const DEFAULT_AVATAR_DOG = require("../../../assets/images/addPet/Dog.png");
const DEFAULT_AVATAR_CAT = require("../../../assets/images/addPet/Cat.png");
const DEFAULT_MAIN_IMAGE_DOG = require("../../../assets/images/addPet/Dog.png");
const DEFAULT_MAIN_IMAGE_CAT = require("../../../assets/images/addPet/Cat.png");

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

const formatPetData = (petFromApi) => {
    const getPetImageSource = (photoPath, specie, isMainImage = false) => {
        if (photoPath) return { uri: `${API_BASE_URL}${photoPath}` };
        const isDog = specie?.toLowerCase() === "cachorro" || specie?.toLowerCase() === "cão";
        return isMainImage ? (isDog ? DEFAULT_MAIN_IMAGE_DOG : DEFAULT_MAIN_IMAGE_CAT) : (isDog ? DEFAULT_AVATAR_DOG : DEFAULT_AVATAR_CAT);
    };

    let formattedConditions = petFromApi.condicoes_especiais;
    if (typeof formattedConditions === "string") {
        formattedConditions = formattedConditions.split(",").map(c => c.trim()).filter(c => c.length > 0);
    }

    return {
        id: petFromApi._id,
        name: petFromApi.nome,
        age: petFromApi.idade ? `${petFromApi.idade} anos` : "Não informado",
        race: petFromApi.raca || "Não informado",
        weight: petFromApi.peso && !isNaN(petFromApi.peso) ? `${parseFloat(petFromApi.peso).toFixed(2)} kg` : "Não informado",
        neutered: petFromApi.castrado ? "Sim" : "Não",
        specialCondition: formattedConditions?.join(", ") || "Nenhuma",
        especie: petFromApi.especie,
        mainImage: getPetImageSource(petFromApi.foto, petFromApi.especie, true),
        avatar: getPetImageSource(petFromApi.foto, petFromApi.especie, false),
    };
};

const getStablePetColor = (petId) => {
    if (petColorMap.has(petId)) return petColorMap.get(petId);
    const hash = petId.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const color = PET_COLORS[hash % PET_COLORS.length];
    petColorMap.set(petId, color);
    return color;
};

export default function PerfilPetScreen() {
    const router = useRouter();
    const { updatedPet } = useLocalSearchParams();

    const [pets, setPets] = useState([]);
    const [selectedPet, setSelectedPet] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const lastSelectedPetIdRef = useRef(null);

    const fetchPets = useCallback(async () => {
        setIsLoading(true);
        try {
            const token = await AsyncStorage.getItem("userToken");
            if (!token) {
                Alert.alert("Erro de autenticação", "Sessão expirada. Faça login novamente.");
                router.replace("screens/loginScreens/LoginScreen");
                return;
            }

            const response = await api.get("/pets", { headers: { Authorization: `Bearer ${token}` } });
            const fetchedPets = response.data.map(formatPetData);
            setPets(fetchedPets);

            let petIdToSelect = updatedPet ? JSON.parse(updatedPet).id : lastSelectedPetIdRef.current;
            if (!petIdToSelect && fetchedPets.length > 0) petIdToSelect = fetchedPets[0].id;

            const newSelectedPet = fetchedPets.find(p => p.id === petIdToSelect) || fetchedPets[0] || null;
            setSelectedPet(newSelectedPet);
            lastSelectedPetIdRef.current = newSelectedPet?.id || null;
            router.setParams({ updatedPet: undefined });

        } catch (error) {
            console.error("Erro ao buscar pets:", error.response?.data || error.message);
            Alert.alert("Erro ao carregar", "Não foi possível carregar seus pets. Tente novamente.");
            setPets([]);
            setSelectedPet(null);
            lastSelectedPetIdRef.current = null;
        } finally {
            setIsLoading(false);
        }
    }, [router, updatedPet]);

    useFocusEffect(useCallback(() => { fetchPets(); }, [fetchPets]));

    const handlePetSelection = useCallback((pet) => {
        setSelectedPet(pet);
        lastSelectedPetIdRef.current = pet?.id || null;
    }, []);

    const handlePetDeleted = useCallback(() => { fetchPets(); }, [fetchPets]);

    const selectedPetColor = selectedPet ? getStablePetColor(selectedPet.id) : "#FFE9E9";

    if (isLoading) {
        return (
            <View style={[styles.fullScreen, styles.loadingContainer]}>
                <ActivityIndicator size="large" color="#2F8B88" />
                <Text style={styles.loadingText}>Carregando seus pets...</Text>
            </View>
        );
    }

    if (!isLoading && pets.length === 0) {
        return (
            <View style={styles.fullScreen}>
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyTitle}>Nenhum Pet Encontrado</Text>
                    <Text style={styles.emptyText}>Parece que você ainda não cadastrou nenhum pet.</Text>
                    <Text style={styles.emptyText}>Adicione o seu primeiro companheiro(a)!</Text>
                    <Pressable style={styles.addButton} onPress={() => router.push("/screens/addPetScreens/AddPetScreen")}>
                        <Text style={styles.addButtonText}>CADASTRAR PET</Text>
                    </Pressable>
                </View>
                <BottomNav />
            </View>
        );
    }

    return (
        <View style={styles.fullScreen}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <PetAvatarSelector
                    pets={pets}
                    selectedPet={selectedPet}
                    setSelectedPet={handlePetSelection}
                    router={router}
                    petColors={PET_COLORS}
                />
                <View style={styles.contentContainer}>
                    {selectedPet && (
                        <View>
                            <PetImageInfo pet={selectedPet} router={router} petColor={selectedPetColor} />
                            <PetInfo label="Espécie:" value={selectedPet.especie} />
                            <PetInfo label="Raça:" value={selectedPet.race} />
                            <PetInfo label="Castrado:" value={selectedPet.neutered} />
                            <PetInfo label="Condições especiais:" value={selectedPet.specialCondition} />
                            <DeletePetButton pet={selectedPet} onPetDeleted={handlePetDeleted} />
                        </View>
                    )}
                </View>
                <View style={{ height: 90 }} />
            </ScrollView>
            <BottomNav />
        </View>
    );
}

const styles = StyleSheet.create({
    fullScreen: {
        flex: 1,
        backgroundColor: "#f5f5f5",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    contentContainer: {
        paddingHorizontal: 20
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    loadingText: {
        marginTop: 10,
        color: "#2F8B88"
    },
    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 40,
        minHeight: 600
    },
    emptyTitle: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#2F8B88",
        marginBottom: 10
    },
    emptyText: {
        fontSize: 16,
        color: "#8E8E8E",
        textAlign: "center",
        marginBottom: 5
    },
    addButton: {
        marginTop: 30,
        backgroundColor: "#2F8B88",
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 8
    },
    addButtonText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "bold"
    },
});
