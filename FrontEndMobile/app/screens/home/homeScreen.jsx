import React, { useState } from "react";
import { View, Text, Image, StyleSheet, ScrollView, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function HomeScreen() {
  const [selectedPet, setSelectedPet] = useState(0);

  const pets = [
    { id: 0, image: require("../../../assets/images/home/DogHomePet1.png") },
    { id: 1, image: require("../../../assets/images/home/DogHomePet2.png") },
    { id: 2, image: require("../../../assets/images/home/CatHomePet.png") },
  ];

  const reminders = [
    {
      title: "Colírio Ocular",
      subtitle: "Aplicar 3 gotas, manhã e noite",
      time: "08:45 - 20:45",
      repeat: "Diariamente",
    },
    {
      title: "Passeio",
      subtitle: "Lembrar de levar água",
      time: "18:00 - 19:00",
      repeat: "Quarta-feira",
    },
    {
      title: "Petshop",
      subtitle: "Banho e tosa",
      time: "09:00",
      repeat: "Sexta-feira",
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        <View style={styles.header}>
          <Text style={styles.ola}>
            Olá, <Text style={styles.nome}>Lucas</Text>
          </Text>
          <View style={styles.icons}>
            <Ionicons name="search-outline" size={22} color="#2F8B88" style={{ marginRight: 14 }} />
            <Ionicons name="notifications-outline" size={22} color="#2F8B88" />
          </View>
        </View>

        <View style={styles.spaCard}>
          <View style={styles.spaTextWrapper}>
            <Text style={styles.spaTitle}>Hora do Spa do seu pet!</Text>
            <Text style={styles.spaSubtitle}>
              Agende Banho & Tosa com{"\n"}profissionais de confiança
            </Text>
            <Pressable
              style={styles.spaButton}
              onPress={() => router.push("/screens/agendaPet/AgendaScreen")}
            >
              <Text style={styles.spaButtonText}>Agende agora</Text>
            </Pressable>
          </View>

          <Image
            source={require("../../../assets/images/home/DogHome.png")}
            style={styles.spaImage}
          />
        </View>

        <Text style={styles.sectionPet}>Selecione seu Pet</Text>
        <View style={styles.petsRow}>
          {pets.map((pet, index) => (
            <Pressable key={index} onPress={() => setSelectedPet(index)}>
              <Image
                source={pet.image}
                style={[
                  styles.petAvatar,
                  selectedPet === index && styles.petAvatarSelected,
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

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Lembretes</Text>
          <Text style={styles.verTudo}>Ver tudo</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>{reminders[selectedPet].title}</Text>
          <Text style={styles.cardSubtitle}>{reminders[selectedPet].subtitle}</Text>
          <View style={styles.cardFooter}>
            <Ionicons name="time-outline" size={16} color="#2F8B88" />
            <Text style={styles.cardTime}>{reminders[selectedPet].time}</Text>
            <Text style={styles.cardRepeat}>{reminders[selectedPet].repeat}</Text>
            <Ionicons
              name="notifications"
              size={16}
              color="#2F8B88"
              style={{ marginLeft: "auto" }}
            />
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Médicos Veterinários</Text>
          <Text style={styles.verTudo}>Ver tudo</Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.vetCard}>
            <Image
              source={require("../../../assets/images/home/Vet1.png")}
              style={styles.vetImage}
            />
            <View style={styles.vetOverlay}>
              <Text style={styles.vetName}>Carolina Vivaz</Text>
              <View style={styles.stars}>
                {[...Array(4)].map((_, i) => (
                  <Ionicons key={i} name="star" size={14} color="#FFD700" />
                ))}
                <Ionicons name="star-outline" size={14} color="#C4C4C4" />
              </View>
            </View>
          </View>

          <View style={styles.vetCard}>
            <Image
              source={require("../../../assets/images/home/Vet2.png")}
              style={styles.vetImage}
            />
            <View style={styles.vetOverlay}>
              <Text style={styles.vetName}>José Augusto</Text>
              <View style={styles.stars}>
                {[...Array(4)].map((_, i) => (
                  <Ionicons key={i} name="star" size={14} color="#FFD700" />
                ))}
                <Ionicons name="star-outline" size={14} color="#C4C4C4" />
              </View>
            </View>
          </View>

          <View style={styles.vetCard}>
            <Image
              source={require("../../../assets/images/home/Vet3.png")}
              style={styles.vetImage}
            />
            <View style={styles.vetOverlay}>
              <Text style={styles.vetName}>Alisson Dias</Text>
              <View style={styles.stars}>
                {[...Array(3)].map((_, i) => (
                  <Ionicons key={i} name="star" size={14} color="#FFD700" />
                ))}
                {[...Array(2)].map((_, i) => (
                  <Ionicons key={i} name="star-outline" size={14} color="#C4C4C4" />
                ))}
              </View>
            </View>
          </View>
        </ScrollView>
      </ScrollView>

      <View style={styles.bottomNav}>
        <Image source={require("../../../assets/images/home/NavBarCalendar.png")} size={24} color="#2F8B88" />
        <Image source={require("../../../assets/images/home/NavBarServico.png")} size={24} color="#2F8B88" />
        <Image source={require("../../../assets/images/home/NavBarHome.png")} size={24} color="#2F8B88" />
        <Image source={require("../../../assets/images/home/NavBarPet.png")} size={24} color="#2F8B88" />
        <Image source={require("../../../assets/images/home/NavBarPerfil.png")} size={24} color="#2F8B88" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9F9F9" },

  header: {
    marginTop: 40,
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
    marginHorizontal: 20,
    marginTop: 18,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingLeft: 18,
    overflow: "hidden",
    position: "relative",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  spaTextWrapper: {
    flex: 1,
    paddingRight: 110,
  },

  spaTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#2F8B88",
    width: 283,
    height: 27,
    marginBottom: 6,
    letterSpacing: 0.3,
  },

  spaSubtitle: {
    fontSize: 13,
    width: 168,
    height: 34,
    fontWeight: "regular",
    color: "#4B887C",
    right: -5,
    lineHeight: 18,
    marginBottom: 10,
    opacity: 0.9,
  },
  spaButton: {
    backgroundColor: "#2F8B88",
    paddingVertical: 6,
    paddingHorizontal: 20,
    width: 127,
    height: 32,
    gap: 24,
    borderRadius: 20,
    alignSelf: "flex-start",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },

  spaButtonText: {
    color: "#fff",
    fontWeight: "regular",
    fontSize: 13,
    textAlign: "center",
    letterSpacing: 0.3,
  },
  spaImage: {
    position: "absolute",
    right: 5,
    bottom: -4,
    width: 131.89,
    height: 169.63,
    resizeMode: "contain",
    zIndex: 1
  },
  sectionPet: {
    fontSize: 13,
    fontWeight: "regular",
    color: "#323232",
    lineHeight: 18,
    right: -25,
    marginTop: 10
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
    fontSize: 20,
    fontWeight: "semibold",
    color: "#2F8B88",
    lineHeight: 27,
  },
  verTudo: {
    color: "#87CEEB",
    fontSize: 15,
    fontWeight: "regular"
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
  width: 113,
  height: 136,
  marginLeft: 20,
  borderRadius: 12,
  overflow: "hidden",
  backgroundColor: "#fff",
  position: "relative",
  justifyContent: "flex-end",
},

vetImage: {
  ...StyleSheet.absoluteFillObject,
  resizeMode: "cover",
},

vetOverlay: {
  backgroundColor: "rgba(0, 0, 0, 0.35)", 
  alignItems: "center",
  paddingVertical: 6,
},

vetName: {
  fontSize: 13,
  fontWeight: "600",
  color: "#fff",
  textShadowColor: "rgba(0,0,0,0.5)",
  textShadowOffset: { width: 0, height: 1 },
  textShadowRadius: 2,
},
stars: {
  flexDirection: "row",
  marginTop: 2,
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
