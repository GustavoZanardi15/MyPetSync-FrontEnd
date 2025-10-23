import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Linking from "expo-linking";

export default function VetInfoSection({ vet }) {
  return (
    <View style={styles.infoSection}>
      <View>
        <Text style={styles.vetName}>{vet.nome}</Text>
        <Text style={styles.vetSpecialty}>{vet.especialidade}</Text>
        <Text style={styles.avaliacoesCount}>({vet.avaliacoes})</Text>
      </View>
      <Pressable
        style={styles.whatsappButton}
        onPress={() =>
          Linking.openURL(
            `whatsapp://send?phone=5544999999999&text=Olá, gostaria de agendar uma consulta com ${vet.nome}.`
          )
        }
      >
        <Ionicons name="logo-whatsapp" size={30} color="#fff" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  infoSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  vetName: { fontSize: 22, fontWeight: "bold", color: "#2F8B88" },
  vetSpecialty: { fontSize: 16, color: "#4A4A4A", fontWeight: "500" },
  avaliacoesCount: { fontSize: 14, color: "#999" },
  whatsappButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#25D366",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
});
