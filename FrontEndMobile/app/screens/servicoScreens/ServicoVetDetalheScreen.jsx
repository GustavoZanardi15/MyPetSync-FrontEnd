import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  Platform,
  StatusBar,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const COLORS = {
  primary: "#2F8B88",
  secondary: "#D1E6E5",
  background: "#F9F9F9",
  text: "#333333",
  white: "#FFFFFF",
};

export default function ServicoVetDetalheScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const vet = {
    id: params.vetId || "69187021702e0d3b8b6a99",
    nome: "Ana",
    type: "autonomo",
    service: "Pet Sitter",
    descricao:
      "Profissional com mais de 5 anos de experiência em cuidados com pets.",
  };

  const navigateToConsulta = () => {
    if (!vet || !vet.id) {
      alert("Erro: ID do prestador não disponível.");
      return;
    }

    router.push({
      pathname: "/screens/servicoScreens/ServicoConsultaScreen",
      params: {
        vet: JSON.stringify({
          id: vet.id,
          nome: vet.nome,
          type: vet.type,
          service: vet.service,
        }),
      },
    });
  };
  return (
    <View style={styles.outerContainer}>
      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={26} color={COLORS.primary} />
      </Pressable>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Detalhe do Prestador</Text>
        <View style={styles.vetInfo}>
          <Ionicons
            name="medkit-outline"
            size={24}
            color={COLORS.primary}
            style={{ marginRight: 10 }}
          />
          <View>
            <Text style={styles.vetName}>
              {vet.nome} - {vet.service}
            </Text>
            <Text style={styles.vetEspecialidade}>
              {vet.type === "empresa" ? "Empresa" : "Profissional Autônomo"}
            </Text>
          </View>
        </View>
        <Text style={styles.description}>{vet.descricao}</Text>
        <Pressable style={styles.button} onPress={navigateToConsulta}>
          <Text style={styles.buttonText}>Agendar Consulta</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: { flex: 1, backgroundColor: COLORS.background },
  container: {
    flexGrow: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 20 : 60,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  backButton: {
    position: "absolute",
    top: Platform.OS === "android" ? StatusBar.currentHeight + 10 : 30,
    left: 20,
    zIndex: 10,
    backgroundColor: COLORS.white,
    borderRadius: 50,
    padding: 6,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.primary,
    textAlign: "center",
    marginBottom: 30,
  },
  vetInfo: {
    flexDirection: "row",
    backgroundColor: COLORS.secondary,
    borderRadius: 15,
    padding: 15,
    marginBottom: 25,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  vetName: { fontSize: 18, fontWeight: "600", color: COLORS.primary },
  vetEspecialidade: { fontSize: 14, color: COLORS.text },
  description: {
    fontSize: 16,
    color: COLORS.text,
    marginBottom: 30,
    lineHeight: 24,
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 30,
  },
  buttonText: { color: COLORS.white, fontWeight: "bold", fontSize: 18 },
});
