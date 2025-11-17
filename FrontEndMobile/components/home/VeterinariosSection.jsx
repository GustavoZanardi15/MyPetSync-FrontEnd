import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Image, StyleSheet, Pressable, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../src/service/api";

export default function VeterinariosSection({ vets = [] }) {
  const [vetRatings, setVetRatings] = useState({});
  const [loadingRatings, setLoadingRatings] = useState({});

  const fetchVetRatings = async (vetId) => {
    if (vetRatings[vetId]) return; 
    
    setLoadingRatings(prev => ({ ...prev, [vetId]: true }));
    
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) return;

      const response = await api.get("/reviews", {
        params: { provider: vetId },
        headers: { Authorization: `Bearer ${token}` }
      });

      const reviews = response.data?.reviews || response.data || [];
      
      if (reviews.length > 0) {
        const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
        const averageRating = totalRating / reviews.length;
        
        setVetRatings(prev => ({
          ...prev,
          [vetId]: averageRating
        }));
      } else {
        setVetRatings(prev => ({
          ...prev,
          [vetId]: 0
        }));
      }
    } catch (error) {
      console.error(`Erro ao buscar avaliações do vet ${vetId}:`, error);
      setVetRatings(prev => ({
        ...prev,
        [vetId]: 0
      }));
    } finally {
      setLoadingRatings(prev => ({ ...prev, [vetId]: false }));
    }
  };

  useEffect(() => {
    vets.forEach(vet => {
      if (vet.id) {
        fetchVetRatings(vet.id);
      }
    });
  }, [vets]);

  const renderStars = (vetId) => {
    const rating = vetRatings[vetId] || 0;
    
    if (loadingRatings[vetId]) {
      return <ActivityIndicator size="small" color="#2F8B88" />;
    }

    return (
      <View style={styles.stars}>
        {[1, 2, 3, 4, 5].map((starIndex) => (
          <Ionicons
            key={starIndex}
            name={starIndex <= rating ? "star" : "star-outline"}
            size={14}
            color={starIndex <= rating ? "#FFD700" : "#C4C4C4"}
          />
        ))}
        {rating > 0 && (
          <Text style={styles.ratingText}>({rating.toFixed(1)})</Text>
        )}
      </View>
    );
  };

  return (
    <View style={{ marginTop: 40 }}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Médicos Veterinários</Text>
        <Pressable onPress={() => router.push("/screens/servicoScreens/ServicoVetScreen")}>
          <Text style={styles.verTudo}>Ver tudo</Text>
        </Pressable>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.vetScrollContainer}
      >
        {vets.map((vet) => (
          <View style={styles.vetCard} key={vet.id}>
            {vet.imageUrl ? (
              <Image source={{ uri: vet.imageUrl }} style={styles.vetImage} />
            ) : (
              <View style={styles.placeholderAvatar}>
                <Text style={styles.initial}>
                  {vet.name ? vet.name.charAt(0).toUpperCase() : "V"}
                </Text>
              </View>
            )}
            <View style={styles.vetOverlay}>
              <Text style={styles.vetName}>{vet.name}</Text>
              <Text style={styles.vetSpecialty}>{vet.specialty}</Text>
              {renderStars(vet.id)}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#2F8B88",
  },
  verTudo: {
    color: "#87CEEB",
    fontSize: 15,
    fontWeight: "400",
  },
  vetScrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    flexDirection: "row",
  },
  vetCard: {
    width: 130,
    height: 160,
    marginRight: 15,
    marginTop: 10,
    borderRadius: 10,
    overflow: "hidden",
    justifyContent: "flex-end",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    alignItems: "center",
    paddingBottom: 10, 
  },
  vetImage: {
    width: 90,
    height: 90,
    borderRadius: 40,
    marginTop: 12, 
  },
  placeholderAvatar: {
    width: 65,
    height: 65,
    borderRadius: 35,
    backgroundColor: "#FFA500", 
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12, 
  },
  initial: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "700",
  },
  vetOverlay: {
    alignItems: "center",
    marginTop: 10, 
    paddingHorizontal: 5,
    width: "100%",
  },
  vetName: {
    fontSize: 13,
    fontWeight: "700",
    color: "#2F8B88",
    textAlign: "center",
    marginBottom: 2,
  },
  vetSpecialty: {
    fontSize: 11,
    color: "#777",
    textAlign: "center",
    marginBottom: 4,
    lineHeight: 12,
  },
  stars: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap", 
  },
  ratingText: {
    fontSize: 10,
    color: "#777",
    marginLeft: 4,
  },
});