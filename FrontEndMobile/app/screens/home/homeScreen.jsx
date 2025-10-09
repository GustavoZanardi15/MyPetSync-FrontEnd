import React, { useState } from "react";
import { View, Text, Image, StyleSheet, ScrollView, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function HomeScreen() {
    // 👉 estado para armazenar o índice do pet selecionado
    const [selectedPet, setSelectedPet] = useState(0);

    // 👉 lista de pets (simulada)
    const pets = [
        require("../../../assets/images/home/DogHomePet1.png"),
        require("../../../assets/images/home/DogHomePet2.png"),
        require("../../../assets/images/home/CatHomePet.png"),
    ];

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

                <Text style={styles.sectionTitle}>Selecione seu Pet</Text>
                <View style={styles.petsRow}>
                    {pets.map((pet, index) => (
                        <Pressable key={index} onPress={() => setSelectedPet(index)}>
                            <Image
                                source={pet}
                                style={[
                                    styles.petAvatar,
                                    selectedPet === index && styles.petAvatarSelected, // 💙 aplica borda se selecionado
                                ]}
                            />
                        </Pressable>
                    ))}

                    <Pressable style={styles.addPet} onPress={() => router.push("/screens/addPetScreens/NomePetScreen")}>
                        <Ionicons name="add" size={22} color="#2F8B88" />
                    </Pressable>
                </View>

                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Lembretes</Text>
                    <Text style={styles.verTudo}>Ver tudo</Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Colírio Ocular</Text>
                    <Text style={styles.cardSubtitle}>Aplicar 3 gotas, manhã e noite</Text>
                    <View style={styles.cardFooter}>
                        <Ionicons name="time-outline" size={16} color="#2F8B88" />
                        <Text style={styles.cardTime}>08:45 - 20:45</Text>
                        <Text style={styles.cardRepeat}>Diariamente</Text>
                        <Ionicons name="notifications" size={16} color="#2F8B88" style={{ marginLeft: "auto" }} />
                    </View>
                </View>

                {/* Médicos */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Médicos Veterinários</Text>
                    <Text style={styles.verTudo}>Ver tudo</Text>
                </View>

                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <View style={styles.vetCard}>
                        <Image source={require("../../../assets/images/home/Vet1.png")} style={styles.vetImage} />
                        <Text style={styles.vetName}>Carolina Vivaz</Text>
                        <View style={styles.stars}>
                            <Ionicons name="star" size={14} color="#FFD700" />
                            <Ionicons name="star" size={14} color="#FFD700" />
                            <Ionicons name="star" size={14} color="#FFD700" />
                            <Ionicons name="star" size={14} color="#FFD700" />
                            <Ionicons name="star-outline" size={14} color="#C4C4C4" />
                        </View>
                    </View>

                    <View style={styles.vetCard}>
                        <Image source={require("../../../assets/images/home/Vet2.png")} style={styles.vetImage} />
                        <Text style={styles.vetName}>José Augusto</Text>
                        <View style={styles.stars}>
                            <Ionicons name="star" size={14} color="#FFD700" />
                            <Ionicons name="star" size={14} color="#FFD700" />
                            <Ionicons name="star" size={14} color="#FFD700" />
                            <Ionicons name="star" size={14} color="#FFD700" />
                            <Ionicons name="star-outline" size={14} color="#C4C4C4" />
                        </View>
                    </View>

                    <View style={styles.vetCard}>
                        <Image source={require("../../../assets/images/home/Vet3.png")} style={styles.vetImage} />
                        <Text style={styles.vetName}>Alisson Dias</Text>
                        <View style={styles.stars}>
                            <Ionicons name="star" size={14} color="#FFD700" />
                            <Ionicons name="star" size={14} color="#FFD700" />
                            <Ionicons name="star" size={14} color="#FFD700" />
                            <Ionicons name="star-outline" size={14} color="#C4C4C4" />
                            <Ionicons name="star-outline" size={14} color="#C4C4C4" />
                        </View>
                    </View>
                </ScrollView>
            </ScrollView>

            {/* Barra inferior */}
            <View style={styles.bottomNav}>
                <Ionicons name="calendar-outline" size={22} color="#2F8B88" />
                <Ionicons name="home" size={28} color="#2F8B88" />
                <Ionicons name="paw-outline" size={22} color="#2F8B88" />
            </View>
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
    alignItems: "center"
  },
  ola: {
    fontSize: 24,
    fontWeight: "500",
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
    padding: 16
  },
  spaTitle: {
    fontSize: 20,
    fontWeight: "600",
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
    alignSelf: "flex-start"
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
  petsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 20,
    marginTop: 10
  },
  petAvatar: {
    width: 62,
    height: 62,
    borderRadius: 31,
    marginRight: 10
  },
  petAvatarSelected: {
    borderWidth: 3,
    borderColor: "#89CFF0"
  },
  addPet: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: "#2F8B88",
    justifyContent: "center",
    alignItems: "center"
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginTop: 20,
    alignItems: "center"
  },
  sectionTitle: {
    fontSize: 13,
    color: "#323232"
  },
  verTudo: {
    color: "#87CEEB",
    fontSize: 13
  },
  card: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginTop: 10,
    borderRadius: 10,
    padding: 14,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2
  },
  cardTitle: {
    fontWeight: "bold",
    color: "#2F8B88"
  },
  cardSubtitle: {
    fontSize: 13,
    color: "#555",
    marginTop: 2
  },
  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6
  },
  cardTime: {
    fontSize: 12,
    color: "#333",
    marginLeft: 5
  },
  cardRepeat: {
    fontSize: 12,
    color: "#2F8B88",
    marginLeft: 8
  },
  vetCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginLeft: 20,
    padding: 10,
    alignItems: "center",
    width: 110
  },
  vetImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 6
  },
  vetName: {
    fontSize: 13,
    fontWeight: "500",
    color: "#333"
  },
  stars: {
    flexDirection: "row",
    marginTop: 4
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderTopWidth: 0.3,
    borderColor: "#ccc"
  }
});
