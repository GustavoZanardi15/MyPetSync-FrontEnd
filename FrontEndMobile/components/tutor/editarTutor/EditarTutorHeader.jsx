import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function EditarTutorHeader({ }) {
    return (
        <View style={styles.header}>
            <Pressable onPress={() => router.back()} style={styles.backButton}>
                <Ionicons name="arrow-back" size={24} color="#2F8B88" />
            </Pressable>
            <Text style={styles.title}>Editar Perfil</Text>
            <View style={styles.placeholder} />
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 30
    },
    backButton: {
        padding: 5
    },
    placeholder: {
        width: 34
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#2F8B88",
        textAlign: "center",
        flex: 1
    }
});
