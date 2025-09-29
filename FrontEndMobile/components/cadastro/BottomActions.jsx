import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function BottomActions({onPress}) {
    return (
        <View style={styles.bottomButtonsContainer}>
            <View style={styles.horizontalBottomRow}>
                <View style={styles.socialIconsGroup}>
                    <TouchableOpacity style={styles.socialButton}>
                        <Ionicons name="logo-apple" size={33.6} color={"#2F8B88"} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.socialButton}>
                        <Image 
                            source={require("../../assets/images/IconGoogle.png")} 
                            style={styles.logoGoogle} 
                        />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.button} onPress={onPress}>
                    <Text style={styles.buttonText}>Criar Conta</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    bottomButtonsContainer: {
        flex: 1, 
        justifyContent: 'flex-end',
        width: 327,
        paddingBottom: 20,
    },
    horizontalBottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 327,
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
    }
});