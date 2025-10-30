// Arquivo: VerificacaoScreen.js

import React, { useState } from "react"
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert
} from "react-native"
import { useLocalSearchParams, router } from "expo-router";
import VerificacaoHeader from "../../../components/telaInicial/verificacao/VerificacaoHeader"
import VerificacaoForm from "../../../components/telaInicial/verificacao/VerificacaoForm"
import VerificacaoBottomAction from "../../../components/telaInicial/verificacao/BottomActions"

// IMPORTANTE: Use a instância 'api' que já tem a baseURL e interceptors
// Ajuste o caminho se seu arquivo 'api.js' estiver em outro lugar.
import api from "../../../src/service/api";

const CODE_LENGTH = 6;

export default function VerificacaoScreen() {
  const [codeArray, setCodeArray] = useState(Array(CODE_LENGTH).fill(""));
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const { email } = useLocalSearchParams();
  const userEmail = email || 'email-nao-encontrado@exemplo.com';

  console.log("Email sendo usado:", userEmail);

  const codeString = codeArray.join('');
  const isCodeComplete = codeString.length === CODE_LENGTH;

  const handleVerify = async () => {
    if (!isCodeComplete) {
      setErrorMessage('Por favor, digite o código completo de 6 dígitos.');
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    const verifyData = {
      email: userEmail,
      code: codeString,
    };

    console.log("[DEBUG] Dados enviados para verify-code:", verifyData);

    try {
      await api.post('/auth/verify-code', verifyData);

      router.push({
        pathname: "/screens/telaInicialScreens/NovaSenhaScreen",
        params: { token: codeString },
      });
    } catch (err) {
      const msg =
        err.response?.data?.message || 'Falha na verificação. Tente novamente.';

      setErrorMessage(msg);
      Alert.alert('Erro', msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.fullScreen} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <VerificacaoHeader />
      <View style={styles.contentContainer}>
        <VerificacaoForm
          code={codeArray}
          setCode={setCodeArray}
          userEmail={userEmail} 
          errorMessage={errorMessage}
        />
        <VerificacaoBottomAction
          onPress={handleVerify}
          isLoading={loading}
          isDisabled={!isCodeComplete || loading}
        />
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    backgroundColor: "#F7F7F7",
  },
  flexible: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
})