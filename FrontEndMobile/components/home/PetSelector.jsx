import React from "react";
import { View, Image, Pressable, Text, StyleSheet, ScrollView } from "react-native";

export default function PetSelector({ pets, selectedPet, setSelectedPet }) {
  return (
    <View style={{ marginTop: 30 }}>
      <Text style={styles.sectionPet}>Selecione seu Pet</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.petsRow}
      >
        {pets.map((pet, index) => (
          <Pressable key={pet.id} onPress={() => setSelectedPet(index)}>
            <View
              style={[
                styles.petAvatar,
                { backgroundColor: pet.color || "#F0F0F0" },
                selectedPet === index && styles.petAvatarSelected,
              ]}
            >
              <Image
                source={pet.image}
                resizeMode="contain"
                style={styles.petImage}
              />
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionPet: {
    fontSize: 20,
    color: "#2F8B88",
    fontWeight: "700",
    marginLeft: 20,
    marginBottom: 10,
  },
  petsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 20,
  },
  petAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  petImage: {
    width: 40,
    height: 40,
  },
  petAvatarSelected: {
    borderWidth: 3,
    borderColor: "#89CFF0",
  },
});
