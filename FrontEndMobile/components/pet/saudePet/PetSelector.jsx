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
        width: 65,
        height: 65,
        borderRadius: 32.5,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F7F7F7",
        overflow: "hidden",
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
