import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function EditPetHeader() {
    const router = useRouter();

    return (
        <View style={styles.header}>
            <Pressable onPress={() => router.back()} style={styles.backButton}>
                <Ionicons name="arrow-back" size={24} color="#2F8B88" />
            </Pressable>

            <View style={styles.titleContainer}>
                <Text style={styles.headerTitle}>Editar informações</Text>
                <View style={styles.editCircleButton}>
                    <MaterialCommunityIcons name="pencil" size={20} color="#2F8B88" />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        marginTop: 48,
        height: 64,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 18,
        backgroundColor: "#F9F9F9",
    },
    backButton: {
        padding: 6
    },
    titleContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        flex: 1, 
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#2F8B88",
    },
    editCircleButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        right: -15,
        backgroundColor: "#FFF",
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
});