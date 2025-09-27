import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions } from "react-native";
import { useRouter } from "expo-router"; 
import LoginHeader from "../components/login/LoginHeader";
import LoginForm from "../components/login/LoginForm";
import BottomActions from "../components/login/BottomActions";

const screenHeight = Dimensions.get('window').height;

export default function LoginScreen() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [aba, setAba] = useState("entrar");
    const router = useRouter(); 

    return (
        <View style={styles.fullScreen}>
            <Image 
                source={require("../assets/images/ilustracao_fundo.png")}
                style={[styles.illustration, {height: screenHeight * 0.7}]} 
                resizeMode="cover"
            />

            <View style={styles.tabs}>
                <TouchableOpacity onPress={() => setAba("entrar")}>
                    <Text style={[styles.tabText, aba === "entrar" && styles.activeTab]}>Entrar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    setAba("novaConta");
                    router.push("/CadastroScreen"); 
                }}>
                    <Text style={[styles.tabText, aba === "novaConta" && styles.activeTab]}>Nova Conta</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.contentContainer}>
                <LoginHeader />
                <LoginForm email={email} setEmail={setEmail} senha={senha} setSenha={setSenha}
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