import { router } from "expo-router";
import React from "react";
import { Text, Image, Pressable, StyleSheet } from "react-native";

export default function ServicoCard({ nome, cor, imagem }) {

    return (
        <Pressable
            style={[styles.servicoCard, { backgroundColor: cor }]}
            onPress={() => router.push("/screens/servicoScreens/ServicoVetScreen")}
        >            
        <Text style={styles.servicoNome}>{nome}</Text>
            <Image source={imagem} style={styles.servicoImage} resizeMode="contain" />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    servicoCard: {
        width: "48%",
        aspectRatio: 1,
        borderRadius: 15,
        padding: 15,
        justifyContent: "space-between",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 3,
        elevation: 2,
    },
    servicoNome: {
        fontSize: 15,
        fontWeight: "regular",
        alignSelf: "center",
        color: "#8E8E8E",
        textShadowColor: "rgba(0, 0, 0, 0.1)",
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
    },
    servicoImage: {
        alignSelf: "center",
        width: 100,
        height: 100,
        marginTop: 0,
    },
});
