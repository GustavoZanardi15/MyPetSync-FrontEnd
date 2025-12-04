import React from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";

export default function LoadingState() {
    return (
        <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={"#2F8B88"} />
            <Text style={styles.loadingText}>Carregando prestadores...</Text>
            <Text style={styles.loadingSubtext}>Aguarde um momento</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#F7F7F7',
    },
    loadingText: {
        marginTop: 10,
        color: "#2F8B88",
        fontSize: 16,
        fontWeight: '600',
    },
    loadingSubtext: {
        marginTop: 5,
        color: "#888",
        fontSize: 12,
    },
});