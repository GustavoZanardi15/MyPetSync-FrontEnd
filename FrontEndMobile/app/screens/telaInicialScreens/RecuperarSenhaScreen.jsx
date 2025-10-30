import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native"; 
import { useRouter } from "expo-router"; 
import api from "../../../src/service/api"; 
import RecuperarSenhaHeader from "../../../components/telaInicial/recuperarSenha/RecuperarHeader";
import RecuperarSenhaForm from "../../../components/telaInicial/recuperarSenha/RecuperarForm";

export default function RecuperarSenhaScreen() {
    const [email, setEmail] = useState(""); 
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleRecuperarSenha = async () => {
        setLoading(true);

        if (!email) {
            Alert.alert("Erro", "Por favor, preencha o E-mail.");
            setLoading(false);
            return;
        }

        try {
            const response = await api.post('/auth/esqueci-senha', {
                email: email, // Envia o email correto ao backend
            });

            console.log('Recuperação Sucesso:', response.data);
            Alert.alert("Sucesso", "Código de redefinição enviado para o seu e-mail.");

            router.push({
                pathname: "/screens/telaInicialScreens/VerificacaoScreen",
                params: { email: email } 
            });

        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Erro ao enviar código. Verifique o e-mail e a conexão.';
            const displayMessage = Array.isArray(errorMessage) ? errorMessage.join('\n') : errorMessage;
            Alert.alert("Erro", displayMessage);

        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.fullScreen}>
            <RecuperarSenhaHeader />
            <View style={styles.contentContainer}>
                <RecuperarSenhaForm
                    telefone={email}
                    setTelefone={setEmail}
                    onSubmit={handleRecuperarSenha}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    fullScreen: {
        flex: 1,
        backgroundColor: '#F7F7F7',
    },
    contentContainer: { 
        flex: 1,
        alignItems: 'center',
    },
});