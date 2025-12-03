import React from "react";
import { View, Image, Pressable, StyleSheet } from "react-native";

export default function PetSelector({ pets, selectedPet, onSelectPet, petColor }) {
    return (
        <View style={styles.container}>
            {pets.map((p) => {
                const isSelected = selectedPet?.id === p.id;

                return (
                    <Pressable key={p.id} onPress={() => onSelectPet(p.id)}>
                        <View
                            style={[
                                styles.avatarWrapper,
                                isSelected
                                    ? { 
                                        borderWidth: 2,
                                        borderColor: "#2F8B88",
                                        backgroundColor: petColor,
                                        transform: [{ scale: 1.15 }]
                                      }
                                    : styles.unselectedPet
                            ]}
                        >
                            <Image source={p.avatar} style={styles.petImage} />
                        </View>
                    </Pressable>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
    justifyContent: "center",
        gap: 15,
        marginBottom: 30,
    },
    avatarWrapper: {
    width: 72,
    height: 72,
    borderRadius: 36,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
},

    petImage: {
        width: "80%",
        height: "80%",
        resizeMode: "contain",
    },
    unselectedPet: {
        opacity: 0.6,
    },
});
