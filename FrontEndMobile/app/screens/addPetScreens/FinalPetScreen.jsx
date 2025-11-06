import React from "react";
import { View, Text, Pressable, Image, StyleSheet, Dimensions } from "react-native";
import { router, useLocalSearchParams } from "expo-router";

const screenHeight = Dimensions.get("window").height;

export default function FinalPetScreen() {
  const params = useLocalSearchParams();
  const petNome = params.petNome || "Pet";
  
  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/images/telaInicial/ilustracao_fundo.png")}
        style={[styles.illustration, { height: screenHeight * 0.7 }]}
        resizeMode="cover"
      />

      <View style={styles.contentWrapper}>
        <Image source={require("../../../assets/images/telaInicial/Logo.png")} style={styles.logo} />

        <Text style={styles.text}>
          <Text style={styles.successText}>{petNome}</Text> adicionado com sucesso!{"\n"}
            <Pressable onPress={() => router.push("/screens/perfilPetScreens/PerfilPetScreen")}>
              <Text style={styles.linkText}>Agora você pode visualizar todos os pets</Text>
            </Pressable>
          </Text>
      </View>

      <View style={styles.actionsContainer}>
        <Pressable
          style={styles.button}
          onPress={() => router.push("/screens/homeScreens/HomeScreen")}
        >
          <Text style={styles.buttonText}>Ir para a página inicial</Text>
        </Pressable>

        <Pressable onPress={() => router.push("/screens/addPetScreens/AddPetScreen")}>
          <Text style={styles.skipText}>Adicionar outro Pet</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
  },
  illustration: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    zIndex: -1,
  },
  contentWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingTop: 100,
    paddingBottom: 40,
  },
  logo: {
    width: 175,
    height: 175,
    borderRadius: 17,
    resizeMode: "contain",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2F8B88",
    textAlign: "center",
    marginTop: 24,
    lineHeight: 32,
  },
  successText: {
    fontWeight: "bold",
    fontSize: 28,
    color: "#2F8B88",
  },
  linkText: {
    fontSize: 17,
    color: "#89CFF0",
  },
  actionsContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#2F8B88",
    height: 56,
    width: "100%",
    maxWidth: 327,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  skipText: {
    marginTop: 12,
    color: "#89CFF0",
    fontSize: 15,
  },
});
