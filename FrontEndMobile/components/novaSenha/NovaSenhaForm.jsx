// components/novaSenha/NovaSenhaForm.jsx

import React, { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function NovaSenhaForm({ password, setPassword, confirmPassword, setConfirmPassword }) {

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <View style={styles.formContainer}>
      <Text style={styles.instruction}>Digite uma nova senha</Text>

      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Nova senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          placeholderTextColor="#A0A0A0"
        />
        <Pressable onPress={() => setShowPassword(!showPassword)} style={styles.iconContainer}>
          <Ionicons 
            name={showPassword ? "eye-off" : "eye"} 
            size={20} 
            color="#A0A0A0" 
          />
        </Pressable>
      </View>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Digite novamente a nova senha"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={!showConfirmPassword}
          placeholderTextColor="#A0A0A0"
        />
        <Pressable onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={styles.iconContainer}>
          <Ionicons 
            name={showConfirmPassword ? "eye-off" : "eye"} 
            size={20} 
            color="#A0A0A0" 
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    width: '100%',
    paddingHorizontal: 0,
    paddingTop: 10,
  },
  instruction: {
    textAlign: "center",
    fontSize: 16,
    color: "#606060",
    marginBottom: 30,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12, 
    borderWidth: 1,
    borderColor: "#E0E0E0",
    marginBottom: 15,
    height: 55,
  },
  input: {
    flex: 1,
    fontSize: 16,
    height: "100%",
    paddingHorizontal: 15, 
  },
  iconContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
});