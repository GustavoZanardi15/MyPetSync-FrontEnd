import React from "react";
import { View, Text, ScrollView, Image, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function VeterinariosSection({ vets }) {
  return (
    <View style={{ marginTop: 40 }}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Médicos Veterinários</Text>
        <Pressable onPress={() => router.push("/screens/servicoScreens/ServicoVetScreen")}>
        <Text style={styles.verTudo}>Ver tudo</Text>
        </Pressable>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.vetScrollContainer}
      >
        {vets.map((vet, index) => (
          <View style={styles.vetCard} key={index}>
            <Image source={vet.image} style={styles.vetImage} />
            <View style={styles.vetOverlay}>
              <Text style={styles.vetName}>{vet.name}</Text>
              <View style={styles.stars}>
                {Array.from({ length: 5 }).map((_, starIndex) => (
                  <Ionicons
                    key={starIndex}
                    name={starIndex < vet.rating ? "star" : "star-outline"}
                    size={14}
                    color={starIndex < vet.rating ? "#FFD700" : "#C4C4C4"}
                  />
                ))}
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    alignItems: "center"
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#2F8B88",
    lineHeight: 27
  },
  verTudo: {
    color: "#87CEEB",
    fontSize: 15,
    fontWeight: "400"
  },
  vetScrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    flexDirection: "row"
  },
  vetCard: {
    width: 114,
    height: 136,
    marginRight: 15,
    borderRadius: 10,
    overflow: "hidden",
    justifyContent: "flex-end",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3
  },
  vetImage: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "cover"
  },
  vetOverlay: {
    backgroundColor: "rgba(0,0,0,0.4)",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 4
  },
  vetName: {
    fontSize: 13,
    fontWeight: "700",
    color: "#fff",
    textAlign: "center"
  },
  stars: {
    flexDirection: "row",
    marginTop: 2
  }
});
