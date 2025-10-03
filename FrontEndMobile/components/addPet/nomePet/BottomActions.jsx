import React from "react";
import { router } from "expo-router";
import { Pressable, Text, StyleSheet } from "react-native";

export default function BottomActions({ }) {
    return (
        <Pressable style={styles.button} onPress={() => router.push("/screens/addPetScreens/EspeciePetScreen")}>
            <Text style={styles.buttonText}>Próximo</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#2F8B88",
        height: 56,
        width: 276,
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        marginBottom: 20
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold"
    }
});
