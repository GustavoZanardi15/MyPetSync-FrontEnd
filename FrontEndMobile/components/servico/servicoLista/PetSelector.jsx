import React from "react";
import { View, Image, Pressable, StyleSheet } from "react-native";

export default function PetSelector({ pets, selectedPetId, onSelectPet }) {
    return (
        <View style={styles.petSelectorContainer}>
            {pets.map((p) => (
                <Pressable key={p.id} onPress={() => onSelectPet(p.id)}>
                    <Image
                        source={p.image}
                        style={[
                            styles.petSelectorImage,
                            selectedPetId === p.id ? styles.selectedPetImage : styles.unselectedPetImage,
                        ]}
                    />
                </Pressable>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    petSelectorContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 15,
        marginBottom: 30,
        paddingHorizontal: 10,
    },
    petSelectorImage: {
        borderRadius: 35,
        width: 62,
        height: 62,
        aspectRatio: 1,
    },
    selectedPetImage: {
        borderWidth: 5,
        borderColor: "#89CFF0",
        width: 72,
        height: 72,
    },
    unselectedPetImage: {
        borderWidth: 0,
    },
});
