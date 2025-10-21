import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Medicamento({ selectedPet }) {
    return (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>Medicamentos:</Text>

            {selectedPet.medicamentos?.length > 0 ? (
                selectedPet.medicamentos.map((m, index) => (
                    <View key={index} style={styles.container}>
                        <Text style={styles.nome}>{m.nome}</Text>
                        <Text style={styles.descricao}>{m.descricao}</Text>
                    </View>
                ))
            ) : (
                <Text style={styles.emptyText}>
                    Nenhum medicamento cadastrado para {selectedPet.name}.
                </Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    section: {
        marginBottom: 20,
        marginLeft: 10
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: "semibold",
        color: "#2F8B88",
        marginBottom: 10,
    },
    container: {
        borderLeftWidth: 3,
        borderColor: "#A8E6CF",
        paddingLeft: 10,
        marginBottom: 10,
        marginLeft: 10,
    },
    nome: {
        fontSize: 15,
        fontWeight: "medium",
        color: "#2F8B88",
    },
    descricao: {
        fontSize: 13,
        color: "#8E8E8E",
    },
    emptyText: {
        fontSize: 13,
        color: "#8E8E8E",
        marginLeft: 10,
    },
});
