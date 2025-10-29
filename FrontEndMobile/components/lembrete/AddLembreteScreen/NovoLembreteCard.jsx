import React from "react";
import { View, Pressable, Text, StyleSheet } from "react-native";
import { router } from "expo-router";

export default function NovoLembreteCard() {
    return (
        <View style={styles.container}>
            <Pressable style={styles.card} onPress={() => router.push("/screens/lembreteScreens/NovoLembreteScreen")}>
                <Text style={styles.text}>Adicione um novo lembrete</Text>
            </Pressable>
            <Pressable style={styles.card} onPress={() => router.push("/screens/lembreteScreens/NovoLembreteScreen")}>
                <Text style={styles.text}>Adicione um novo lembrete</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 16,
        marginBottom: 24
    },
    card: {
        flexDirection: "row",
        width: 350,
        height: 56,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2
    },
    text: {
        fontSize: 15,
        color: "#8E8E8E"
    }
});
