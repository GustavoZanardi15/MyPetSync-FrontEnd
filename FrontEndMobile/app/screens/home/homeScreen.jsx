import React, { useState } from "react";
import { View, Text, Image, StyleSheet, ScrollView, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const [selectedPet, setSelectedPet] = useState(0);
  const router = useRouter();

  const pets = [
    { id: 0, image: require("../../../assets/images/home/DogHomePet1.png") },
    { id: 1, image: require("../../../assets/images/home/DogHomePet2.png") },
    { id: 2, image: require("../../../assets/images/home/CatHomePet.png") }
  ];

  const reminders = [
    [
      {
        title: "Colírio Ocular",
        subtitle: "Aplicar 3 gotas, manhã e noite",
        time: "08:45 - 20:45",
        repeat: "Diariamente"
      },
      {
        title: "Passeio",
        subtitle: "Lembrar de levar água",
        time: "18:00 - 19:00",
        repeat: "Quarta-feira"
      }
    ],
    [
      {
        title: "Petshop",
        subtitle: "Banho e tosa",
        time: "09:00",
        repeat: "Sexta-feira"
      }
    ],
    [
      {
        title: "Vacina",
        subtitle: "Levar ao veterinário",
        time: "10:00",
        repeat: "Anual"
      }
    ]
  ];

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <Text style={styles.ola}>
            Olá,{" "}
            <Text style={styles.nome}>Lucas</Text>
          </Text>

          <View style={styles.icons}>
            <Pressable
              style={styles.iconCircle}
              onPress={() => router.push("/screens/home/BuscaScreen")}
            >
              <Ionicons name="search-outline" size={23} color="#2F8B88" />
            </Pressable>

            <Pressable style={styles.iconCircle} onPress={() => router.push("/screens/home/NotificacaoScreen")}>
              <Ionicons name="notifications-outline" size={23} color="#2F8B88" />
            </Pressable>
          </View>
        </View>

        <View style={styles.spaCard}>
          <View style={styles.spaTextWrapper}>
            <Text style={styles.spaTitle}>Hora do Spa do seu pet!</Text>
            <Text style={styles.spaSubtitle}>
              Agende Banho &amp; Tosa com{"\n"}
              profissionais de confiança
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
            <Pressable key={pet.id} onPress={() => setSelectedPet(index)}>
              <Image
                source={pet.image}
                style={[
                  styles.petAvatar,
                  selectedPet === index && styles.petAvatarSelected
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

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.reminderScrollContainer}
        >
          <Pressable style={styles.cardAdd}>
            <Ionicons name="add" size={30} color="#2F8B88" />
          </Pressable>

          {(reminders[selectedPet] || []).map((reminder, index) => (
            <View style={styles.card} key={index}>
              <View style={styles.cardVerticalBar} />

              <View style={{ paddingLeft: 10, flex: 1, justifyContent: "space-between" }}>
                <View>
                  <Text style={styles.cardTitle}>{reminder.title}</Text>
                  <Text style={styles.cardSubtitle}>{reminder.subtitle}</Text>
                </View>

                <View style={styles.cardFooter}>
                  <Ionicons name="time-outline" size={16} color="#2F8B88" />

                  <View style={{ marginLeft: 5 }}>
                    <Text style={styles.cardTime}>{reminder.time}</Text>
                    <Text style={styles.cardRepeatText}>{reminder.repeat}</Text>
                  </View>

                  <Ionicons
                    name="notifications"
                    size={24}
                    color="#2F8B88"
                    style={{ marginLeft: "auto" }}
                  />
                </View>
              </View>
            </View>
          ))}
        </ScrollView>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Médicos Veterinários</Text>
          <Text style={styles.verTudo}>Ver tudo</Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.vetScrollContainer}
        >
          <View style={styles.vetCard}>
            <Image source={require("../../../assets/images/home/Vet1.png")} style={styles.vetImage} />
            <View style={styles.vetOverlay}>
              <Text style={styles.vetName}>Carolina Vivaz</Text>

              <View style={styles.stars}>
                <Ionicons name="star" size={14} color="#FFD700" />
                <Ionicons name="star" size={14} color="#FFD700" />
                <Ionicons name="star" size={14} color="#FFD700" />
                <Ionicons name="star" size={14} color="#FFD700" />
                <Ionicons name="star-outline" size={14} color="#C4C4C4" />
              </View>
            </View>
          </View>

          <View style={styles.vetCard}>
            <Image source={require("../../../assets/images/home/Vet2.png")} style={styles.vetImage} />
            <View style={styles.vetOverlay}>
              <Text style={styles.vetName}>José Augusto</Text>

              <View style={styles.stars}>
                <Ionicons name="star" size={14} color="#FFD700" />
                <Ionicons name="star" size={14} color="#FFD700" />
                <Ionicons name="star" size={14} color="#FFD700" />
                <Ionicons name="star" size={14} color="#FFD700" />
                <Ionicons name="star-outline" size={14} color="#C4C4C4" />
              </View>
            </View>
          </View>

          <View style={styles.vetCard}>
            <Image source={require("../../../assets/images/home/Vet3.png")} style={styles.vetImage} />
            <View style={styles.vetOverlay}>
              <Text style={styles.vetName}>Alisson Dias</Text>

              <View style={styles.stars}>
                <Ionicons name="star" size={14} color="#FFD700" />
                <Ionicons name="star" size={14} color="#FFD700" />
                <Ionicons name="star" size={14} color="#FFD700" />
                <Ionicons name="star-outline" size={14} color="#C4C4C4" />
                <Ionicons name="star-outline" size={14} color="#C4C4C4" />
              </View>
            </View>
          </View>
        </ScrollView>
      </ScrollView>

      <View style={styles.bottomNav}>
        <Pressable onPress={() => router.push()}>
          <Image source={require("../../../assets/images/home/NavBarCalendar.png")} />
        </Pressable>

        <Pressable onPress={() => router.push()}>
          <Image source={require("../../../assets/images/home/NavBarServico.png")} />
        </Pressable>

        <Pressable onPress={() => router.push("/screens/home/homeScreen")}>
          <Image source={require("../../../assets/images/home/NavBarHomeSelect.png")} />
        </Pressable>

        <Pressable onPress={() => router.push()}>
          <Image source={require("../../../assets/images/home/NavBarPet.png")} />
        </Pressable>

        <Pressable onPress={() => router.push()}>
          <Image source={require("../../../assets/images/home/NavBarPerfil.png")} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9"
  },
  scrollContent: {
    paddingBottom: 80
  },
  header: {
    marginTop: 40,
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  ola: {
    fontSize: 22,
    fontWeight: "400",
    color: "#2F8B88"
  },
  nome: {
    color: "#2F8B88",
    fontWeight: "700"
  },
  icons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10
  },
  iconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 1.5,
    borderColor: "rgba(50, 50, 50, 0.3)",
    justifyContent: "center",
    alignItems: "center"
  },
  spaCard: {
    backgroundColor: "#A8E6CF",
    height: 170,
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
    shadowRadius: 4
  },
  spaTextWrapper: {
    flex: 1,
    paddingRight: 110
  },
  spaTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#2F8B88",
    marginBottom: 6,
    letterSpacing: 0.3
  },
  spaSubtitle: {
    fontSize: 13,
    fontWeight: "400",
    color: "#4B887C",
    lineHeight: 18,
    marginBottom: 10
  },
  spaButton: {
    backgroundColor: "#2F8B88",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 16,
    alignSelf: "flex-start",
    justifyContent: "center",
    alignItems: "center"
  },
  spaButtonText: {
    color: "#fff",
    fontWeight: "400",
    fontSize: 13,
    textAlign: "center",
    letterSpacing: 0.3
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
    fontWeight: "400",
    color: "#323232",
    lineHeight: 18,
    right: -25,
    marginTop: 20
  },
  petsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 20,
    marginTop: 15
  },
  petAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 10
  },
  petAvatarSelected: {
    borderWidth: 3,
    borderColor: "#89CFF0"
  },
  addPet: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 1.5,
    borderColor: "#2F8B88",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginTop: 40,
    alignItems: "center"
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#2F8B88",
    lineHeight: 27
  },
  verTudo: {
    color: "#87CEEB",
    fontSize: 15,
    fontWeight: "400"
  },
  reminderScrollContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    paddingBottom: 20
  },
  card: {
    backgroundColor: "#fff",
    width: 238,
    height: 143,
    borderRadius: 10,
    padding: 10,
    marginRight: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
    flexDirection: "row",
    alignItems: "center"
  },
  cardAdd: {
    backgroundColor: "#fff",
    width: 44,
    height: 143,
    borderRadius: 10,
    marginRight: 15,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2
  },
  cardVerticalBar: {
    width: 4,
    height: 59,
    backgroundColor: "#A8E6CF",
    borderRadius: 16,
    position: "absolute",
    left: 20,
    top: 12
  },
  cardTitle: {
    fontWeight: "500",
    color: "#2F8B88",
    fontSize: 15,
    marginLeft: 10
  },
  cardSubtitle: {
    fontWeight: "400",
    fontSize: 13,
    color: "#555",
    marginLeft: 10,
    marginTop: 2
  },
  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 25,
    marginLeft: -5
  },
  cardTime: {
    fontSize: 13,
    fontWeight: "400",
    color: "#2F8B88"
  },
  cardRepeatText: {
    fontSize: 13,
    color: "#2F8B88",
    fontWeight: "400",
    marginTop: 2
  },
  vetScrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    flexDirection: "row"
  },
  vetCard: {
    width: 114,
    height: 136,
    marginRight: 15,
    borderRadius: 10,
    overflow: "hidden",
    justifyContent: "flex-end",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3
  },
  vetImage: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "cover"
  },
  vetOverlay: {
    backgroundColor: "rgba(0,0,0,0.4)",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 4
  },
  vetName: {
    fontSize: 13,
    fontWeight: "700",
    color: "#fff",
    textAlign: "center"
  },
  stars: {
    flexDirection: "row",
    marginTop: 2
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderTopWidth: 0.3,
    borderColor: "#ccc",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4
  }
});
