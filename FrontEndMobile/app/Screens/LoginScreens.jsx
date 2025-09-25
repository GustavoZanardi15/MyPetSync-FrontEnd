import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [aba, setAba] = useState("entrar");

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.tabs}>
        <TouchableOpacity onPress={() => setAba("entrar")}>
          <Text style={[styles.tabText, aba === "entrar" && styles.activeTab]}>
            Entrar
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setAba("novaConta")}>
          <Text style={[styles.tabText, aba === "novaConta" && styles.activeTab]}>
            Nova Conta
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <View style={styles.welcomeRow}>
          <View>
            <Text style={styles.welcome}>
              Seja bem-vindo <Text style={styles.highlight}>pet lover...</Text>
            </Text>
          </View>
          <Image source={require("../../assets/images/Logo.png")} style={styles.logo} />
        </View>

        <TextInput
          style={styles.input}
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />

        <TouchableOpacity>
          <Text style={styles.forgot}>Esqueceu a senha?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <View style={styles.socialContainer}>
          <TouchableOpacity style={styles.socialButton}>
            <Ionicons name="logo-apple" size={28} color="#2F8B88" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Image source={require("../../assets/images/IconGoogle.png")} size={28}/>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 8,
    backgroundColor: "#fff",
    gap: 16,
  },
  tabText: {
    fontSize: 20,
    marginRight: 20,
    color: "#2F8B88",
    paddingBottom: 4,
    lineHeight: 27,
    fontFamily: "Inter_400Regular"
  },
  activeTab: {
    color: "#00695c",
    borderBottomWidth: 2,
    borderBottomColor: "#89CFF0",
    fontFamily: "Inter_600SemiBold",
    lineHeight: 27
  },
  welcomeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
    gap: 12,
  },
  logo: {
    width: 48,
    height: 48,
    marginLeft: 8,
  },
  welcome: {
    fontSize: 20,
    color: "#333",
    maxWidth: 180,
  },
  highlight: {
    color: "#00695c",
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    width: 250,
  },
  forgot: {
    color: "#999",
    textAlign: "right",
    marginBottom: 25,
    width: 250,
  },
  button: {
    backgroundColor: "#00695c",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 20,
    width: 250,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
  },
  socialButton: {
    backgroundColor: "#f2f2f2",
    padding: 12,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});