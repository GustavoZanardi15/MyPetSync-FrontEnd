import React from "react";
import { View, Image, Pressable, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function PetSelector({ pets, selectedPet, setSelectedPet }) {
  const router = useRouter();

  return (
    <View style={{ marginTop: 20 }}>
      <Text style={styles.sectionPet}>Selecione seu Pet</Text>
      <View style={styles.petsRow}>
        {pets.map((pet, index) => (
          <Pressable key={pet.id} onPress={() => setSelectedPet(index)}>
            <Image
              source={pet.image}
              style={[
                styles.petAvatar,
                selectedPet === index && styles.petAvatarSelected
              ]}
            />
          </Pressable>
        ))}

        <Pressable
          style={styles.addPet}
          onPress={() => router.push("/screens/addPetScreens/NomePetScreen")}
        >
          <Ionicons name="add" size={22} color="#2F8B88" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionPet: {
    fontSize: 13,
    fontWeight: "400",
    color: "#323232",
    lineHeight: 18,
    right: -25
  },
  petsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 20,
    marginTop: 15
  },
  petAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 10
  },
  petAvatarSelected: {
    borderWidth: 3,
    borderColor: "#89CFF0"
  },
  addPet: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 1.5,
    borderColor: "#2F8B88",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10
  }
});
