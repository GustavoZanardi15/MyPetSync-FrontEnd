import React, { useState } from "react"
import { View, StyleSheet, KeyboardAvoidingView, Platform, Pressable, Keyboard } from "react-native"
import { useRouter } from "expo-router"
import VerificacaoHeader from "../components/verificacao/VerificacaoHeader"
import VerificacaoForm from "../components/verificacao/VerificacaoForm"
import VerificacaoBottomAction from "../components/verificacao/BottomActions"

export default function VerificacaoScreen() {
  const [code, setCode] = useState(["", "", "", "", ""])
  const router = useRouter()

  const fullCode = code.join("")

  return (
    <KeyboardAvoidingView
      style={styles.fullScreen}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <VerificacaoHeader />

      <Pressable style={styles.flexible} onPress={Keyboard.dismiss}>
        <View style={styles.contentContainer}>
          <VerificacaoForm code={code} setCode={setCode} />
          <VerificacaoBottomAction onPress/>
        </View>
      </Pressable>
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
