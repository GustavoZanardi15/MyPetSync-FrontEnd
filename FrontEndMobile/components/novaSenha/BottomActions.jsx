// components/novaSenha/NovaSenhaBottomAction.jsx

import React from "react";
import { View, Text, Pressable, StyleSheet, Platform } from "react-native"; 

export default function SenhaBottomAction({ onPress }) {
  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>Alterar senha</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 0,
    marginTop: 30, 
    marginBottom: Platform.OS === 'ios' ? 20 : 10, 
  },
  button: {
    backgroundColor: "#2F8B88",
    height: 56,
    borderRadius: 16, 
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});