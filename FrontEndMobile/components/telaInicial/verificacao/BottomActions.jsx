import React from "react";
import { View, Text, Pressable, StyleSheet, ActivityIndicator } from "react-native";

export default function VerificacaoBottomAction({ onPress, isLoading, isDisabled }) {
    return (
        <View style={styles.container}>
            <Pressable
                style={[styles.button, (isDisabled || isLoading) && styles.buttonDisabled]}
                onPress={onPress} 
                disabled={isDisabled || isLoading} 
            >
                {isLoading ? (
                    <ActivityIndicator color="#fff" /> 
                ) : (
                    <Text style={styles.buttonText}>Próximo</Text>
                )}
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
    buttonDisabled: { 
        backgroundColor: "#A0D8D6",
    },
    buttonText: {
        color: "#fff",
        fontSize: 15,
        fontWeight: "bold"
    }
});