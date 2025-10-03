import { router } from "expo-router";
import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

export default function VerificacaoBottomAction({ }) {
    return (
        <View style={styles.container}>
            <Pressable style={styles.button} onPress={() => {router.push("/screens/telaInicialScreens/NovaSenhaScreen")}} >
                <Text style={styles.buttonText}>Próximo</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        alignItems: "center",
        paddingHorizontal: 24,
        paddingBottom: 20, 
    },
    button: {
        backgroundColor: "#2F8B88", 
        height: 56,
        width: 279,
        maxWidth: 327,
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.07,
        shadowRadius: 8,
        elevation: 2,
    },
    buttonText: {
        color: "#fff", 
        fontSize: 15,
        fontWeight: "bold"
    }
});