import React from "react";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function VetHeader() {
    const router = useRouter();

    return (
        <View style={styles.header}>
            <Pressable onPress={() => router.back()} style={styles.backButton}>
                <Ionicons name="arrow-back" size={24} color="#2F8B88" />
            </Pressable>

            <View style={styles.titleContainer}>
                <Text style={styles.titleText}> Veterinários disponíveis</Text>
            </View>

            <Image
                source={require("../../../assets/images/servicos/Veterinário.png")}
                style={{ width: 71.32, height: 50.13 }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    backButton: {
        padding: 6
    },
    titleContainer: {
        flexDirection: "row",
        alignItems: "center"
    },
    titleText: {
        fontSize: 15,
        fontWeight: "bold",
        color: "#2F8B88",
    },
});
