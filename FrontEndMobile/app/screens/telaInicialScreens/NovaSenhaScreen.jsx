import React, { useState } from "react"
import { View, StyleSheet, KeyboardAvoidingView, Platform } from "react-native"
import NovaSenhaHeader from "../../../components/telaInicial/novaSenha/NovaSenhaHeader"
import NovaSenhaForm from "../../../components/telaInicial/novaSenha/NovaSenhaForm"
import BottomActions from "../../../components/telaInicial/novaSenha/BottomActions" 


export default function NovaSenhaScreen() {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")


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
        <BottomActions />
        
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