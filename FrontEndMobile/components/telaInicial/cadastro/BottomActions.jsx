import React from "react";
import { View, Text, Pressable, Image, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router"; 

export default function BottomActions({ onPress }) {
    const router = useRouter(); 

    return (
        <View style={styles.bottomButtonsContainer}>
            <View style={styles.horizontalBottomRow}>
                <View style={styles.socialIconsGroup}>
                    <Pressable style={styles.socialButton}>
                        <Ionicons name="logo-apple" size={33.6} color={"#2F8B88"} />
                    </Pressable>
                    <Pressable style={styles.socialButton}>
                        <Image 
                            source={require("../../../assets/images/IconGoogle.png")} 
                            style={styles.logoGoogle} 
                        />
                    </Pressable>
                </View>
                <Pressable style={styles.button} onPress={onPress}>
                    <Text style={styles.buttonText}>Criar Conta</Text>
                </Pressable>
            </View>

            <Pressable style={styles.loginWrapper} onPress={() => router.push("/screens/telaInicialScreens/LoginScreen")}>
                <Text style={styles.loginText}>
                    Já possui uma conta? Faça login
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
        alignSelf: "center"
    },
    horizontalBottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: "100%",
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
        justifyContent: "center",
        alignItems: "center",
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
    buttonText: {
        color: "#fff",
        fontSize: 15,
        fontWeight: "700"
    },
    loginWrapper: {
        marginTop: 16,
        alignItems: "flex-end",
    },
    loginText: {
        fontSize: 15,
        fontWeight: "regular",
        color: "#89CFF0",
    }
});
