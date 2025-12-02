import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function VacinaList({ vacinas, petName }) {
    return (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>Vacinas:</Text>
            {vacinas?.length > 0 ? (
                vacinas.map((v, index) => (
                    <View key={index} style={styles.vacinaCard}>
                        <Text style={styles.vacinaDose}>{v.dose}</Text>
                        <Text style={styles.vacinaSub}>{v.proxima}</Text>
                    </View>
                ))
            ) : (
                <Text style={styles.emptyText}>Nenhuma vacina cadastrada para {petName}.</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    section: {
        marginBottom: 20,
        marginLeft: 10,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: "semibold",
        color: "#2F8B88",
        marginBottom: 10
    },
    emptyText: {
        fontSize: 13,
        color: "#979797",
        fontWeight: "regular",
        marginTop: 5
    },
    vacinaCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    vacinaDose: {
        color: "#2F8B88",
        fontSize: 15
    },
    vacinaSub: {
        color: "#979797",
        fontSize: 13
    },
});