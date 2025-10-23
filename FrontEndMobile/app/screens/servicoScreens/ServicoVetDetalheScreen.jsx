import React from "react";
import { View, Text, Image, ScrollView, StyleSheet, Pressable, StatusBar, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import VetInfoSection from "../../../components/servico/servicoVetDetalhe/VetInfoSection";
import VetStats from "../../../components/servico/servicoVetDetalhe/VetStats";
import VetAvaliacoesSection from "../../../components/servico/servicoVetDetalhe/VetAvaliacoesSection";
import BottomNav from "../../../components/servico/servicoVetDetalhe/BottomNav";
import { AVALIACOES, VETERINARIOS } from "../../../components/servico/servicoVetDetalhe/VetData";

export default function ServicoVetDetalheScreen() {
  const router = useRouter();
  const { vetId, vet: vetJson } = useLocalSearchParams();

  let vet;
  try {
    vet = vetJson ? JSON.parse(vetJson) : VETERINARIOS.find((v) => v.id === Number(vetId));
  } catch {
    vet = VETERINARIOS[0];
  }

  const reviews = vet?.avaliacoesList ?? AVALIACOES ?? [];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2F8B88" translucent />
      <View style={styles.topBackground} />

      <ScrollView contentContainerStyle={styles.scroll}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#2F8B88" />
        </Pressable>

        <Image source={vet.foto} style={styles.mainImage} />

        <View style={styles.contentCard}>
          <VetInfoSection vet={vet} />
          <Text style={styles.vetBio}>{vet.bio}</Text>
          <VetStats vet={vet} />

          <VetAvaliacoesSection avaliacoes={reviews} />

          <Pressable style={styles.mainButton}>
            <Text style={styles.mainButtonText}>Marque uma Consulta!</Text>
          </Pressable>
        </View>
      </ScrollView>

      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#F9F9F9" 
  },
  topBackground: { 
    position: "absolute", 
    top: 0, 
    left: 0, 
    right: 0, 
    height: 200, 
    backgroundColor: "#D1E6E5" 
  },
  backButton: {
    position: "absolute",
    top: Platform.OS === "android" ? (StatusBar.currentHeight || 20) + 10 : 50,
    left: 20,
    zIndex: 10,
  },
  scroll: { 
    paddingBottom: 100 
  },
  mainImage: { 
    width: "100%", 
    height: 280, 
    resizeMode: "cover"
   },
  contentCard: {
    backgroundColor: "#F9F9F9",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    marginTop: -30,
  },
  vetBio: { 
    fontSize: 14, 
    color: "#8E8E8E", 
    lineHeight: 18, 
    marginBottom: 30 
  },
  mainButton: {
    backgroundColor: "#2F8B88",
    borderRadius: 16,
    height: 35,
    width: 177,
    paddingVertical: 15,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  mainButtonText: { 
    color: "#FFFFFF", 
    fontSize: 15, 
    fontWeight: "bold" 
  },
});
