import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet, Pressable, Platform, StatusBar } from "react-native";
import { useRouter } from "expo-router";
import PetSelector from "../../../components/pet/saudePet/PetSelector";
import Medicamento from "../../../components/pet/saudePet/Medicamento";
import VacinaList from "../../../components/pet/saudePet/VacinaList";
import BottomNav from "../../../components/pet/saudePet/BottomNav";
import SaudeHeader from "../../../components/pet/saudePet/SaudeHeader";

const petsData = [
    {
        id: "dog1",
        name: "Theo",
        image: require("../../../assets/images/home/DogHomePet1.png"),
        medicamentos: [
            { nome: "Colírio Ocular", descricao: "Aplicar 3 gotas, manhã e noite" },
            { nome: "Drontal Plus", descricao: "1 comprimido a cada 3 meses" },
        ],
        vacinas: [
            { dose: "1ª dose - V8 – aplicada em 18/03/2021", proxima: "próxima: 5ª dose: 2024–2025" },
            { dose: "Giárdia – aplicada em 10/02/2025", proxima: "dose única" },
        ],
    },
    {
        id: "dog2",
        name: "Rex",
        image: require("../../../assets/images/home/DogHomePet2.png"),
        medicamentos: [{ nome: "Anti-inflamatório", descricao: "10mg por dia, durante 5 dias" }],
        vacinas: [{ dose: "Raiva – aplicada em 01/01/2024", proxima: "Anual: 01/01/2025" }],
    },
    {
        id: "cat1",
        name: "Mimi",
        image: require("../../../assets/images/home/CatHomePet.png"),
        medicamentos: [],
        vacinas: [{ dose: "Gripe Felina – aplicada em 01/03/2024", proxima: "Anual: 01/03/2025" }],
    },
];

export default function SaudePetScreen() {
    const router = useRouter();
    const [selectedPet, setSelectedPet] = useState(petsData[0]);

    const handleSelectPet = (petId) => {
        const pet = petsData.find((p) => p.id === petId);
        if (pet) setSelectedPet(pet);
    };

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                <SaudeHeader />

                <PetSelector pets={petsData} selectedPet={selectedPet} onSelectPet={handleSelectPet} />

                <Medicamento selectedPet={selectedPet} />

                <VacinaList vacinas={selectedPet.vacinas} petName={selectedPet.name} />

                <Pressable style={styles.saveButton}>
                    <Text style={styles.saveText}>Salvar</Text>
                </Pressable>

                <View style={{ height: 60 }} />
            </ScrollView>

            <BottomNav />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F9FAF9",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 10 : 60
    },
    scrollContent: {
        paddingHorizontal: 20
    },
    section: {
        marginBottom: 20
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#2F8B88",
        marginBottom: 10
    },
    emptyText: {
        fontSize: 13,
        color: "#8E8E8E",
        marginTop: 5
    },
    saveButton: {
        backgroundColor: "#2F8B88",
        borderRadius: 20,
        paddingVertical: 10,
        alignItems: "center",
        alignSelf: "center",
        width: 180,
        marginTop: 20,
        shadowColor: "#2F8B88",
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3,
    },
    saveText: {
        color: "#FFFFFF",
        fontWeight: "bold",
        fontSize: 15
    },
}); 