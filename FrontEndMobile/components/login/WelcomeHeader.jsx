import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const MAX_WIDTH = 327; // Constante para alinhamento

export default function WelcomeHeader() {
    return (
        <View style={styles.welcomeRow}>
            <View>
                <Text style={styles.welcome}>
                    Seja bem-vindo <Text style={styles.highlight}>pet lover...</Text>
                </Text>
            </View>
            <Image source={require("../../assets/images/Logo.png")} style={styles.logo} />
        </View>
    );
}

const styles = StyleSheet.create({
    welcomeRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 40,
        gap: 12,
        width: '100%',
        maxWidth: MAX_WIDTH, 
        justifyContent: 'space-between',
    },
    logo: {
        width: 48,
        height: 48,
    },
    welcome: {
        fontSize: 20,
        color: "#2F8B88",
        maxWidth: 180,
        lineHeight: 25,
    },
    highlight: {
        color: "#00695c",
        fontWeight: "bold",
    },
});