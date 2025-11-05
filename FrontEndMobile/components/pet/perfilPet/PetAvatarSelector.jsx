import React from "react";
import { View, Pressable, Image, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function PetAvatarSelector({ pets, selectedPet, setSelectedPet, router }) {
  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Pets</Text>
      <View style={styles.avatarRow}>
        {pets.map((pet) => (
          <Pressable
            key={pet.id}
            style={[styles.petAvatarWrapper, selectedPet.id === pet.id && styles.activeAvatar]}
            onPress={() => setSelectedPet(pet)}
          >
            <Image source={pet.avatar} style={styles.petImageThumb} />
          </Pressable>
        ))}
        <Pressable
          style={[styles.petAvatarWrapper, styles.addPetButton]}
          onPress={() => router.push("/screens/addPetScreens/AddPetScreen")}
        >
          <Ionicons name="add" size={24} color="#2F8B88" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#2F8B88",
    marginBottom: 10,
  },
  avatarRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    marginBottom: 20,
  },
  petAvatarWrapper: {
    width: 62,
    height: 62,
    borderRadius: 31,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "transparent",
  },
  activeAvatar: {
    transform: [{ scale: 1.15 }],
    borderColor: "#89CFF0",
    shadowColor: "#89CFF0",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 6,
  },
  petImageThumb: {
    width: "100%",
    height: "100%",
    borderRadius: 30,
  },
  addPetButton: {
    borderWidth: 1.5,
    borderColor: "#2F8B88",
  },
});
