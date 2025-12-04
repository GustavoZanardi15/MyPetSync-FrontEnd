import React from "react";
import { View, Text, Pressable, Image, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function SpaCard() {
  const router = useRouter();

  return (
    <View style={styles.spaCard}>
      <View style={styles.spaTextWrapper}>
        <Text style={styles.spaTitle}>Hora do Spa do seu pet!</Text>

        <Text style={styles.spaSubtitle}>
          Agende Banho & Tosa com{"\n"}profissionais de confiança
        </Text>

        <Pressable
          style={styles.spaButton}
          onPress={() =>
            router.push("/screens/servicoScreens/ServicoPetScreen")
          }
        >
          <Text style={styles.spaButtonText}>Agende agora</Text>
        </Pressable>
      </View>

      <Image
        source={require("../../assets/images/home/DogHome.png")}
        style={styles.spaImage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  spaCard: {
    backgroundColor: "#A8E6CF",
    minHeight: 190,
    marginHorizontal: 20,
    marginTop: 25,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 22,
    paddingLeft: 18,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 3,
  },
  spaTextWrapper: {
    flex: 1,
    paddingRight: 110,
  },
  spaTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#2F8B88",
    marginBottom: 6,
  },
  spaSubtitle: {
    fontSize: 14,
    fontWeight: "400",
    color: "#4B887C",
    marginBottom: 12,
  },
  spaButton: {
    backgroundColor: "#2F8B88",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 16,
  },
  spaButtonText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
  },
  spaImage: {
    position: "absolute",
    right: 5,
    bottom: 0,
    width: 130,
    height: 165,
    resizeMode: "contain",
  },
});
