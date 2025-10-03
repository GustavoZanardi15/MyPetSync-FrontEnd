import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import BottomActions from "../../../components/addPet/nomePet/BottomActions";
import NomePetHeader from "../../../components/addPet/nomePet/NomePetHeader";
import NomePetForm from "../../../components/addPet/nomePet/NomePetForm";

export default function NomePetScreen() {
    const [petNome, setPetNome] = useState("");

    return (
        <View style={styles.container}>
            <View>
                <NomePetHeader />
                <Text style={styles.title}>Informe o nome do seu pet?</Text>
                <NomePetForm value={petNome} onChangeText={setPetNome} />
            </View>
            
            <BottomActions />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F7F7F7",
        paddingHorizontal: 20,
        paddingTop: 60,
        justifyContent: "space-between"
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#2F8B88",
        marginBottom: 20,
        textAlign: "center"
    }
});
