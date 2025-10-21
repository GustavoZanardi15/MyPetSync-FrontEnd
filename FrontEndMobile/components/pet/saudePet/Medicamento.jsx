import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Medicamento({ nome, descricao }) {
    return (
        <View style={styles.container}>
            <Text style={styles.nome}>{nome}</Text>
            <Text style={styles.descricao}>{descricao}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderLeftWidth: 3,
        borderColor: "#A8E6CF",
        paddingLeft: 10,
        marginBottom: 10
    },
    nome: {
        fontSize: 15,
        fontWeight: "500",
        color: "#2F8B88"
    },
    descricao: {
        fontSize: 13,
        color: "#8E8E8E"
    },
});
