import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export default function WelcomeHeader() {
    return (
        <View style={styles.container}>
            <Text style={styles.welcome}>
                Seja bem-vindo{"\n"}
                <Text style={styles.highlight}>pet lover...</Text>
            </Text>
            <View style={styles.iconContainer}>
                <Image source={require("../../assets/images/Logo.png")} style={styles.logo} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start", 
    width: "100%",
    maxWidth: 327,               
    alignSelf: "center",        
    marginBottom: 32,
    gap: 18,
},
    iconContainer: {
        backgroundColor: "#2F8B88",
        borderRadius: 17,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 8,
        width: 76,
        height: 76
    },
    logo: {
        width: 76,
        height: 76,
        resizeMode: "contain",
    },
    welcome: {
        fontSize: 28,
        color: "#2F8B88",
        fontWeight: "regular",
        lineHeight: 34,
    },
    highlight: {
        color: "#2F8B88",
        fontWeight: "bold",
        fontSize: 32,
        lineHeight: 38,
    },
});