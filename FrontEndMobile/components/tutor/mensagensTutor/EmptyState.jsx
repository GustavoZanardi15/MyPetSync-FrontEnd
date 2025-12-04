import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function EmptyState() {
    const router = useRouter();

    return (
        <View style={styles.emptyContainer}>
            <Ionicons name="people-outline" size={60} color="#C4EDE6" />
            <Text style={styles.emptyTitle}>Nenhum prestador encontrado</Text>
            <Text style={styles.emptyText}>
                Você ainda não tem prestadores de serviço.{'\n'}
                Contrate um serviço para ver seus prestadores aqui.
            </Text>
            <Pressable 
                style={styles.browseButton}
                onPress={() => router.push("/screens/servicoScreens/ServicosScreen")}
            >
                <Ionicons name="search" size={20} color="white" />
                <Text style={styles.browseButtonText}>Buscar Serviços</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 40,
        backgroundColor: '#F7F7F7',
    },
    emptyTitle: {
        marginTop: 16,
        fontSize: 18,
        fontWeight: "600",
        color: "#555",
        textAlign: "center",
        marginBottom: 8,
    },
    emptyText: {
        fontSize: 14,
        textAlign: "center",
        color: "#777",
        lineHeight: 20,
        marginBottom: 20,
    },
    browseButton: {
        backgroundColor: "#2F8B88",
        flexDirection: "row",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 12,
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 3,
        shadowOffset: { height: 2, width: 0 },
        elevation: 2,
    },
    browseButtonText: {
        color: "white",
        marginLeft: 8,
        fontSize: 14,
        fontWeight: "600",
    },
});