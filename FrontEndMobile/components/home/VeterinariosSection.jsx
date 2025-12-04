import React from "react";
import { View, Text, ScrollView, Image, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import AvatarLetra from "./AvatarLetra";

export default function VeterinariosSection({ vets = [] }) {
  const renderStars = (rating) => {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;

    return (
      <View style={styles.starRow}>
        {[1, 2, 3, 4, 5].map((i) => {
          let icon = "star-outline";
          let color = "#C4C4C4";

          if (i <= full) {
            icon = "star";
            color = "#FFD700";
          } else if (i === full + 1 && half) {
            icon = "star-half";
            color = "#FFD700";
          }

          return <Ionicons key={i} name={icon} size={14} color={color} />;
        })}

        <Text style={styles.starCount}>
          ({rating ? rating.toFixed(1) : "0.0"})
        </Text>
      </View>
    );
  };

  return (
    <View style={{ marginTop: 40 }}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Prestadores</Text>
        <Pressable
          onPress={() => router.push("/screens/servicoScreens/ServicoVetScreen")}
        >
          <Text style={styles.verTudo}>Ver tudo</Text>
        </Pressable>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.vetScrollContainer}
      >
        {vets.map((vet) => (
          <View key={vet.id} style={styles.vetCard}>
            {vet.imageUrl ? (
              <Image source={{ uri: vet.imageUrl }} style={styles.vetImage} />
            ) : (
              <AvatarLetra nome={vet.name} />
            )}

            <View style={styles.vetOverlay}>
              <Text style={styles.vetName}>{vet.name}</Text>
              <Text style={styles.vetSpecialty}>{vet.specialty}</Text>
              {renderStars(vet.rating)}
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
    fontSize: 22,
    fontWeight: "700",
    color: "#2F8B88",
  },
  verTudo: {
    color: "#87CEEB",
    fontSize: 15,
  },
  vetScrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    flexDirection: "row",
  },
  vetCard: {
    width: 140,
    height: 190,
    marginRight: 15,
    borderRadius: 18,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 18,

    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 3,
  },
  vetImage: {
    width: 85,
    height: 85,
    borderRadius: 42,
    resizeMode: "cover",
    marginBottom: 6,
  },
  vetOverlay: {
    alignItems: "center",
    paddingHorizontal: 6,
    marginTop: 6,
  },
  vetName: {
    fontSize: 14,
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
    marginTop: 3,
  },
  starCount: {
    fontSize: 10,
    color: "#777",
    marginLeft: 4,
  },
});
