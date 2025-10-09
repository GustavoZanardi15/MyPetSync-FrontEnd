import React from "react";
import { View, Text, Pressable, Image, StyleSheet, Dimensions } from "react-native";
import { router } from "expo-router";

const screenHeight = Dimensions.get('window').height;

export default function SenhaAlteradaScreen() {

    return (
        <View style={styles.container}>

            <Image source={require("../../../assets/images/ilustracao_fundo.png")}
                style={[styles.illustration, { height: screenHeight * 0.7 }]}
                resizeMode="cover"
            />

            <View style={styles.contentWrapper}>
                <Image source={require("../../../assets/images/Logo.png")} style={styles.logo} />
                <Text style={styles.text}>
                    Pet adicionado com sucesso!{"\n"}
                    <Text style={styles.secondText}>
                        Agora você pode aproveitar {"\n"}
                        todos os nossos serviços.
                    </Text>
                </Text>
            </View>
            <View style={styles.actionsContainer}>
                <Pressable style={styles.button} onPress={() => router.push("/screens/home/homeScreen")}>
                    <Text style={styles.buttonText}>Ir para a página inicial</Text>
                </Pressable>

                <Pressable onPress={() => router.push("/screens/addPetScreens/NomePetScreen")}>
                    <Text style={styles.skipText}>Adicione outro Pet</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F7F7F7",
    },
    illustration: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        zIndex: -1,
        resizeMode: 'cover',
    },
    contentWrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        paddingTop: 100,
        paddingBottom: 40,
    },
    logo: {
        width: 175,
        height: 175,
        borderRadius: 17,
        resizeMode: "contain",
    },
    text: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#2F8B88",
        textAlign: "center",
        marginTop: 24,
        lineHeight: 32,
    },
    secondText: {
        fontSize: 18,
        fontWeight: "400",
        color: "#2F8B88",
        textAlign: "center",
        lineHeight: 24,
    },
    actionsContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '100%',
        marginBottom: 20
    },
    button: {
        backgroundColor: "#2F8B88",
        height: 56,
        width: "100%",
        maxWidth: 327,
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center"
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    skipText: {
        marginTop: 12,
        color: "#87CEEB",
        fontSize: 15,
        fontWeight: "regular"
    }
});