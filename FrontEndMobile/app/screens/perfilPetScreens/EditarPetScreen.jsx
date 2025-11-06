import React, { useState } from "react";
import { View, ScrollView, StyleSheet, Text, Pressable, Platform, StatusBar } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import EditInfo from "../../../components/pet/editarPet/EditInfo";
import EditPetHeader from "../../../components/pet/editarPet/EditPetHeader";
import EditPetImage from "../../../components/pet/editarPet/EditPetImage";
import BottomNav from "../../../components/pet/editarPet/BottomNav";

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

export default function EditarPetScreen() {
    const { pet } = useLocalSearchParams();
    const selectedPet = pet ? JSON.parse(pet) : {};
    const petId = selectedPet.id;
    const petColor = petId ? getStablePetColor(petId) : "#FFE9E9"; 

    const [petData, setPetData] = useState({
        profileImage: selectedPet.mainImage || require("../../../assets/images/home/DogHomePet1.png"),
        name: selectedPet.name || "",
        race: selectedPet.race || "",
        age: selectedPet.age || "",
        weight: selectedPet.weight || "",
        neutered: selectedPet.neutered || "",
        specialCondition: selectedPet.specialCondition || "",
    });

    const handleFieldChange = (field, value) => {
        setPetData({ ...petData, [field]: value });
    };

    return (
        <View style={styles.fullScreen}>
            <EditPetHeader />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[styles.scrollContent, { paddingBottom: 40 }]}
            >
                <EditPetImage imageSource={petData.profileImage} petColor={petColor} />

                <View style={styles.fieldsWrapper}>
                    <EditInfo label="Nome:" initialValue={petData.name} onValueChange={(v) => handleFieldChange("name", v)} />
                    <EditInfo label="Raça:" initialValue={petData.race} onValueChange={(v) => handleFieldChange("race", v)} />
                    <EditInfo label="Idade (anos):" initialValue={petData.age} onValueChange={(v) => handleFieldChange("age", v)} />
                    <EditInfo label="Peso (kg):" initialValue={petData.weight} onValueChange={(v) => handleFieldChange("weight", v)} />
                    <EditInfo label="Castrado?" initialValue={petData.neutered} onValueChange={(v) => handleFieldChange("neutered", v)} />
                    <EditInfo label="Condição especial:" initialValue={petData.specialCondition} onValueChange={(v) => handleFieldChange("specialCondition", v)} />
                </View>

                <Pressable
                    style={styles.saveButton}
                    onPress={() => { router.push("/screens/perfilPetScreens/PerfilPetScreen") }}
                >
                    <Text style={styles.saveButtonText}>Salvar</Text>
                </Pressable>
            </ScrollView>

            <BottomNav />
        </View>
    );
}

const styles = StyleSheet.create({
    fullScreen: {
        flex: 1,
        backgroundColor: "#F9F9F9",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    scrollContent: {
        paddingHorizontal: 20,
    },
    fieldsWrapper: {
        marginTop: 10,
        gap: 12,
    },
    saveButton: {
        backgroundColor: "#2F8B88",
        borderRadius: 30,
        paddingVertical: 12,
        alignItems: "center",
        marginTop: 28,
        width: 200,
        alignSelf: "center",
        shadowColor: "#2F8B88",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
    },
    saveButtonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "bold",
    },
});