import React from "react";
import { View, Image, Pressable, StyleSheet } from "react-native";

export default function PetSelector({ pets, selectedPet, onSelectPet }) {
    return (
        <View style={styles.container}>
            {pets.map((p) => (
                <Pressable key={p.id} onPress={() => onSelectPet(p.id)}>
                    <Image
                        source={p.image} 
                        style={[styles.petImage, selectedPet.id === p.id ? styles.selectedPet : styles.unselectedPet]}/>
                </Pressable>
            ))}
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
    petImage: {
        borderRadius: 70.5,
        aspectRatio: 1
    },
    selectedPet: {
        width: 141,
        height: 141,
        borderWidth: 5,
        borderColor: "#89CFF0"
    },
    unselectedPet: {
        width: 65,
        height: 65,
        opacity: 0.7
    },
});
