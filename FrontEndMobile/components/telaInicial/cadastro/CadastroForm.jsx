import React, { useState } from "react";
import { View, TextInput, StyleSheet, Pressable } from "react-native"; 
import { Ionicons } from "@expo/vector-icons";

export default function CadastroForm({ nome, setNome, email, setEmail, celular, setCelular, senha, setSenha }) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <View style={styles.formContainer}>
            <TextInput
                style={styles.input}
                placeholder="Nome"
                value={nome}
                onChangeText={setNome}
                placeholderTextColor="#A0A0A0"
            />
            <TextInput
                style={styles.input}
                placeholder="E-mail"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor="#A0A0A0"
            />
            <TextInput
                style={styles.input}
                placeholder="Celular"
                value={celular}
                onChangeText={setCelular}
                keyboardType="phone-pad"
                placeholderTextColor="#A0A0A0"
            />

            <View style={styles.passwordInputWrapper}>
                <TextInput
                    style={[styles.input, styles.passwordInput]}
                    placeholder="Senha"
                    secureTextEntry={!showPassword}
                    value={senha}
                    onChangeText={setSenha}
                    placeholderTextColor="#A0A0A0"
                />
                <Pressable
                    onPress={() => setShowPassword(!showPassword)}
                    style={styles.iconContainer}
                >
                    <Ionicons
                        name={showPassword ? "eye-off" : "eye"}
                        size={22}
                        color="#2F8B88"
                    />
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({

    formContainer: {
        width: "100%",
        maxWidth: 327,
        marginBottom: 24,
        gap: 20,
    },

  input: {
    backgroundColor: "#FFFFFF",
    color: "#333333",
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 18,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#E5E5E5",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },

  passwordInputWrapper: {
    position: "relative",
    justifyContent: "center",
  },

  passwordInput: {
    paddingRight: 50,
  },

  iconContainer: {
    position: "absolute",
    right: 16,
    top: "50%",
    transform: [{ translateY: -11 }],
  },
});