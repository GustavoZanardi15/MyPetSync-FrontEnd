import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function NomePetScreen() {
    const [petNome, setPetNome] = useState("");
    const router = useRouter();

    return(
        <View style={styles.container}>
            
            <View>
                <View style={styles.header}>
                    <Pressable onPress={() => router.back()} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color="#2F8B88" />
                    </Pressable>
                    <Text style={styles.stepText}>1/7</Text>
                </View>

                <View style={styles.progressBar}>
                    <View style={styles.progress} /> 
                </View>

                <Text style={styles.title}>Informe o nome do seu pet?</Text>
                
                <TextInput
                    style={styles.input}
                    placeholder="Escreva o nome"
                    value={petNome}
                    onChangeText={setPetNome}
                    placeholderTextColor={"#8E8E8E"}
                />
            </View>
            <Pressable style={styles.button} onPress={() => router.push("GeneroPetScreen")}>
                <Text style={styles.buttonText}>Próximo</Text>
            </Pressable>
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F7F7F7",
        paddingHorizontal: 20,
        paddingTop: 60,
        justifyContent: "space-between" 
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20
    },
    backButton: {
        padding: 5
    },
    stepText: {
        fontSize: 18,
        color: "#2F8B88",
        fontWeight: "regular"
    },
    progress: {
        height: 4,
        width: 46.71,
        backgroundColor: "#89CFF0", 
    },
    progressBar: {
        height: 4,
        backgroundColor: "#E0E0E0",
        borderRadius: 2,
        marginBottom: 30,
        overflow: "hidden"
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#2F8B88",
        marginBottom: 20,
        textAlign: "center"
    },
    input: {
        backgroundColor: "#fff",
        color: "#2F8B88",
        fontWeight: "bold",
        borderRadius: 12,
        paddingHorizontal: 16,
        height: 56,
        fontSize: 15,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        elevation: 2,
        marginBottom: 56
    },
    button: {
        backgroundColor: "#2F8B88",
        height: 56,
        width: 276, 
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        marginBottom: 20
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold"
    }
});