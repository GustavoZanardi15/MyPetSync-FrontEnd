import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet, Image, Dimensions } from "react-native";
import { useRouter } from "expo-router"; 
import LoginHeader from "../../../components/telaInicial/login/LoginHeader";
import LoginForm from "../../../components/telaInicial/login/LoginForm";
import BottomActions from "../../../components/telaInicial/login/BottomActions";

const screenHeight = Dimensions.get('window').height;

export default function LoginScreen() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [aba, setAba] = useState("entrar");
    const router = useRouter(); 

    return (
        <View style={styles.fullScreen}>
            <Image 
                source={require("../../../assets/images/ilustracao_fundo.png")}
                style={[styles.illustration, {height: screenHeight * 0.7}]} 
                resizeMode="cover"
            />

            <View style={styles.tabs}>
                <Pressable onPress={() => setAba("entrar")}>
                    <Text style={[styles.tabText, aba === "entrar" && styles.activeTab]}>Entrar</Text>
                </Pressable>
                <Pressable onPress={() => {
                    setAba("novaConta");
                    router.push("/screens/telaInicialScreens/CadastroScreen"); 
                }}>
                    <Text style={[styles.tabText, aba === "novaConta" && styles.activeTab]}>Nova Conta</Text>
                </Pressable>
            </View>

            <View style={styles.contentContainer}>
                <LoginHeader />
                <LoginForm 
                    email={email} 
                    setEmail={setEmail} 
                    senha={senha} 
                    setSenha={setSenha}
                    router={router} 
                />
                <BottomActions />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    fullScreen: {
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
    tabs: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "flex-end",
        width: 202,
        paddingHorizontal: 24,
        paddingTop: 64,
        paddingBottom: 8,
        backgroundColor: "#F7F7F7",
        gap: 16,
        zIndex: 10,
    },
    tabText: {
        fontSize: 20,
        marginRight: 20,
        color: "#2F8B88",
        paddingBottom: 4,
        lineHeight: 27,
    },
    activeTab: {
        color: "#00695c",
        borderBottomWidth: 2,
        borderBottomColor: "#89CFF0",
        lineHeight: 27
    },
    contentContainer: {
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: 257,
        paddingBottom: 20
    }
});