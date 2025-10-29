import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import api from "../../../src/service/api";
import CadastroHeader from "../../../components/telaInicial/cadastro/CadastroHeader";
import CadastroForm from "../../../components/telaInicial/cadastro/CadastroForm";
import BottomActions from "../../../components/telaInicial/cadastro/BottomActions";


export default function CadastroScreens() {
    const [aba, setAba] = useState("novaConta");
    const router = useRouter();

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [celular, setCelular] = useState("");
    const [senha, setSenha] = useState("");

    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {
        setLoading(true);

        if (!nome || !email || !celular || !senha) {
            Alert.alert("Erro", "Preencha todos os campos.");
            setLoading(false);
            return;
        }

        try {
            const response = await api.post('/auth/signup', {
                nome: nome,           
                email: email,
                telefone: celular,    
                senha: senha,         
                tipo_usuario: 'tutor'
            });

            console.log('Cadastro Sucesso:', response.data);
            Alert.alert(
                "Sucesso!",
                "Sua conta foi criada! Faça login para continuar.",
                [{
                    text: "Fazer Login",
                    onPress: () => router.replace("/screens/telaInicialScreens/LoginScreen")
                }]
            );

            setNome('');
            setEmail('');
            setCelular('');
            setSenha('');

        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Erro ao tentar cadastrar. Verifique a conexão ou tente um e-mail diferente.';
            console.error('Erro de Cadastro:', errorMessage);

            const displayMessage = Array.isArray(errorMessage) ? errorMessage.join('\n') : errorMessage;

            Alert.alert("Erro no Cadastro", displayMessage);

        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.fullScreen}>

            <View style={styles.tabs}>
                <Pressable onPress={() => {
                    setAba("entrar");
                    router.push("/screens/telaInicialScreens/LoginScreen");
                }}>
                    <Text style={[styles.tabText, aba === "entrar" && styles.activeTab]}>Entrar</Text>
                </Pressable>
                <Pressable onPress={() => setAba("novaConta")}>
                    <Text style={[styles.tabText, aba === "novaConta" && styles.activeTab]}>Nova Conta</Text>
                </Pressable>
            </View>

            <View style={styles.contentContainer}>
                <View style={styles.formWrapper}>
                    <CadastroHeader />
                </View>

                <CadastroForm
                    nome={nome} setNome={setNome}
                    email={email} setEmail={setEmail}
                    celular={celular} setCelular={setCelular}
                    senha={senha} setSenha={setSenha}
                />

                <BottomActions
                    onRegister={handleRegister}
                    isLoading={loading}
                    router={router}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    fullScreen: {
        flex: 1,
        backgroundColor: "#F7F7F7",
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
        paddingTop: 0,
        paddingBottom: 20,
    },
    formWrapper: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
    },
});