import React from "react";
import { View, Text, ScrollView, Image, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function VeterinariosSection({ vets = [] }) {
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
        {vets.map((vet) => (
          <View style={styles.vetCard} key={vet.id}>
            {vet.imageUrl ? (
              <Image source={{ uri: vet.imageUrl }} style={styles.vetImage} />
            ) : (
              <View style={styles.placeholderAvatar}>
                <Text style={styles.initial}>
                  {vet.name ? vet.name.charAt(0).toUpperCase() : "V"}
                </Text>
              </View>
            )}
            <View style={styles.vetOverlay}>
              <Text style={styles.vetName}>{vet.name}</Text>
              <Text style={styles.vetSpecialty}>{vet.specialty}</Text>
              <View style={styles.stars}>
                {Array.from({ length: 5 }).map((_, starIndex) => (
                  <Ionicons
                    key={starIndex}
                    name={starIndex < (vet.rating || 0) ? "star" : "star-outline"}
                    size={14}
                    color={starIndex < (vet.rating || 0) ? "#FFD700" : "#C4C4C4"}
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
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#2F8B88",
  },
  verTudo: {
    color: "#87CEEB",
    fontSize: 15,
    fontWeight: "400",
  },
  vetScrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    flexDirection: "row",
  },
  vetCard: {
    width: 114,
    height: 136,
    marginRight: 15,
    marginTop: 10,
    borderRadius: 10,
    overflow: "hidden",
    justifyContent: "flex-end",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    alignItems: "center",
  },
  vetImage: {
    width: 90,
    height: 90,
    borderRadius: 40,
    marginTop: 8,
  },
  placeholderAvatar: {
    width: 65,
    height: 65,
    borderRadius: 35,
    backgroundColor: "#FFA500", 
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  initial: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "700",
  },
  vetOverlay: {
    alignItems: "center",
    marginTop: 8,
  },
  vetName: {
    fontSize: 13,
    fontWeight: "700",
    color: "#2F8B88",
    textAlign: "center",
  },
  vetSpecialty: {
    fontSize: 11,
    color: "#777",
    textAlign: "center",
    marginTop: 2,
  },
  stars: {
    flexDirection: "row",
    marginTop: 3,
  },
});
