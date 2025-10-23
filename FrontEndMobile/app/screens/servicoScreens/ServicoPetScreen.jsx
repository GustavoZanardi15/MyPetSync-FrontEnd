import React, { useState } from "react";
import { View, ScrollView, StyleSheet, Platform, StatusBar } from "react-native";
import ServicoHeader from "../../../components/servico/servicoLista/ServicoHeader";
import PetSelector from "../../../components/servico/servicoLista/PetSelector";
import ServicoCard from "../../../components/servico/servicoLista/ServicoCard";
import BottomNav from "../../../components/servico/servicoLista/BottomNav";
const petsData = [
    {
        id: "dog1",
        name: "Theo",
        image: require("../../../assets/images/home/DogHomePet1.png"),
    },
    {
        id: "dog2",
        name: "Rex",
        image: require("../../../assets/images/home/DogHomePet2.png"),
    },
    {
        id: "cat1",
        name: "Mimi",
        image: require("../../../assets/images/home/CatHomePet.png"),
    },
];

const servicosData = [
    { nome: "Banho & Tosa", cor: "#A8E6CF", imagem: require("../../../assets/images/servicos/BanhoTosa.png") },
    { nome: "Hospedagem", cor: "#89CFF0", imagem: require("../../../assets/images/servicos/Hospedagem.png") },
    { nome: "Passeios", cor: "#FFD97D", imagem: require("../../../assets/images/servicos/Passeios.png") },
    { nome: "Veterinário", cor: "#DFD4FB", imagem: require("../../../assets/images/servicos/Veterinário.png") },
    { nome: "Cuidadora", cor: "#FF9D97", imagem: require("../../../assets/images/servicos/Cuidadora.png") },
    { nome: "Adestrador", cor: "#D9D9D9", imagem: require("../../../assets/images/servicos/Adestrador.png") },
];

export default function ServicoPetScreen() {
    const [selectedPetId, setSelectedPetId] = useState(petsData[0].id);

    const handleSelectPet = (petId) => {
        setSelectedPetId(petId);
    };

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

                <ServicoHeader />

                <PetSelector pets={petsData} selectedPetId={selectedPetId} onSelectPet={handleSelectPet} />

                <View style={styles.gridContainer}>
                    {servicosData.map((servico, index) => (
                        <ServicoCard
                            key={index}
                            nome={servico.nome}
                            cor={servico.cor}
                            imagem={servico.imagem}
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
});
