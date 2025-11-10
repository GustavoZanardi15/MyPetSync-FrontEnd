import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function EditarEnderecoHeader({ }) {
    return (
        <View style={styles.header}>
            <Pressable onPress={() => router.back()} style={styles.backBtn}>
                <Ionicons name="arrow-back" size={24} color={"#2F8B88"} />
            </Pressable>
            <Text style={styles.headerTitle}>Editar Endereço</Text>
            <View style={{ width: 24, height: 24 }} />
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 24,
        paddingBottom: 16,
        paddingTop: 40,
        backgroundColor: "#F7F7F7",
    },
    backButton: {
        padding: 5
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#2F8B88"
    },
});
