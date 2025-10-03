import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function VerificacaoHeader() {
    const router = useRouter();

    return (
        <View style={styles.header}>
            <Pressable onPress={() => router.back()} style={styles.backButton}>
                <Ionicons name="arrow-back" size={28} color="#2F8B88" />
            </Pressable>
            <Text style={styles.headerTitle}>Verificação</Text>
            <View style={styles.backButton} /> 
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between', 
        paddingHorizontal: 20,
        paddingTop: 50, 
        paddingBottom: 20,
        backgroundColor: '#F7F7F7', 
        width: '100%',
    },
    backButton: {
        width: 40,
        alignItems: 'flex-start',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#2F8B88', 
    },
});