import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native"; // Importe Alert para feedback
import { useRouter } from "expo-router"; // Importe useRouter para navegação
import api from "../../../src/service/api"; // Importe o serviço de API
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
                email: email,
            });

            console.log('Recuperação Sucesso:', response.data);
            Alert.alert("Sucesso", "Código de redefinição enviado para o seu e-mail.");

            router.push("/screens/telaInicialScreens/VerificacaoScreen");

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