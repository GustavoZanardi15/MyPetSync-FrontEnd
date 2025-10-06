import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import GeneroPetHeader from "../../../components/addPet/generoPet/GeneroPetHeader";
import GeneroPetForm from "../../../components/addPet/generoPet/GeneroPetForm";
import BottomActions from "../../../components/addPet/generoPet/BottomActions";

export default function GeneroPetScreen() {
    const [generoSelecionado, setGeneroSelecionado] = useState(null);

    return (
        <View style={styles.container}>
            <View>
                <GeneroPetHeader />

                <Text style={styles.title}>Qual o gênero do seu Pet?</Text>
                <GeneroPetForm
                    generoSelecionado={generoSelecionado}
                    setGeneroSelecionado={setGeneroSelecionado}
                />
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
        textAlign: "center",
        marginBottom: 30
    }
});
