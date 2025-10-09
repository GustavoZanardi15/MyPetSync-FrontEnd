import React from "react";
import { View, Text, Image, StyleSheet, ScrollView, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function HomeScreen() {
    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>

                <View style={styles.header}>
                    <View>
                        <Text style={styles.ola}>Olá, <Text style={styles.nome}>Lucas</Text></Text>
                    </View>
                    <View style={styles.icons}>
                        <Ionicons name="search-outline" size={22} color="#2F8B88" style={{ marginRight: 14 }} />
                        <Ionicons name="notifications-outline" size={22} color="#2F8B88" />
                    </View>
                </View>

                <View style={styles.spaCard}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.spaTitle}>Hora do Spa do seu pet!</Text>
                        <Text style={styles.spaSubtitle}>Agende Banho & Tosa com {"\n"}profissionais de confiança</Text>
                        <Pressable style={styles.spaButton} onPress={() => router.push("/screens/agendaPet/AgendaScreen")}>
                            <Text style={styles.spaButtonText}>Agende agora</Text>
                        </Pressable>
                    </View>
                    <Image
                        source={require("../../../assets/images/home/DogHome.png")}
                        style={styles.spaImage}
                    />
                </View>

                </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F9F9F9"
    },
    header: {
        marginTop: 40,
        marginHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    ola: { 
        fontSize: 24,
        fontWeight: "medium", 
        color: "#2F8B88" 
    },
    nome: { 
        color: "#2F8B88", 
        fontWeight: "bold" 
    },
    icons: { 
        flexDirection: "row" 
    },
    spaCard: {
        backgroundColor: "#A8E6CF",
        margin: 20,
        borderRadius: 15,
        flexDirection: "row",
        padding: 16,
    },
    spaTitle: { 
        fontSize: 20, 
        fontWeight: "semibold", 
        color: "#2F8B88"
    },
    spaSubtitle: { 
        fontSize: 12, 
        color: "#333", 
        marginVertical: 6 
    },
    spaButton: {
        backgroundColor: "#2F8B88",
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        alignSelf: "flex-start",
    },
    spaButtonText: { 
        color: "#fff", 
        fontWeight: "600" 
    },
    spaImage: { 
        width: 80, 
        height: 80, 
        resizeMode: "contain"
    },
})