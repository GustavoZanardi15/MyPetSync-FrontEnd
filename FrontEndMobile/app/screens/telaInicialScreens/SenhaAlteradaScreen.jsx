import React from "react";
import { View, Text, Pressable, Image, StyleSheet, Dimensions} from "react-native";
import { useRouter } from "expo-router";

const screenHeight = Dimensions.get('window').height;

export default function SenhaAlteradaScreen() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            
            <Image 
                source={require("../../../assets/images/ilustracao_fundo.png")}
                style={[styles.illustration, {height: screenHeight * 0.7}]} 
                resizeMode="cover"
            />
            
            <View style={styles.contentWrapper}>
                <Image source={require("../../../assets/images/Logo.png")} style={styles.logo} />
                <Text style={styles.text}>
                    Sua senha foi alterada com sucesso!
                </Text>

                <Pressable style={styles.button} onPress={() => router.push("/screens/telaInicialScreens/LoginScreen")}>
                    <Text style={styles.buttonText}>Entrar</Text>
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
        fontWeight: 'bold',
        color: '#2F8B88', 
        textAlign: 'center',
        paddingHorizontal: 30, 
        marginTop: 40,
        flex: 1,
    },
    button: {
        backgroundColor: "#2F8B88",
        height: 56,
        width: 279,
        maxWidth: 327,
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center"
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    }
});