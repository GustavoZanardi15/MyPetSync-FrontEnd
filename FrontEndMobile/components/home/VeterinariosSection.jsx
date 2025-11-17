import React from "react";
import { View, Text, ScrollView, Image, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function VeterinariosSection({ vets = [] }) {
  const renderStars = (rating, count) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    return (
      <View style={styles.starRow}>
        {[1, 2, 3, 4, 5].map((i) => {
          let icon = "star-outline";
          let color = "#C4C4C4";

          if (i <= fullStars) {
            icon = "star";
            color = "#FFD700";
          } else if (i === fullStars + 1 && hasHalfStar) {
            icon = "star-half"; 
            color = "#FFD700";
          }

          return (
            <Ionicons
              key={i}
              name={icon}
              size={14}
              color={color}
            />
          );
        })}

        <Text style={styles.starCount}>
          {rating ? `(${rating.toFixed(1)})` : `(0.0)`}
        </Text>
      </View>
    );
  };

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
              {renderStars(vet.rating, vet.reviewCount)}
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
    width: 130,
    height: 160,
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
    paddingBottom: 10,
  },
  vetImage: {
    width: 90,
    height: 90,
    borderRadius: 40,
    marginTop: 12,
  },
  placeholderAvatar: {
    width: 65,
    height: 65,
    borderRadius: 35,
    backgroundColor: "#FFA500",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
  },
  initial: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "700",
  },
  vetOverlay: {
    alignItems: "center",
    marginTop: 10,
    paddingHorizontal: 5,
    width: "100%",
  },
  vetName: {
    fontSize: 13,
    fontWeight: "700",
    color: "#2F8B88",
    textAlign: "center",
    marginBottom: 2,
  },
  vetSpecialty: {
    fontSize: 11,
    color: "#777",
    textAlign: "center",
    marginBottom: 4,
  },
  starRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 3,
  },
  starCount: {
    fontSize: 10,
    color: "#777",
    marginLeft: 4,
  },
});
