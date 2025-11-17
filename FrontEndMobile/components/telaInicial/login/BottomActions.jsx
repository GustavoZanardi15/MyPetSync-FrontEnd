import React from "react";
import { View, Text, Pressable, StyleSheet, ActivityIndicator } from "react-native";
import { router } from "expo-router";

export default function BottomActions({ onRegister, isLoading }) {
    return (
        <View style={styles.bottomButtonsContainer}>
            <View style={styles.horizontalBottomRow}>

                <Pressable
                    style={[styles.button, isLoading && styles.buttonDisabled]}
                    onPress={onRegister}
                    disabled={isLoading}

                >
                    {isLoading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.buttonText}>Entrar</Text>
                    )}
                </Pressable>
            </View>

            <Pressable
                onPress={() => { router.push("/screens/telaInicialScreens/CadastroScreen") }}
                style={styles.loginLinkContainer}
            >
                <Text style={styles.loginText}>
                    Não tem uma conta? Criar Conta
                </Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    bottomButtonsContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        width: 327,
        paddingBottom: 20,
        alignItems: 'center',
    },
    horizontalBottomRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        alignSelf: 'center',
    },
    button: {
        backgroundColor: "#2F8B88",
        height: 56,
        borderRadius: 16,
        justifyContent: "center",
        padding: 10,
        alignItems: "center",
        alignSelf: "center",
        width: 250,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.07,
        shadowRadius: 8,
        elevation: 2,
    },
    buttonDisabled: {
        opacity: 0.6,
    },
    buttonText: {
        color: "#fff",
        fontSize: 15,
        fontWeight: "700"
    },
    loginLinkContainer: {
        marginTop: 20,
    },
    loginText: {
        fontSize: 15,
        color: '#89CFF0',
    }
});