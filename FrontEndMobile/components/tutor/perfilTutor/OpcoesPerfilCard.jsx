import React from "react";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function OpcoesPerfilCard({ onLogout, onEndereco, onServicos, onMensagens }) {
  return (
    <View style={styles.card}>
      <Pressable style={styles.option} onPress={onEndereco}>
        <View style={[styles.iconWrapper, { backgroundColor: "#FFE7A3" }]}>
          <Ionicons name="home-outline" size={24} color="#2F7A67" />
        </View>
        <Text style={styles.optionText}>Endereço</Text>
      </Pressable>

      <Pressable style={styles.option} onPress={onServicos}>
        <View style={[styles.iconWrapper, { backgroundColor: "#E5D4FF" }]}>
          <Image source={require("../../../assets/images/home/NavBarServico.png")} style={styles.iconImage} />
        </View>
        <Text style={styles.optionText}>Histórico de Serviços</Text>
      </Pressable>

      <Pressable style={styles.option} onPress={onMensagens}>
        <View style={[styles.iconWrapper, { backgroundColor: "#C8E8E0" }]}>
          <Ionicons name="chatbubble-ellipses-outline" size={24} color="#2F7A67" />
        </View>
        <Text style={styles.optionText}>Mensagens</Text>
      </Pressable>

      <Pressable onPress={onLogout} style={styles.logoutButton}>
        <Text style={styles.logoutButtonText}>Sair</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginTop: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
  },
  iconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  iconImage: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  optionText: {
    fontSize: 15,
    color: "#2F7A67",
    marginLeft: 16,
    fontWeight: "500",
  },
  logoutButton: {
    marginTop: 16,
    backgroundColor: "#FF3B30",
    paddingVertical: 10,
    paddingHorizontal: 70,
    borderRadius: 12,
    alignSelf: "center",
  },
  logoutButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
  },
});
