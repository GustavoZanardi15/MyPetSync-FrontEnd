import React, { useState } from "react";
import { TextInput, StyleSheet } from "react-native";

export default function NomePetForm({ }) {
    const [petNome, setPetNome] = useState("");
    return (
        <TextInput
            style={styles.input}
            placeholder="Escreva o nome"
            value={petNome}
            onChangeText={setPetNome}
            placeholderTextColor={"#8E8E8E"}
        />
    );
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: "#fff",
        color: "#2F8B88",
        fontWeight: "bold",
        borderRadius: 12,
        paddingHorizontal: 16,
        height: 56,
        fontSize: 15,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        elevation: 2,
        marginBottom: 56
    }
});
