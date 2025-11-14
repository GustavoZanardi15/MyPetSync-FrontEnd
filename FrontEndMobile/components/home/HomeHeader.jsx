import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function HomeHeader({ userName }) { 
    const router = useRouter();

    const displayNome = userName ? userName.split(' ')[0] : "Usuário";

    return (
        <View style={styles.header}>
            <Text style={styles.ola}>
                Olá, <Text style={styles.nome}>{displayNome}</Text>
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        marginTop: 40,
        marginHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    ola: {
        fontSize: 22,
        fontWeight: "400",
        color: "#2F8B88"
    },
    nome: {
        color: "#2F8B88",
        fontWeight: "bold"
    }
});