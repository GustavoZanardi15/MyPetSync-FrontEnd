import React, { useState } from "react"
import { View, StyleSheet, KeyboardAvoidingView, Platform} from "react-native"
import VerificacaoHeader from "../../../components/telaInicial/verificacao/VerificacaoHeader"
import VerificacaoForm from "../../../components/telaInicial/verificacao/VerificacaoForm"
import VerificacaoBottomAction from "../../../components/telaInicial/verificacao/BottomActions"

export default function VerificacaoScreen() {
  const [code, setCode] = useState(Array(5).fill(""));

  return (
    <KeyboardAvoidingView style={styles.fullScreen} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <VerificacaoHeader />
        <View style={styles.contentContainer}>
          <VerificacaoForm code={code} setCode={setCode} />
          <VerificacaoBottomAction/>
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