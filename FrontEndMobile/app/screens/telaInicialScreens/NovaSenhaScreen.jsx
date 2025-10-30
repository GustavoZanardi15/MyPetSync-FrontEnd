import React, { useState } from "react"
import { View, StyleSheet, KeyboardAvoidingView, Platform, Alert } from "react-native"
import { useLocalSearchParams, router } from "expo-router";
import api from "../../../src/service/api";
import NovaSenhaHeader from "../../../components/telaInicial/novaSenha/NovaSenhaHeader"
import NovaSenhaForm from "../../../components/telaInicial/novaSenha/NovaSenhaForm"
import BottomActions from "../../../components/telaInicial/novaSenha/BottomActions"


export default function NovaSenhaScreen() {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false);

  const { token } = useLocalSearchParams();

  const isFormValid =
    password.length >= 6 &&
    password === confirmPassword &&
    !!token;

  const handleResetPassword = async () => {
    if (!isFormValid || loading) {
      return;
    }

    setLoading(true);

    const resetData = {
      token: token,
      newPassword: password,
    };

    console.log("[RESET] Dados enviados:", resetData);

    try {
      await api.post('/auth/reset-password', resetData);

      router.push("/screens/telaInicialScreens/SenhaAlteradaScreen");

      Alert.alert(
        "Sucesso",
        "Sua senha foi redefinida com sucesso!",
        [{
          text: "OK",
        }]
      );

    } catch (err) {
      console.error("[RESET] ERRO na API:", err.response?.data);

      const msg =
        err.response?.data?.message || 'Falha Desconhecida! Verifique a URL do Backend e os logs do servidor.';

      Alert.alert('ERRO NA REDEFINIÇÃO', msg);
    } finally {
      setLoading(false);
    }
  };


  return (
    <KeyboardAvoidingView style={styles.fullScreen} behavior={Platform.OS === "ios" ? "padding" : "height"}>

      <NovaSenhaHeader />

      <View style={styles.contentContainer}>

        <NovaSenhaForm
          password={password}
          setPassword={setPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
        />

        <BottomActions
          onPress={handleResetPassword}
          isLoading={loading}
          isDisabled={!isFormValid || loading}
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
  contentContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
})