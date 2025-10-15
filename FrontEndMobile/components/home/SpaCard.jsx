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
          onPress={() => router.push("/screens/agendaPet/AgendaScreen")}
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
    height: 170,
    marginHorizontal: 20,
    marginTop: 18,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingLeft: 18,
    overflow: "hidden",
    position: "relative",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4
  },
  spaTextWrapper: {
    flex: 1,
    paddingRight: 110
  },
  spaTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#2F8B88",
    marginBottom: 6,
    letterSpacing: 0.3
  },
  spaSubtitle: {
    fontSize: 13,
    fontWeight: "400",
    color: "#4B887C",
    lineHeight: 18,
    marginBottom: 10
  },
  spaButton: {
    backgroundColor: "#2F8B88",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 16,
    alignSelf: "flex-start",
    justifyContent: "center",
    alignItems: "center"
  },
  spaButtonText: {
    color: "#fff",
    fontWeight: "400",
    fontSize: 13,
    textAlign: "center",
    letterSpacing: 0.3
  },
  spaImage: {
    position: "absolute",
    right: 5,
    bottom: -4,
    width: 131.89,
    height: 169.63,
    resizeMode: "contain",
    zIndex: 1
  }
});
