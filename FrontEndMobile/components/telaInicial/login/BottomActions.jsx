import React from "react";
import { View, Text, Pressable, Image, StyleSheet, ActivityIndicator } from "react-native"; // 👈 Adicionado ActivityIndicator
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function BottomActions({ onRegister, isLoading }) {
    return (
        <View style={styles.bottomButtonsContainer}>
            <View style={styles.horizontalBottomRow}>

                <View style={styles.socialIconsGroup}>
                    <Pressable style={styles.socialButton}>
                        <Ionicons name="logo-apple" size={33.6} color={"#2F8B88"} />
                    </Pressable>

                    <Pressable style={styles.socialButton}>
                        <Image
                            source={require("../../../assets/images/telaInicial/IconGoogle.png")}
                            style={styles.logoGoogle}
                        />
                    </Pressable>
                </View>

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
                onPress={() => { router.push("/screens/telaInicialScreens/CadastroScreen") }} // 👈 Link para Cadastro
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
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        alignSelf: 'center',
    },
    socialIconsGroup: {
        flexDirection: 'row',
        gap: 16,
    },
    socialButton: {
        backgroundColor: "#E8F6F6",
        padding: 10,
        width: 56,
        height: 56,
        borderRadius: 50,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoGoogle: {
        width: 33.6,
        height: 33.6,
    },
    button: {
        backgroundColor: "#2F8B88",
        height: 56,
        borderRadius: 16,
        justifyContent: "center",
        padding: 10,
        alignItems: "center",
        width: 183,
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