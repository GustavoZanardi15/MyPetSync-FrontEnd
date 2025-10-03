import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function CadastroHeader() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Seja bem-vindo!</Text>
            <Text style={styles.subtitle}>Por favor, preencha os campos para continuar</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        maxWidth: 327,
        marginBottom: 32,
        alignSelf: "center",
    },
    title: {
        fontSize: 32,
        color: "#2F8B88",
        fontWeight: "regular",
    },
    subtitle: {
        fontSize: 15,
        color: "#2F8B88",
        marginTop: 8,
    },
});