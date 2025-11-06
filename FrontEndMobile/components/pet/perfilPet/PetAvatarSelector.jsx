import React from "react";
import { View, Pressable, Image, StyleSheet, Text, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const getStablePetColor = (petId, petColors) => {
    const hash = petId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const colorIndex = hash % petColors.length;
    return petColors[colorIndex];
};


export default function PetAvatarSelector({ pets, selectedPet, setSelectedPet, router, petColors }) {
    if (!pets || pets.length === 0 || !petColors || petColors.length === 0) {
        return (
            <View style={styles.container}>
                <Text style={styles.headerTitle}>Pets</Text>
                <View style={[styles.avatarRow, { justifyContent: "center" }]}>
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

    return (
        <View style={styles.container}>
            <Text style={styles.headerTitle}>Pets</Text>
            <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.avatarRow} 
            >
                {pets.map((pet) => (
                    <Pressable
                        key={pet.id}
                        style={[
                            styles.petAvatarWrapper,
                            { backgroundColor: getStablePetColor(pet.id, petColors) }, 
                            selectedPet?.id === pet.id && styles.activeAvatar,
                        ]}
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
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 15,
    },
    headerTitle: {
        fontSize: 40,
        fontWeight: "bold",
        color: "#2F8B88",
        marginBottom: 10,
        textAlign: "center", 
    },
    avatarRow: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        marginBottom: 20,
        paddingHorizontal: 20, 
    },
    petAvatarWrapper: {
        width: 62,
        height: 62,
        borderRadius: 31,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 5,
        borderWidth: 2,
        borderColor: "transparent",
        overflow: "hidden", 
    },
    activeAvatar: {
        borderColor: "#2F8B88",
    },
    petImageThumb: {
        width: "80%", 
        height: "80%", 
        resizeMode: "contain", 
    },
    addPetButton: {
        backgroundColor: "#F7F7F7",
        borderStyle: "dashed",
        borderColor: "#2F8B88",
        borderWidth: 2,
        overflow: "hidden",
    },
});