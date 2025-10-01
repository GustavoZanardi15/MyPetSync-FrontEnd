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
          <Ionicons name={showPassword ? "eye-off" : "eye"} size={20} color="#2F8B88" />
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
          <Ionicons name={showPassword ? "eye-off" : "eye"} size={20} color="#2F8B88" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    width: "100%",
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  instruction: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "regular",
    color: "#2F8B88",
    marginBottom: 30,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 15,
    height: 56,
    paddingHorizontal: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  input: {
    flex: 1,
    color: "#2F8B88", 
    fontWeight: "bold",
    fontSize: 15,
    height: "100%",
  },
  iconContainer: {
    paddingHorizontal: 8,
  },
});